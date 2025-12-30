# Deployment Guide

This guide explains how to deploy the frontend to **Netlify** and the backend to **Render**.

## 1. Prerequisites

Ensure your code is pushed to your GitHub repository:
`https://github.com/Ajaicoder-dot/Event-Management`

## 2. Backend Deployment (Render)

1.  Log in to [Render.com](https://render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository (`Ajaicoder-dot/Event-Management`).
4.  Configure the service:
    *   **Name**: `event-booking-api` (or similar)
    *   **Root Directory**: `api` (Important! This tells Render the backend is in the api folder)
    *   **Environment**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
5.  Click **Create Web Service**.
6.  Wait for the deployment to finish. **Copy the URL** provided by Render (e.g., `https://event-booking-api.onrender.com`).

## 3. Frontend Deployment (Netlify)

1.  Log in to [Netlify.com](https://www.netlify.com/).
2.  Click **Add new site** -> **Import from existing project**.
3.  Select **GitHub** and authorize if needed.
4.  Pick your repository (`Ajaicoder-dot/Event-Management`).
5.  Configure the build settings:
    *   **Base directory**: `client`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
6.  **Environment Variables**:
    *   Click **Show advanced**, then **New Variable**.
    *   **Key**: `VITE_API_URL`
    *   **Value**: Paste your Render Backend URL here (e.g., `https://event-booking-api.onrender.com`).
7.  Click **Deploy site**.

## 4. Verification

1.  Open your Netlify site URL.
2.  The application should load and show events fetched from your Render backend.
