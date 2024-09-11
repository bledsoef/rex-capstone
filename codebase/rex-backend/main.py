from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware  # Import the CORS middleware
from mangum import Mangum
import uvicorn
from database.config import engine, SessionLocal, Base
import app.controllers.artists as artists
import app.controllers.users as users
import app.controllers.reviews as reviews
import app.controllers.playlists as playlists
import app.controllers.rex as rex
import app.controllers.songs as songs
import app.controllers.stats as stats

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow both POST and OPTIONS methods
    allow_headers=["*"],
)
app.include_router(artists)
app.include_router(reviews)
app.include_router(rex)
app.include_router(songs)
app.include_router(users)
app.include_router(playlists)
app.include_router(stats)

Base.metadata.create_all(bind=engine)
handler = Mangum(app)

if __name__ == "__main__":
   uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)