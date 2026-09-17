# Mini Building X

Mini Building X is a small full-stack project with a FastAPI backend, an Angular frontend, and a concurrent Go sensor simulator. SQLite is the shared persistence target.

## Project layout

- `backend/` - FastAPI application and SQLite access
- `frontend/` - Angular application
- `sensor-sim/act-layer/` - Go Act-layer threshold checker

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

Open `http://localhost:4200/readings`. The readings view polls the backend every two seconds. Post a new reading from another terminal to see it appear without refreshing:

```text
curl -X POST http://localhost:8000/readings -H "Content-Type: application/json" -d "{\"device_id\":\"temp-live\",\"metric\":\"temperature\",\"value\":31.5}"
```

### Sensor simulator

```text
cd sensor-sim/act-layer
go run . 31.5
```

The first Act-layer rule is: temperatures above 30 C require cooling.

Angular matches a URL by comparing it with the route definitions in order, then renders the component attached to the first matching route inside `router-outlet`. A wildcard route handles URLs that match nothing else.

An Observable can emit zero, one, or many values over time and can be cancelled; a Promise resolves once with one eventual value. `unsubscribe()` cancels an Observable subscription and releases its resources. Skipping it can retain callbacks and component state after a component is gone, causing memory leaks when the source keeps emitting.