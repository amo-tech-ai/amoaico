# 🚀 AI-Assisted Database Setup: Cloud SQL for Sunai

**Document Status:** Published - 2024-08-20
**Author:** Senior Full-Stack Engineer
**Goal:** To provide a practical, prompt-driven guide for developers using an AI code assistant (e.g., Gemini Code Assist in VS Code) to provision, configure, and migrate the Sunai application's database on Google Cloud SQL. This document operationalizes the plans defined in `docs/09-db-schema.md`.

---

### **Overview**

This is not a traditional tutorial but a series of prompts you can give to your AI assistant to generate the necessary commands and scripts. This method accelerates setup, reduces manual error, and ensures consistency with our project's architectural plans.

### **Prerequisites**

1.  **Google Cloud SDK:** Installed and authenticated (`gcloud auth login`).
2.  **Cloud SQL Auth Proxy:** Downloaded and available in your PATH.
3.  **IDE with AI Assistant:** VS Code with the Gemini Code Assist extension is recommended.
4.  **Project Files:** You must have the complete project codebase, including the `/docs` directory.

---

### **Step 1: Provision the Cloud SQL Instance**

The first step is to create the core database infrastructure on Google Cloud.

> **Your Prompt:**
>
> ```prompt
> /generate a gcloud cli command to create a Cloud SQL for PostgreSQL 15 instance. Use the configuration details from `docs/09-db-schema.md`: instance name 'sunai-agency-db-prod', region 'us-central1', 2 vCPUs, and 4GB of memory. Prompt for a root password.
> ```

**Expected AI-Generated Command:**

```bash
gcloud sql instances create sunai-agency-db-prod \
    --database-version=POSTGRES_15 \
    --region=us-central1 \
    --cpu=2 \
    --memory=4GB \
    --root-password="YOUR_STRONG_PASSWORD_HERE"
```
*Execute this command in your terminal.*

---

### **Step 2: Create the Database & User**

With the instance running, create the specific database and a dedicated user for our application.

> **Your Prompt:**
>
> ```prompt
> /generate the gcloud commands to create a database named 'sunai_agency_prod' and a user named 'api_user' with a secure password for the 'sunai-agency-db-prod' instance.
> ```

**Expected AI-Generated Commands:**

```bash
# Create the database
gcloud sql databases create sunai_agency_prod --instance=sunai-agency-db-prod

# Create the application user
gcloud sql users create api_user --instance=sunai-agency-db-prod --password="ANOTHER_STRONG_PASSWORD"
```
*Execute these commands in your terminal.*

---

### **Step 3: Apply the Database Schema**

Now, populate the database with our tables and functions.

**Action:**
1.  Copy the entire SQL schema from `docs/09-db-schema.md`.
2.  Save it into a new file named `20240819120000_init_agency_schema.sql` in the project root.
3.  Start the Cloud SQL Auth Proxy in a separate terminal window.

> **Your Prompt:**
>
> ```prompt
> /generate a psql command to connect to the 'sunai_agency_prod' database on localhost via the Cloud SQL proxy as the 'api_user' and execute the schema from the file `20240819120000_init_agency_schema.sql`.
> ```

**Expected AI-Generated Command:**

```bash
# First, ensure the proxy is running in another terminal:
# ./cloud-sql-proxy <YOUR_INSTANCE_CONNECTION_NAME>

# Then, execute this command:
psql "host=127.0.0.1 port=5432 dbname=sunai_agency_prod user=api_user" \
    -f 20240819120000_init_agency_schema.sql
```
*Execute the `psql` command to migrate your schema.*

---

### **Step 4: Secure Tables with Row-Level Security (RLS)**

Apply the security policies that prevent users from seeing each other's data.

> **Your Prompt:**
>
> ```prompt
> Generate the SQL to enable Row-Level Security and create policies for the `profiles` and `briefs` tables, ensuring users can only manage their own records. Use the exact policies from `docs/09-db-schema.md`.
> ```

**Expected AI-Generated SQL:**
```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;

-- Policy for profiles
CREATE POLICY "Users can manage their own profile."
ON public.profiles FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy for briefs
CREATE POLICY "Users can manage their own briefs."
ON public.briefs FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```
*Execute this SQL against your database using `psql` or your favorite SQL client.*

---

### **Step 5: Verification**

Confirm that the setup was successful.

> **Your Prompt:**
>
> ```prompt
> Generate a psql query to list all tables in the current database. Then, generate a query to describe the columns and indexes of the 'briefs' table.
> ```

**Expected AI-Generated Commands:**

```sql
-- To list all tables:
\dt

-- To describe the 'briefs' table:
\d briefs
```

*Run these in an active `psql` session to verify your schema is correctly applied.*

---

### **Conclusion**

By leveraging an AI assistant with clear, context-rich prompts derived from our project documentation, we can execute complex infrastructure setup quickly and accurately. The database is now provisioned, secured, and ready for integration with the Supabase backend layer.
