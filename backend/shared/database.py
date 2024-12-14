from azure.cosmos import CosmosClient, PartitionKey
import os
import logging

# Load environment variables
COSMOS_DB_ENDPOINT = os.getenv("COSMOS_DB_ENDPOINT")
COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
COSMOS_DB_DATABASE_NAME = os.getenv("COSMOS_DB_DATABASE_NAME")

# Log the connection details for debugging (optional, mask sensitive data in production)
logging.info(f"COSMOS_DB_ENDPOINT: {COSMOS_DB_ENDPOINT}")
logging.info(f"COSMOS_DB_KEY: {COSMOS_DB_KEY[:5]}******")
logging.info(f"DATABASE_NAME: {COSMOS_DB_DATABASE_NAME}")

# Initialize Cosmos DB client
client = CosmosClient(COSMOS_DB_ENDPOINT, credential=COSMOS_DB_KEY)
database = client.get_database_client(COSMOS_DB_DATABASE_NAME)

def get_container(container_name):
    """
    Retrieve or create a Cosmos DB container with the appropriate partition key.
    """
    containers = {
        "Users": PartitionKey(path="/id"),  # Partition key based on user ID
        "Feedbacks": PartitionKey(path="/subject")  # Partition key based on subject
    }
    if container_name not in containers:
        raise ValueError(f"Unknown container: {container_name}")

    # Create or retrieve the container
    container = database.create_container_if_not_exists(
        id=container_name,
        partition_key=containers[container_name]
    )
    return container