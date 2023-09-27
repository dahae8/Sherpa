from fastapi import FastAPI, responses

from app.routers import community_rec

app = FastAPI()

@app.get("/fastapi")
def main():
    return responses.RedirectResponse(url="/docs/")

app.include_router(community_rec.router)
