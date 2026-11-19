# GrowWoo

Full-stack application monorepo.

> 📖 **Important**: For team onboarding, integration guidelines (ports, CORS, API proxy), and progress logs, see **[PROJECT_TRACK.md](./PROJECT_TRACK.md)**.

## Project Structure

```text
growwoo/
├── frontend/          # React.js application (powered by Vite)
├── backend/           # Spring Boot application
├── PROJECT_TRACK.md   # Tracking log & Backend/Frontend integration guide
├── .gitignore         # Monorepo gitignore covering React and Spring Boot
└── README.md
```

## Getting Started

### Active Branch
We are using the **`dev`** branch for all active development. Please branch off and target PRs to `dev`.

### Frontend (React.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend (Spring Boot)
- The `backend/` directory is prepared for the Spring Boot project.
- Please refer to **[PROJECT_TRACK.md](./PROJECT_TRACK.md)** for instructions on setup, expected structure, and CORS/API configuration.
