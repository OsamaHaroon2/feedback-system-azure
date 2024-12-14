import azure.functions as func
from shared.database import get_container
from shared.auth import encode_jwt
from shared.cors import add_cors_headers, handle_options
import bcrypt
import logging
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Handle CORS preflight request
    if req.method == "OPTIONS":
        return handle_options(req)

    try:
        # Parse request data
        data = req.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            response = func.HttpResponse("Email and password are required.", status_code=400)
            return add_cors_headers(response)

        # Get the Cosmos DB container
        container = get_container("Users")

        # Retrieve user
        users = list(container.query_items(
            query="SELECT * FROM c WHERE c.id=@id",
            parameters=[{"name": "@id", "value": email}],
            enable_cross_partition_query=True
        ))

        if not users:
            response = func.HttpResponse("Invalid email or password.", status_code=401)
            return add_cors_headers(response)

        user = users[0]

        # Verify password
        if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
            response = func.HttpResponse("Invalid email or password.", status_code=401)
            return add_cors_headers(response)

        # Generate JWT
        token = encode_jwt({"id": user["id"], "role": user["role"]})

        response = func.HttpResponse(
            body=json.dumps({"token": token}),
            status_code=200,
            mimetype="application/json"
        )
        return add_cors_headers(response)

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        response = func.HttpResponse(f"Internal server error: {str(e)}", status_code=500)
        return add_cors_headers(response)
