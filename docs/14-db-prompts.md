# 🚀 AI-Assisted Database Setup Part 2: Logic & Data (100% Corrected)

**Document Status:** Version 2.0 - Revised & Validated
**Author:** Senior Full-Stack Engineer
**Goal:** To provide a definitive, 100% correct set of prompts for applying the business logic, security policies, and seed data to the Sunai database. This guide is the direct follow-up to the initial infrastructure setup.

---

### 🚨 **Critical Prerequisite Notice**

**DO NOT PROCEED** unless you have successfully completed the following steps outlined in `docs/11-db-progress-tracker.md`:

1.  ✅ **Provisioned the Cloud SQL Instance.**
2.  ✅ **Created the Supabase Project** and **connected it to your Cloud SQL instance.**
3.  ✅ **Installed the `pg_tle` extension** on Cloud SQL.
4.  ✅ **Installed the Supabase Auth helpers** (which provides `auth.uid()` and other functions).

The following prompts will **FAIL** without this foundation in place. They interact with Supabase-specific schemas (`auth`, `storage`) and functions that only exist *after* the integration is complete.

---

### **Prompt 1: Create the User Profile Trigger**

This trigger is essential for Supabase Authentication to function correctly. It automatically creates a public profile for every new user who signs up.

> **Your Prompt:**
>
> ```prompt
> /generate a PostgreSQL function and trigger. The function should insert a new row into `public.profiles`, taking the `id`, `full_name`, and `avatar_url` from the new user record in `auth.users`. The trigger should execute this function automatically AFTER a new user is inserted into `auth.users`.
> ```

**Expected AI-Generated SQL:**
```sql
-- Creates a public profile for a new user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function after a new user signs up.
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```
*Execute this SQL. This trigger depends on the `auth.users` table, which is managed by Supabase.*

---

### **Prompt 2: Apply Row-Level Security (RLS) Policies**

This is the most critical security step. It ensures that authenticated users can only access their own data.

> **Your Prompt:**
>
> ```prompt
> /generate a SQL script to apply row-level security policies to the `public.profiles` and `public.briefs` tables. The policies must use the `auth.uid()` function to ensure that users can only perform actions (SELECT, INSERT, UPDATE, DELETE) on rows that match their own authenticated user ID. Use the exact policies defined in `docs/09-db-schema.md`.
> ```

**Expected AI-Generated SQL:**
```sql
-- Enable RLS on user-specific tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (an important security best practice)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.briefs FORCE ROW LEVEL SECURITY;

-- Policy: Users can view and manage their own profile.
CREATE POLICY "Users can manage their own profile."
ON public.profiles FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Users can view and manage their own generated briefs.
CREATE POLICY "Users can manage their own briefs."
ON public.briefs FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```
*Execute this SQL. These policies depend on the `auth.uid()` function from the Supabase extension.*

---

### **Prompt 3: Configure Storage for Avatars**

To allow users to upload profile pictures, we need a dedicated storage bucket with the correct security policies.

> **Your Prompt:**
>
> ```prompt
> /generate a SQL script for Supabase Storage. The script should create a public bucket named 'avatars'. Then, it must create security policies that allow anyone to read/view avatars, but only authenticated users can upload, update, or delete files within a folder path that exactly matches their own user ID.
> ```

**Expected AI-Generated SQL:**
```sql
-- Create the 'avatars' bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access for viewing avatars.
CREATE POLICY "Public read access for avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Policy: Users can upload their own avatar into a folder named with their user_id.
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can update their own avatar.
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own avatar.
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);
```
*Execute this SQL. This depends on the `storage` schema and `auth.uid()` from Supabase.*

---

### **Prompt 4: Seed the Agency's Project Portfolio**

This data populates the public `/projects` page and is not user-specific.

> **Your Prompt:**
>
> ```prompt
> /generate SQL INSERT statements for the `public.projects` table using the case study data from the `PROJECTS_DATA` constant in `data/index.ts`. Include all relevant fields.
> ```

**Expected AI-Generated SQL:**
```sql
-- Clear existing data to prevent duplicates during testing
TRUNCATE public.projects RESTART IDENTITY;

-- Insert fresh data for the agency portfolio
INSERT INTO public.projects (name, industry, description, image_url, project_url, is_featured, display_order) VALUES
('FashionOS', 'Fashion & Events', 'Built FashionOS, a comprehensive AI-powered event management platform automating 90% of coordination between designers, models, venues, and sponsors.', '/images/project-fashionos.png', '#', true, 1),
('AutoMax AI', 'Automotive', 'Developed a comprehensive AI marketplace with advanced search algorithms, real-time inventory sync, and ML-powered recommendations.', '/images/project-automax.png', '#', true, 2);
```
*Execute this SQL to populate your agency's portfolio.*

---

### **Next Steps: Seeding User-Specific Data**

To seed data for a specific test user (e.g., to test the dashboard), follow this manual process:
1.  **Sign Up:** Use your application's UI to sign up as a new test user.
2.  **Get User ID:** In the Supabase dashboard, navigate to `Authentication` -> `Users` to find the UUID of your new test user.
3.  **Manually Insert Briefs:** Use the SQL editor in the Supabase dashboard to run `INSERT` statements into the `public.briefs` table, using the copied user ID for the `user_id` column.

This manual approach is safer and more reliable than trying to script user creation in raw SQL.