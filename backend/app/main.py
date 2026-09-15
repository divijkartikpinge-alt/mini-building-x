# API version: v1-alpha
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.db import get_connection


class ReadingCreate(BaseModel):
    device_id: str
    metric: str
    value: float


class Reading(ReadingCreate):
    id: int
    timestamp: str


def create_readings_table() -> None:
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                device_id TEXT NOT NULL,
                metric TEXT NOT NULL,
                value REAL NOT NULL,
                timestamp TEXT NOT NULL
            )
            """
        )


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    create_readings_table()
    yield


app = FastAPI(title="Mini Building X API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/readings", response_model=list[Reading])
def get_readings() -> list[Reading]:
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, device_id, metric, value, timestamp
            FROM readings
            ORDER BY timestamp DESC
            """
        ).fetchall()
    return [Reading(**dict(row)) for row in rows]


@app.post("/readings", response_model=Reading, status_code=201)
def create_reading(reading: ReadingCreate) -> Reading:
    timestamp = datetime.now(timezone.utc).isoformat()
    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO readings (device_id, metric, value, timestamp)
            VALUES (?, ?, ?, ?)
            """,
            (reading.device_id, reading.metric, reading.value, timestamp),
        )
        reading_id = cursor.lastrowid

    return Reading(
        id=reading_id,
        device_id=reading.device_id,
        metric=reading.metric,
        value=reading.value,
        timestamp=timestamp,
    )