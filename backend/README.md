# Hadassah Royal Backend

This backend provides core account and delivery tracking services for the Hadassah Royal app.

## Setup

1. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the app:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## API Endpoints

- `POST /auth/register` — create an account
- `POST /auth/login` — authenticate and receive a JWT
- `GET /users/me` — fetch the current user profile
- `PATCH /users/{user_id}` — update account details
- `GET /deliveries` — list tracked deliveries
- `POST /deliveries` — create a new delivery record
- `GET /deliveries/{delivery_id}` — read delivery status
- `PATCH /deliveries/{delivery_id}` — update delivery status/location
- `GET /deliveries/stream` — WebSocket streaming endpoint for live delivery updates

## Notes

- The backend uses SQLite for local development.
- Update the `SECRET_KEY` in `backend/app/security.py` for production use.
