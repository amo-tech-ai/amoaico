-- ============================================================================
-- COMPREHENSIVE SEED DATA FOR AMO AI AGENCY PLATFORM
-- Generated: January 3, 2025
-- Purpose: Realistic seed data for all 25 tables (10-20 rows per table)
-- ============================================================================

BEGIN;

-- Load seed data from individual table files
\i seeds/01_profiles.sql
\i seeds/02_clients.sql
\i seeds/03_briefs.sql
\i seeds/04_projects.sql
\i seeds/05_project_milestones.sql
\i seeds/06_tasks.sql
\i seeds/07_task_assignments.sql
\i seeds/08_deliverables.sql
\i seeds/09_project_assignments.sql
\i seeds/10_time_entries.sql
\i seeds/11_invoices.sql
\i seeds/12_payments.sql
\i seeds/13_expenses.sql
\i seeds/14_whatsapp_campaigns.sql
\i seeds/15_whatsapp_messages.sql
\i seeds/16_social_campaigns.sql
\i seeds/17_social_posts.sql
\i seeds/18_social_campaign_posts.sql
\i seeds/19_client_notes.sql
\i seeds/20_client_documents.sql
\i seeds/21_brief_versions.sql
\i seeds/22_brief_feedback.sql
\i seeds/23_activities.sql

COMMIT;
