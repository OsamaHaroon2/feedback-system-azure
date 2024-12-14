import csv
from datetime import datetime
import azure.functions as func
from shared.database import get_container
from shared.cors import add_cors_headers, handle_options
from azure.storage.blob import BlobServiceClient
import os

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Handle CORS preflight request
    if req.method == "OPTIONS":
        return handle_options(req)

    try:
        # Parse query parameters
        start_date = req.params.get("start_date")
        end_date = req.params.get("end_date")
        subject = req.params.get("subject")  # Optional parameter for specific subject

        if not start_date or not end_date:
            response = func.HttpResponse("Start and end dates are required.", status_code=400)
            return add_cors_headers(response)

        # Fetch feedbacks from Cosmos DB
        container = get_container("Feedbacks")
        query = "SELECT c.user_email, c.subject, c.feedback, c.timestamp FROM c WHERE c.timestamp >= @start_date AND c.timestamp <= @end_date"
        parameters = [
            {"name": "@start_date", "value": start_date},
            {"name": "@end_date", "value": end_date}
        ]
        if subject:
            query += " AND c.subject = @subject"
            parameters.append({"name": "@subject", "value": subject})

        feedback_items = container.query_items(
            query=query,
            parameters=parameters,
            enable_cross_partition_query=True
        )

        # Prepare CSV data
        csv_data = [["User Email", "Subject", "Feedback", "Timestamp"]]
        for item in feedback_items:
            formatted_timestamp = datetime.strptime(item["timestamp"], "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d/%m/%Y %H:%M:%S")
            csv_data.append([item["user_email"], item["subject"], item["feedback"], formatted_timestamp])

        # Determine file name based on subject
        timestamp = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')
        if subject:
            file_name = f"report_{subject}_{timestamp}.csv"
        else:
            file_name = f"report_all_subjects_{timestamp}.csv"

        file_path = f"/tmp/{file_name}"

        # Write to CSV file
        with open(file_path, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerows(csv_data)

        # Upload to Azure Blob Storage
        blob_service_client = BlobServiceClient.from_connection_string(os.getenv("AzureWebJobsStorage"))
        blob_client = blob_service_client.get_blob_client(container=os.getenv("BLOB_CONTAINER_NAME"), blob=file_name)

        with open(file_path, "rb") as data:
            blob_client.upload_blob(data, overwrite=True)

        response = func.HttpResponse(f"Report generated and uploaded successfully as {file_name}.", status_code=200)
        return add_cors_headers(response)

    except Exception as e:
        response = func.HttpResponse(f"Error: {str(e)}", status_code=500)
        return add_cors_headers(response)
