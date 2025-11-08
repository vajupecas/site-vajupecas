from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import product_model, products, service, slider, text, admin, auth, producer, product_type, media, client
from database.db import init_db
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://site-vajupecas-1.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/media", StaticFiles(directory="media"), name="media")

app.include_router(products.router)
app.include_router(product_model.router)
app.include_router(producer.router)
app.include_router(product_type.router)
app.include_router(text.router)
app.include_router(admin.router)
app.include_router(client.router)
app.include_router(auth.router)
app.include_router(media.router)
app.include_router(service.router)
app.include_router(slider.router)
