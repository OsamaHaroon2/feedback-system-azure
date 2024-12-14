import azure.functions as func
from shared.database import get_container
from shared.auth import decode_jwt
import logging
import json
from datetime import datetime

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        # Validate JWT
        token = req.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return func.HttpResponse("Unauthorized: Missing JWT token.", status_code=401)

        user = decode_jwt(token)

        if user["role"] != "admin":
            return func.HttpResponse("Forbidden: Only admins can retrieve feedback.", status_code=403)

        # Parse query parameters
        subject = req.params.get("subject")
        start_date = req.params.get("start_date")
        end_date = req.params.get("end_date")

        # Validate subject
        valid_subjects = ["Mathematics", "Science", "History", "English", "Computer Science"]
        if subject and subject not in valid_subjects:
            return func.HttpResponse("Invalid subject.", status_code=400)

        # Validate date formats
        try:
            if start_date:
                datetime.fromisoformat(start_date)
            if end_date:
                datetime.fromisoformat(end_date)
        except ValueError:
            return func.HttpResponse("Invalid date format. Use ISO 8601 (YYYY-MM-DD).", status_code=400)

        # Query Cosmos DB
        container = get_container("Feedbacks")
        query = "SELECT * FROM c WHERE 1=1"
        parameters = []

        if subject:
            query += " AND c.subject = @subject"
            parameters.append({"name": "@subject", "value": subject})

        if start_date and end_date:
            query += " AND c.timestamp >= @start_date AND c.timestamp <= @end_date"
            parameters.append({"name": "@start_date", "value": f"{start_date}T00:00:00"})
            parameters.append({"name": "@end_date", "value": f"{end_date}T23:59:59"})

        feedbacks = list(container.query_items(
            query=query,
            parameters=parameters,
            enable_cross_partition_query=True
        ))

        # Handle no feedbacks found
        if not feedbacks:
            return func.HttpResponse(
                body=json.dumps({"feedbacks": [], "message": "No feedback found for the given criteria."}),
                status_code=200,
                mimetype="application/json"
            )

        return func.HttpResponse(
            body=json.dumps({"feedbacks": feedbacks}),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        logging.error("Error occurred", exc_info=True)
        return func.HttpResponse(f"Internal server error: {str(e)}", status_code=500)
