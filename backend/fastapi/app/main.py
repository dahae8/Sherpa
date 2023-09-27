from fastapi import FastAPI, responses

from app.routers import news, newsTheme

app = FastAPI()

@app.get("/")
def main():
    return responses.RedirectResponse(url="/docs/")

app.include_router(news.router)
app.include_router(newsTheme.router)