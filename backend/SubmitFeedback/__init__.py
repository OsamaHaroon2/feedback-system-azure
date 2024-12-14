import azure.functions as func
from shared.database import get_container
from shared.auth import decode_jwt
from shared.cors import add_cors_headers, handle_options
import logging
import uuid
import datetime

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Handle CORS preflight request
    if req.method == "OPTIONS":
        return handle_options(req)

    try:
        # Validate JWT
        token = req.headers.get("Authorization", "").replace("Bearer ", "").strip()
        if not token:
            logging.error("Missing Authorization header or token.")
            response = func.HttpResponse("Unauthorized: Missing token.", status_code=401)
            return add_cors_headers(response)

        logging.info(f"Received JWT Token: {token}")

        try:
            user = decode_jwt(token)
            logging.info(f"Decoded User Info: {user}")
        except Exception as jwt_error:
            logging.error(f"JWT decoding error: {jwt_error}")
            response = func.HttpResponse("Invalid token.", status_code=401)
            return add_cors_headers(response)

        if user["role"] != "student":
            logging.error("Forbidden: User role is not 'student'.")
            response = func.HttpResponse("Forbidden: Only students can submit feedback.", status_code=403)
            return add_cors_headers(response)

        # Parse request data
        try:
            data = req.get_json()
            logging.info(f"Received Request Payload: {data}")
        except Exception as json_error:
            logging.error(f"Error parsing request body: {json_error}")
            response = func.HttpResponse("Invalid JSON payload.", status_code=400)
            return add_cors_headers(response)

        subject = data.get("subject")
        feedback = data.get("feedback")

        if not subject or not feedback:
            logging.error("Validation failed: Missing 'subject' or 'feedback' in payload.")
            response = func.HttpResponse("Subject and feedback are required.", status_code=400)
            return add_cors_headers(response)

        # Validate subject
        valid_subjects = ["Mathematics", "Science", "History", "English", "Computer Science"]
        if subject not in valid_subjects:
            logging.error(f"Invalid subject: {subject}")
            response = func.HttpResponse("Invalid subject.", status_code=400)
            return add_cors_headers(response)

        # Save feedback to Cosmos DB
        try:
            container = get_container("Feedbacks")
            feedback_item = {
                "id": str(uuid.uuid4()),
                "user_email": user["id"],
                "subject": subject,
                "feedback": feedback,
                "timestamp": datetime.datetime.utcnow().isoformat()
            }
            container.create_item(feedback_item)
            logging.info(f"Feedback saved to database: {feedback_item}")
        except Exception as db_error:
            logging.error(f"Error saving feedback to Cosmos DB: {db_error}")
            response = func.HttpResponse("Failed to save feedback. Please try again later.", status_code=500)
            return add_cors_headers(response)

        response = func.HttpResponse("Feedback submitted successfully.", status_code=201)
        return add_cors_headers(response)

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        response = func.HttpResponse(f"Internal server error: {str(e)}", status_code=500)
        return add_cors_headers(response)
