# Student Grievance Redressal Portal

A full-stack web application for students to submit, track, and resolve grievances with the college administration.

## Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Styling**: CSS
- **Icons**: Lucide React
- **Authentication**: JWT + bcrypt

---

## Project Structure

```
sproject/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ProtectedRoute, GrievanceModal
│   │   ├── pages/            # Home, SubmitGrievance, TrackGrievance, About, AdminLogin, AdminDashboard
│   │   ├── services/         # API service (axios)
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                   # Express backend
│   ├── models/               # Grievance, Admin (Mongoose)
│   ├── routes/               # grievances.js, admin.js
│   ├── middleware/            # auth.js (JWT)
│   ├── config/               # db.js (MongoDB connection)
│   ├── server.js
│   └── package.json
│
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment variable template
└── README.md
```

---

## Local Development Setup

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (free tier) or local MongoDB
- npm

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd sproject
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and a JWT secret:

```
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/grievancedb?retryWrites=true&w=majority
JWT_SECRET=some_random_secret_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The server will start on `http://localhost:5000`. On first run, it will automatically create the default admin account using the credentials from `.env`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` and proxy `/api` requests to the backend.

### 4. Default Admin Credentials

- **Username**: `admin` (or whatever you set in `ADMIN_USERNAME`)
- **Password**: `Admin@123` (or whatever you set in `ADMIN_PASSWORD`)

---

## API Endpoints

| Method | Endpoint                     | Description                    | Auth     |
|--------|------------------------------|--------------------------------|----------|
| POST   | `/api/grievances`            | Submit a new grievance         | Public   |
| GET    | `/api/grievances/:trackingId`| Track a grievance              | Public   |
| POST   | `/api/admin/login`           | Admin login                    | Public   |
| GET    | `/api/admin/grievances`      | List all grievances            | Admin    |
| PATCH  | `/api/admin/grievances/:id`  | Update grievance status        | Admin    |
| GET    | `/api/health`                | Health check                   | Public   |

---

## Vercel Deployment

### 1. Push code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
2. Set the **Root Directory** to `client` for the frontend build.
3. Add the following **Environment Variables** in Vercel project settings:
   - `MONGODB_URI` – your MongoDB Atlas connection string
   - `JWT_SECRET` – your JWT secret
   - `ADMIN_USERNAME` – admin username
   - `ADMIN_PASSWORD` – admin password
   - `VITE_API_URL` – your deployed API URL (e.g., `https://your-app.vercel.app`)

### 3. Configure build

- **Build Command**: `npm run build`
- **Output Directory**: `dist`

The `vercel.json` in the root directory routes `/api/*` to the Express backend and serves the React build for all other routes.

### Alternative: Separate Deployment

You can also deploy frontend and backend separately:
- **Frontend** on Vercel (as a Vite static site)
- **Backend** on Render, Railway, or any Node.js hosting

Set the `VITE_API_URL` environment variable in the client to point to your backend URL.

---

## Features

- **Student Grievance Submission** – Complete form with validation, categories, priority levels, and anonymous option
- **Grievance Tracking** – Track complaints by unique ID with visual status progression
- **Admin Dashboard** – View statistics, filter/search grievances, update status, add remarks
- **JWT Authentication** – Secure admin login with hashed passwords
- **Responsive Design** – Mobile-friendly interface
- **MongoDB Persistence** – All data stored in MongoDB

---

## License

This project was created for academic purposes.
