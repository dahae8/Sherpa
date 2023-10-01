from fastapi import FastAPI, responses

from app.routers import news, newsTheme, keyword
from app.routers import media

app = FastAPI()

@app.get("/")
def main():
    return responses.RedirectResponse(url="/docs/")

app.include_router(news.router)
app.include_router(newsTheme.router)
app.include_router(media.router)
app.include_router(keyword.router)