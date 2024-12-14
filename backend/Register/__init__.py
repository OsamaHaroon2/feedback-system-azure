import azure.functions as func
from shared.database import get_container
from shared.cors import add_cors_headers, handle_options
import bcrypt
import os
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Handle CORS preflight request
    if req.method == "OPTIONS":
        return handle_options(req)

    try:
        # Parse request data
        data = req.get_json()
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "student")
        registration_code = data.get("registration_code")

        if not email or not password:
            response = func.HttpResponse("Email and password are required.", status_code=400)
            return add_cors_headers(response)

        if role == "admin":
            if registration_code != os.getenv("REGISTRATION_CODE"):
                response = func.HttpResponse("Invalid registration code for admin.", status_code=403)
                return add_cors_headers(response)

        # Get the Cosmos DB container
        container = get_container("Users")

        # Check if the user already exists
        existing_users = list(container.query_items(
            query="SELECT * FROM c WHERE c.id=@id",
            parameters=[{"name": "@id", "value": email}],
            enable_cross_partition_query=True
        ))

        if existing_users:
            response = func.HttpResponse("User already exists.", status_code=400)
            return add_cors_headers(response)

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

        # Save the user to Cosmos DB
        user = {
            "id": email,
            "role": role,
            "password": hashed_password.decode("utf-8")
        }
        container.create_item(user)

        response = func.HttpResponse("User registered successfully.", status_code=201)
        return add_cors_headers(response)

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        response = func.HttpResponse(f"Internal server error: {str(e)}", status_code=500)
        return add_cors_headers(response)
