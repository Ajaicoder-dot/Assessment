# Event Booking Application

A simple, premium event booking application built with React, Vite, Tailwind CSS, and Node.js.

## Project Structure

- `client`: Frontend application (React + Vite)
- `api`: Backend application (Node.js + Express)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Backend Setup

```bash
cd api
npm install
npm run dev
```

The backend server will start on [http://localhost:3001](http://localhost:3001).

### 2. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend application will start on [http://localhost:5173](http://localhost:5173) (or similar port).

## Deployment

### Frontend (Vercel/Netlify)
1. Push this repository to GitHub.
2. Import the `client` directory as the project root in Vercel/Netlify.
3. Build command: `npm run build`
4. Output directory: `dist`
5. **Environment Variables**: Update the API URL in `client/src/App.jsx` to point to your deployed backend URL.

### Backend (Render/Railway/Fly.io)
1. Push this repository to GitHub.
2. Import the `api` directory as the project root.
3. Build command: `npm install`
4. Start command: `node index.js`
5. **Environment Variables**: Ensure `PORT` is handled (default 3001).

## Live Deployment

- **Frontend (Netlify)**: [https://visionary-hamster-014988.netlify.app/](https://visionary-hamster-014988.netlify.app/)
- **Backend (Render)**: [https://assessment-a5sb.onrender.com](https://assessment-a5sb.onrender.com)
- **GitHub Repository**: [https://github.com/Ajaicoder-dot/Assessment](https://github.com/Ajaicoder-dot/Assessment)

## Features

- **Real-time Availability**: Seats update immediately upon booking (simulated with React Query invalidation).
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **Premium UI**: Uses glassmorphism, smooth animations, and a refined color palette.
- **Form Validation**: Client-side validation for name and email.
- **Duplicate Prevention**: Prevents the same email from booking the same event twice.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Query, React Hook Form, Framer Motion, Axios.
- **Backend**: Node.js, Express, In-memory storage.
