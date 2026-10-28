# CareerConnect — Job Portal

A responsive job portal built with React that helps users explore job listings and manage job and candidate records through a clean, interactive interface.

**Live Demo:** https://career-route-frontend.vercel.app/  
**GitHub Repository:** https://github.com/patidarritesh73-cmd/CareerRoute-Frontend

## Overview

CareerConnect is a frontend-focused job portal project developed to practise React, component-based UI development, client-side routing, CRUD operations, form handling, and browser-based data persistence.

The application provides separate views for jobs and candidates, with navigation between pages and a responsive layout for different screen sizes.

## Features

- **Job Management:** Create, view, edit, and delete job listings.
- **Candidate Management:** Add, view, edit, and delete candidate records.
- **Job Search and Filtering:** Find relevant jobs using available search and filter controls.
- **Job Details:** View individual job information and navigate through job-related pages.
- **React Router:** Navigate between application pages without full-page reloads.
- **Form Validation:** Handle required fields and invalid input.
- **Loading and Error States:** Display appropriate feedback where implemented.
- **Local Storage Persistence:** Keep supported job and candidate data available after refreshing the browser.
- **Responsive UI:** Layout designed to work across desktop and mobile screen sizes.
- **Not Found Page:** Handle unsupported routes.

## Tech Stack

- **React** — Component-based user interface
- **JavaScript** — Application logic and interactions
- **Vite** — Development server and production build
- **React Router** — Client-side routing
- **HTML5** — Page structure
- **CSS3** — Styling and responsive layouts
- **Browser Local Storage** — Client-side data persistence
- **Git and GitHub** — Version control and source code hosting
- **Vercel** — Deployment

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/patidarritesh73-cmd/CareerRoute-Frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CareerRoute-Frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## Production Build

To create a production build, run:

```bash
npm run build
```

Vite generates the production-ready files in the `dist` directory.

## What I Learned

Through this project, I practised:

- Building reusable React components.
- Managing component state and user interactions.
- Implementing client-side routing and route parameters.
- Performing CRUD operations for jobs and candidates.
- Handling controlled forms and validation.
- Persisting application data using Local Storage.
- Creating responsive layouts.
- Building and deploying a React application.
- Configuring Vercel rewrites to support direct access to React Router routes.

## Current Limitations

- The application is primarily frontend-focused.
- Data persistence uses browser Local Storage rather than a backend database.
- Login and registration interfaces are demonstration features; production authentication and server-side authorization are not implemented.

## Future Improvements

- Build a Node.js and Express backend.
- Integrate MongoDB for persistent database storage.
- Implement secure authentication and role-based authorization.
- Add automated tests.
- Improve deployment and application monitoring.

## Author

**Ritesh Patidar**

- GitHub: https://github.com/patidarritesh73-cmd

---

*CareerConnect is a learning and portfolio project focused on React development and job portal workflows.*