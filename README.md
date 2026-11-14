# CareerConnect — Job Portal

A responsive job portal built with React that helps users explore job listings and manage job and candidate records through a clean, interactive interface.

**Live Demo:** [https://career-route-frontend.vercel.app/](https://career-route-frontend.vercel.app/)

**GitHub Repository:** [https://github.com/patidarritesh73-cmd/CareerRoute-Frontend](https://github.com/patidarritesh73-cmd/CareerRoute-Frontend)

## Overview

CareerConnect is a React-based job portal project developed to practise component-based UI development, client-side routing, CRUD operations, form handling, API integration, and frontend-backend communication.

The application provides separate sections for managing jobs and candidates. It communicates with a Node.js backend API to fetch, create, update, and delete records instead of relying on browser Local Storage.

## Features

- **Job Management:** Create, view, edit, and delete job listings through backend API integration.
- **Candidate Management:** Add, view, edit, and delete candidate records through backend API integration.
- **Job Search and Filtering:** Find relevant jobs using search and available filter controls.
- **Job Details:** View individual job information and navigate through job-related pages.
- **Candidate Details:** View individual candidate information.
- **React Router:** Navigate between application pages without full-page reloads.
- **API Integration:** Communicate with the Node.js backend using Fetch API.
- **Centralized API Configuration:** Manage the backend API base URL from a common configuration file.
- **Environment Variables:** Configure the API base URL using Vite environment variables.
- **Form Validation:** Handle required fields and invalid input.
- **Loading and Error States:** Display appropriate feedback while fetching or processing data.
- **Backend Data Persistence:** Store and manage job and candidate records through the backend rather than browser Local Storage.
- **Responsive UI:** Layout designed to work across desktop and mobile screen sizes.
- **Not Found Page:** Handle unsupported routes.

## Tech Stack

- **React** — Component-based user interface
- **JavaScript** — Application logic and interactions
- **Vite** — Development server and production build
- **React Router** — Client-side routing
- **Fetch API** — Frontend-backend communication
- **Node.js** — Backend runtime and API integration
- **HTML5** — Page structure
- **CSS3** — Styling and responsive layouts
- **Git and GitHub** — Version control and source code hosting
- **Vercel** — Frontend deployment

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed
- CareerConnect backend API running

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

4. Create a `.env` file in the project root directory and configure the backend API URL:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in your terminal.

**Note:** The backend API must also be running on port 5000 for job and candidate operations to work.

## Production Build

To create a production build, run:

```bash
npm run build
```

Vite generates the production-ready files in the `dist` directory.

For deployment, configure `VITE_API_BASE_URL` with the publicly accessible backend API URL in the hosting platform's environment variables.

## What I Learned

Through this project, I practised:

- Building reusable React components.
- Managing component state and user interactions.
- Implementing client-side routing and route parameters.
- Performing CRUD operations for jobs and candidates.
- Integrating React frontend with a Node.js backend API.
- Making HTTP requests using the Fetch API.
- Handling controlled forms and validation.
- Managing loading, error, and API response states.
- Centralizing API configuration using environment variables.
- Creating responsive layouts.
- Building and deploying a React application.
- Configuring Vercel rewrites to support direct access to React Router routes.

## Current Limitations

- The backend currently uses JSON file-based data storage rather than MongoDB.
- Express.js migration and MongoDB integration are planned improvements.
- Login and registration interfaces are demonstration features; production authentication and server-side authorization are not implemented.
- The live frontend requires a properly configured, publicly accessible backend API for full functionality.

## Future Improvements

- Migrate the existing Node.js backend to Express.js.
- Integrate MongoDB using Mongoose.
- Implement secure authentication and role-based authorization.
- Add automated tests.
- Improve deployment and application monitoring.
- Enhance API error handling and application security.

## Author

**Ritesh Patidar**

- GitHub: [https://github.com/patidarritesh73-cmd](https://github.com/patidarritesh73-cmd)

---

*CareerConnect is a learning and portfolio project focused on React development, backend API integration, and job portal workflows.*