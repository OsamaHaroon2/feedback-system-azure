import azure.functions as func
from shared.auth import decode_jwt
from shared.cors import add_cors_headers, handle_options
from azure.storage.blob import BlobServiceClient
import logging
import os
import json
import re

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Handle CORS preflight request
    if req.method == "OPTIONS":
        return handle_options(req)

    try:
        # Validate JWT
        token = req.headers.get("Authorization", "").replace("Bearer ", "")
        user = decode_jwt(token)

        if user["role"] != "admin":
            response = func.HttpResponse("Forbidden: Only admins can retrieve reports.", status_code=403)
            return add_cors_headers(response)

        # List blobs in the reports container
        blob_service_client = BlobServiceClient.from_connection_string(os.getenv("AzureWebJobsStorage"))
        container_client = blob_service_client.get_container_client(os.getenv("BLOB_CONTAINER_NAME", "reports"))

        blobs = []
        for blob in container_client.list_blobs():
            # Extract metadata from the blob name
            name_parts = re.match(r"report_(.+?)_(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}).csv", blob.name)
            if name_parts:
                report_type = name_parts.group(1).replace("_", " ").title()  # Format type nicely
                timestamp = name_parts.group(2)
            else:
                report_type = "Unknown Type"
                timestamp = "Unknown Timestamp"

            blobs.append({
                "name": blob.name,
                "url": f"https://{blob_service_client.account_name}.blob.core.windows.net/{os.getenv('BLOB_CONTAINER_NAME', 'reports')}/{blob.name}",
                "type": report_type,
                "timestamp": timestamp
            })

        response = func.HttpResponse(
            body=json.dumps({"reports": blobs}),
            status_code=200,
            mimetype="application/json"
        )
        return add_cors_headers(response)

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        response = func.HttpResponse(f"Internal server error: {str(e)}", status_code=500)
        return add_cors_headers(response)
