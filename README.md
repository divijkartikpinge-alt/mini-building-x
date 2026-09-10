# Mini Building X

Mini Building X is a small full-stack project with a FastAPI backend, an Angular frontend, and a concurrent Go sensor simulator. SQLite is the shared persistence target.

## Project layout

- `backend/` - FastAPI application and SQLite access
- `frontend/` - Angular application
- `sensor-sim/` - Go simulator placeholder

## Local development

### Backend

```text
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```text
cd frontend
npm install
npm start
```

### Sensor simulator

```text
cd sensor-sim
go run .
```