from fastapi import FastAPI, responses

from app.routers import media

app = FastAPI()

@app.get("/")
def main():
    return responses.RedirectResponse(url="/docs/")

app.include_router(media.router)
