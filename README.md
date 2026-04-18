# School Management API

Node.js + Express + MySQL REST API for managing school data with proximity-based sorting.

---

## Project Structure

```
school-api/
├── index.js                          # App entry point
├── config/
│   └── db.js                         # MySQL connection pool + auto table creation
├── controllers/
│   └── schoolController.js           # Business logic for both APIs
├── middleware/
│   └── validators.js                 # Input validation + Haversine distance formula
├── routes/
│   └── schools.js                    # Route definitions
├── setup.sql                         # DB setup + optional seed data
├── SchoolAPI.postman_collection.json  # Ready-to-import Postman collection
└── .env.example                      # Environment variables template
```

---

## Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd school-api
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

### 3. Create Database

```bash
mysql -u root -p < setup.sql
```
Or run the SQL manually in MySQL Workbench / phpMyAdmin.

> **Note:** The app also auto-creates the `schools` table on startup if it doesn't exist.

### 4. Run

```bash
node index.js
# Server starts on http://localhost:3000
```

---

## API Reference

### POST `/addSchool`

Add a new school to the database.

**Request Body (JSON):**
```json
{
  "name": "DPS Pune",
  "address": "Lohegaon, Pune, Maharashtra 411032",
  "latitude": 18.5793,
  "longitude": 73.9089
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "DPS Pune",
    "address": "Lohegaon, Pune, Maharashtra 411032",
    "latitude": 18.5793,
    "longitude": 73.9089
  }
}
```

**Validation Error (422):**
```json
{
  "success": false,
  "errors": [
    { "field": "name", "message": "Name is required" }
  ]
}
```

---

### GET `/listSchools`

Fetch all schools sorted by proximity to the user's location.

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| latitude | float | ✅ | User's latitude (-90 to 90) |
| longitude | float | ✅ | User's longitude (-180 to 180) |

**Example:** `GET /listSchools?latitude=18.5204&longitude=73.8567`

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "user_location": { "latitude": 18.5204, "longitude": 73.8567 },
  "data": [
    {
      "id": 3,
      "name": "The Orchid School",
      "address": "Baner, Pune",
      "latitude": 18.559,
      "longitude": 73.7868,
      "distance_km": 7.83
    }
  ]
}
```

---

## Distance Calculation

Uses the **Haversine formula** to compute great-circle distance between two GPS coordinates. Results are in kilometres, rounded to 2 decimal places.

---

## Deployment (Railway / Render / Heroku)

1. Push code to GitHub.
2. Create a new project on [Railway](https://railway.app) or [Render](https://render.com).
3. Add a MySQL plugin/service.
4. Set environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`).
5. Deploy — your live URL will be shown in the dashboard.

---

## Postman Collection

Import `SchoolAPI.postman_collection.json` into Postman:
- Set the `BASE_URL` variable to your deployed URL.
- All 4 requests (including validation tests) are pre-configured with example payloads and documented responses.