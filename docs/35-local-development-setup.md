# 🔧 Local Development Setup Guide: Sun AI

**Version:** 1.0  
**Status:** Published  
**Author:** Senior Full-Stack Architect  
**Goal:** To provide a single, step-by-step guide for developers to set up a complete and functional local development environment for the Sun AI platform.

---

## 1. Prerequisites

Before you begin, ensure you have the following installed on your machine:
-   **Node.js:** v18.x or later ([nvm](https://github.com/nvm-sh/nvm) is recommended for managing Node versions).
-   **npm** or **yarn:** The package manager of your choice.
-   **Git:** For version control.
-   **Docker:** Required to run the Supabase local development environment.
-   **Supabase CLI:** Install it globally via npm:
    ```bash
    npm install -g supabase
    ```

## 2. Initial Project Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd sun-ai
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## 3. Supabase Local Environment Setup

The Supabase CLI uses Docker to run a complete, local Supabase stack (Postgres, Auth, Storage, etc.).

1.  **Start Supabase Services:**
    From the project root, run:
    ```bash
    supabase start
    ```
    -   This will download the necessary Docker images and start the local Supabase services.
    -   **Important:** The first time you run this, it may take several minutes.

2.  **Access Local Supabase Studio:**
    Once the services are running, the CLI will output your local Supabase credentials, including:
    -   **API URL:** `http://localhost:54321`
    -   **DB URL:** `postgresql://postgres:postgres@localhost:54322/postgres`
    -   **Studio URL:** `http://localhost:54323`
    -   **Anon Key** and **Service Role Key**.

    Open the **Studio URL** in your browser to access the local database dashboard.

## 4. Environment Variable Configuration

The frontend application and Supabase functions require environment variables to connect to the local services.

1.  **Create Frontend Environment File:**
    -   In the project root, you should already have a `.env` file for your VITE variables. If not, create one.
    -   Add the credentials output by `supabase start` to your `.env` file. These are **public keys** and are safe to commit.
    ```env
    # .env
    VITE_SUPABASE_URL=http://localhost:54321
    VITE_SUPABASE_ANON_KEY=<your-local-anon-key>
    ```

2.  **Create Backend (Edge Functions) Environment File:**
    -   For secrets, create a local environment file for your Supabase functions. **This file is ignored by git and should never be committed.**
    -   File path: `supabase/.env.local`
    ```env
    # supabase/.env.local
    GEMINI_API_KEY=<your-actual-gemini-api-key>
    ```
    -   The Supabase CLI will automatically load these variables when you run your functions locally.

## 5. Running the Application

You are now ready to run the full stack locally.

1.  **Start the React Development Server:**
    In your terminal (from the project root), run:
    ```bash
    npm run dev
    ```

2.  **Verify the Application:**
    -   Open your browser to `http://localhost:5173` (or the URL provided by Vite).
    -   The Sun AI website should load.
    -   You should be able to sign up, log in, and use the AI Brief Wizard. The data will be saved to your local Supabase database instance.

## 6. Common Troubleshooting

-   **Error: `supabase` command not found:**
    -   Ensure the Supabase CLI was installed globally (`npm install -g supabase`).
-   **Error: Docker is not running:**
    -   Make sure the Docker Desktop application is open and running before you run `supabase start`.
-   **Error: Port 54321 is already in use:**
    -   Another service (or an old Supabase instance) is using a required port. Stop the other service, or run `supabase stop` followed by `supabase start`.
-   **AI Brief Wizard Fails:**
    -   Verify that you have created the `supabase/.env.local` file and correctly added your `GEMINI_API_KEY`.
    -   Check the logs for your local Edge Function by running `supabase functions serve` in a separate terminal.

---

By following these steps, you will have a fully isolated, functional development environment that mirrors the production architecture, allowing for safe and efficient development.