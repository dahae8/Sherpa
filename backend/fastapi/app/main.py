from fastapi import FastAPI, responses

# from app.routers import recommend_media

app = FastAPI()

@app.get("/")
def main():
    return responses.RedirectResponse(url="/docs/")

# app.include_router(recommend_media.router)
