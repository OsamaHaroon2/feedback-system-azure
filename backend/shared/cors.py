from azure.functions import HttpRequest, HttpResponse

def add_cors_headers(response: HttpResponse):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response.headers["Access-Control-Max-Age"] = "3600"
    return response

def handle_options(req: HttpRequest) -> HttpResponse:
    response = HttpResponse(status_code=200)
    return add_cors_headers(response)
