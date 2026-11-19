# Project Track & Integration Guide

Welcome to **GrowWoo**! This document maintains a running record of changes made to the repository, project conventions, and instructions for team members on how frontend and backend connect.

---

## 1. Project Overview & Tech Stack

| Component | Technology | Directory | Default Port | Responsible |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | `frontend/` | `http://localhost:5173` | Frontend Team |
| **Backend** | Java / Spring Boot | `backend/` | `http://localhost:8080` | Backend Team |
| **Git Branch** | Active: `dev` | — | — | Whole Team |

---

## 2. Activity & Progress Log

| Date | Author | Branch | Description |
| :--- | :--- | :--- | :--- |
| 2026-11-19 | Repo Admin | `dev` | Merged Login and Register authentication features into `dev`: full-screen split Login page (pill inputs, forgot password recovery flow, social sign-in) and comprehensive 6-step Candidate Registration Stepper (Basic Info with City/State/Country, Education, conditional Fresher/Experience toggle, Detailed Projects, Skills, Preferences, Full Profile Preview & inline section editing). |
| 2026-11-19 | Repo Admin | `feature/login` | Created `feature/login` branch, established centralized CSS design system tokens in `frontend/src/index.css` (headings, fonts, colors, buttons, inputs), installed `lucide-react`, and built the responsive Login page (`frontend/src/pages/Login.jsx`). |
| 2026-11-19 | Repo Admin | `dev` | Added `PROJECT_TRACK.md` (onboarding & API integration contract) and configured Vite proxy in `frontend/vite.config.js` to route `/api` calls to Spring Boot (`:8080`). |
| 2026-11-19 | Repo Admin | `dev` | Initialized monorepo structure: scaffolded React (Vite) app in `frontend/`, reserved `backend/` with `.gitkeep`, set up root `.gitignore` and `README.md`, created and pushed `dev` branch to remote. |

*(Please append a new row above whenever a major milestone or feature is completed)*

---

## 3. Backend Developer Guide (How to Get Started)

### Step 1: Clone and Checkout `dev`
```bash
git clone https://github.com/RPY09/growwoo.git
cd growwoo
git checkout dev
git pull origin dev
```

### Step 2: Setting up Spring Boot in `backend/`
You can initialize your Spring Boot project (via [start.spring.io](https://start.spring.io) or your IDE like IntelliJ / Eclipse / VS Code) directly into the `backend/` directory.

**Recommended Setup:**
* **Project**: Maven or Gradle
* **Language**: Java 17 or 21
* **Spring Boot**: 3.x
* **Dependencies**: Spring Web, Spring Boot DevTools, Lombok (optional), Spring Data JPA / Database driver of choice.

**Expected Folder Structure inside `backend/`:**
```text
backend/
├── pom.xml (or build.gradle)
├── mvnw / gradlew
├── src/
│   ├── main/
│   │   ├── java/com/growwoo/...
│   │   └── resources/
│   │       ├── application.properties (or application.yml)
│   └── test/
```

> **Note on `.gitkeep`**: Once you create your files in `backend/`, you may safely remove `backend/.gitkeep`.

---

## 4. Frontend & Backend Connection (API Contract)

### A. Endpoint Standard
* All backend REST endpoints should start with the prefix: `/api/` (or `/api/v1/`).
  * Example: `GET http://localhost:8080/api/v1/users`
  * Example: `POST http://localhost:8080/api/v1/auth/login`

### B. Handling CORS (Cross-Origin Resource Sharing)
Since the React frontend runs on `http://localhost:5173` and Spring Boot runs on `http://localhost:8080`, please configure CORS in Spring Boot.

**Option 1: Global CORS Config (Recommended)**
Add a configuration class in `backend/`:
```java
package com.growwoo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

**Option 2: Controller-level**
```java
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class SampleController {
    // endpoints
}
```

### C. Vite Development Proxy (Frontend Side)
The React application's `vite.config.js` is configured to proxy all `/api` requests to `http://localhost:8080`:
```javascript
// frontend/vite.config.js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```
* **Frontend Devs**: When making API calls with `fetch` or `axios`, you can simply request `/api/v1/...` without hardcoding `http://localhost:8080`.

---

## 5. Git & Collaboration Workflow

1. **Active Branch**: All feature work must be based on the `dev` branch.
   * **Do NOT push directly to `main`**.
2. **Feature Branches**:
   * Create feature branches off `dev`:
     ```bash
     git checkout dev
     git pull origin dev
     git checkout -b feature/backend-auth
     ```
3. **Pull Requests**:
   * When your feature is done, push your branch and submit a Pull Request targeting **`dev`**.
4. **Final Release**:
   * Once frontend and backend are integrated, tested, and verified on `dev`, `dev` will be merged into `main`.
