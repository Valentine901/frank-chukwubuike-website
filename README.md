# Client Portfolio Showcase

A high-performance, fully dynamic portfolio website built for a premium client. This project features a modern frontend interface, an synchronous administrative backend,
cloud-optimized media delivery. The application is completely live and deployed across production environments.

---

## Live Deployments
* **Frontend Application:** [Vercel Deployment Link](https://vercel.app)
* **Backend API & Database:** [Render Service Link](https://onrender.com)

---

## Features
* **Dynamic Portfolio Engine:** Content, project galleries, case studies, and client testimonials are managed via the database and updated in real time without code redeployments.
* **Asynchronous Lead Generation:** Contact forms and project inquiries are processed instantaneously using non-blocking background workers.
* **Automated Media Optimization:** Images, assets, and project files are automatically transformed, compressed, and delivered globally via an edge CDN.
* **Secure Admin Dashboard:** A protected administrative portal allows the client to modify project details, update copy, and download incoming user inquiries.

---

## Tech Stack
* **Frontend:** React (Vite), Tailwind CSS (Highly optimized, responsive utility-first design)
* **Backend:** Python, FastAPI (Asynchronous, high-concurrency API layer with automated OpenAPI endpoints)
* **Database:** PostgreSQL (Relational storage tracking client projects, categories, and incoming user inquiries)
* **Media Management:** Cloudinary (Global cloud storage, automated image optimization, and CDN delivery)
* **Hosting & Infrastructure:** 
  * **Vercel:** Static frontend hosting with edge distribution.
  * **Render:** Managed cloud hosting for the live FastAPI web service and managed PostgreSQL database instance.

---

## Local Development Setup
### Prerequisites
* Node.js (v18+ or recommended LTS)
* Python (3.10+)
* PostgreSQL (Local instance for development environment)

### Installation & Environment Configuration

#### 1. Backend Service (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_dev
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
JWT_SECRET=your_jwt_signing_key_for_admin_dashboard
```

Run the local API server:
```bash
uvicorn main:app --reload
```
*Access local Swagger API documentation at `http://127.0.0`*

#### 2. Frontend Application (React)
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://127.0.0.1:8000
```

Run the application:
```bash
npm run dev
```

---

## Production Deployment Guide

### Frontend Deployment (Vercel)
1. Push the `frontend` code directory to GitHub.
2. Link the repository to your Vercel Dashboard.
3. Configure the Root Directory to `frontend`.
4. Add the Environment Variable `VITE_API_URL` pointing to your live Render API URL.

### Backend & Database Deployment (Render)
1. Provision a managed **PostgreSQL** database instance on Render.
2. Create a new **Web Service**, link your repository, and set the Root Directory to `backend`.
3. Set the Runtime to `Python` and configure the Build Command to `pip install -r requirements.txt`.
4. Set the Start Command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. Attach the production environment variables (`DATABASE_URL`, `CLOUDINARY_URL`, `JWT_SECRET`) directly within the Render environment console.

---

## License

This repository is private property and custom-built specifically for [Client Name]. All rights reserved.
