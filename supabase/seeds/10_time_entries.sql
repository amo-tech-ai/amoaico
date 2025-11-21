-- ============================================================================
-- TIME ENTRIES
-- ============================================================================

INSERT INTO time_entries (id, task_id, project_id, user_id, hours, date, description, billable) VALUES
('ww88xx99-yy00-zz11-aa22-bb33cc44dd55', 'uu88vv99-ww00-xx11-yy22-zz33aa44bb55', 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 7.5, '2025-01-20', 'Built chart component library with multiple chart types', true),
('xx99yy00-zz11-aa22-bb33-cc44dd55ee66', 'uu88vv99-ww00-xx11-yy22-zz33aa44bb55', 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 6.0, '2025-01-21', 'Implemented real-time data binding for charts', true),
('yy00zz11-aa22-bb33-cc44-dd55ee66ff77', 'vv99ww00-xx11-yy22-zz33-aa44bb55cc66', 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'cc99dd00-ee11-ff22-aa33-bb44cc55dd66', 8.0, '2025-01-25', 'Set up WebSocket infrastructure for real-time updates', true),
('zz11aa22-bb33-cc44-dd55-ee66ff77gg88', 'ww00xx11-yy22-zz33-aa44-bb55cc66dd77', 'pp77qq88-rr99-ss00-tt11-uu22vv33ww44', 'cc33dd44-ee55-ff66-aa77-bb88cc99dd00', 5.5, '2025-02-05', 'Configured API gateway routing rules', true),
('aa22bb33-cc44-dd55-ee66-ff77gg88hh99', 'xx11yy22-zz33-aa44-bb55-cc66dd77ee88', 'pp77qq88-rr99-ss00-tt11-uu22vv33ww44', 'cc99dd00-ee11-ff22-aa33-bb44cc55dd66', 9.0, '2025-02-10', 'Created database migration scripts for user data', true),
('bb33cc44-dd55-ee66-ff77-gg88hh99ii00', 'yy22zz33-aa44-bb55-cc66-dd77ee88ff99', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 'aa77bb88-cc99-dd00-ee11-ff22aa33bb44', 7.0, '2025-02-15', 'Integrated AR camera SDK and basic functionality', true),
('cc44dd55-ee66-ff77-gg88-hh99ii00jj11', 'zz33aa44-bb55-cc66-dd77-ee88ff99gg00', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 'c2ggde11-be2d-6gh0-dd8f-8dd1df502c33', 4.5, '2025-02-20', 'Optimized product images for mobile performance', true),
('dd55ee66-ff77-gg88-hh99-ii00jj11kk22', 'aa44bb55-cc66-dd77-ee88-ff99gg00hh11', 'rr99ss00-tt11-uu22-vv33-ww44xx55yy66', 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 6.5, '2025-01-15', 'Developed health score calculation algorithm', true),
('ee66ff77-gg88-hh99-ii00-jj11kk22ll33', 'bb55cc66-dd77-ee88-ff99-gg00hh11ii22', 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 8.5, '2025-02-25', 'Built custom video player with playback controls', true),
('ff77gg88-hh99-ii00-jj11-kk22ll33mm44', 'dd77ee88-ff99-gg00-hh11-ii22jj33kk44', 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 5.0, '2025-01-25', 'Integrated Stripe payment processing', true),
('gg88hh99-ii00-jj11-kk22-ll33mm44nn55', 'ee88ff99-gg00-hh11-ii22-jj33kk44ll55', 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 'aa77bb88-cc99-dd00-ee11-ff22aa33bb44', 3.5, '2025-03-20', 'Implemented push notification system', true),
('hh99ii00-jj11-kk22-ll33-mm44nn55oo66', 'ff99gg00-hh11-ii22-jj33-kk44ll55mm66', 'vv33ww44-xx55-yy66-zz77-aa88bb99cc00', 'cc33dd44-ee55-ff66-aa77-bb88cc99dd00', 10.0, '2025-03-25', 'Set up video encoding pipeline with multiple formats', true),
('ii00jj11-kk22-ll33-mm44-nn55oo66pp77', 'hh11ii22-jj33-kk44-ll55-mm66nn77oo88', 'xx55yy66-zz77-aa88-bb99-cc00dd11ee22', 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 4.0, '2025-02-10', 'Created legal document template library', true),
('jj11kk22-ll33-mm44-nn55-oo66pp77qq88', 'ii22jj33-kk44-ll55-mm66-nn77oo88pp99', 'xx55yy66-zz77-aa88-bb99-cc00dd11ee22', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 6.0, '2025-04-01', 'Integrated DocuSign API for e-signatures', true),
('kk22ll33-mm44-nn55-oo66-pp77qq88rr99', NULL, 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 2.0, '2025-01-18', 'Client meeting to review dashboard progress', true),
('ll33mm44-nn55-oo66-pp77-qq88rr99ss00', NULL, 'pp77qq88-rr99-ss00-tt11-uu22vv33ww44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 3.0, '2025-02-05', 'Architecture planning session with team', true),
('mm44nn55-oo66-pp77-qq88-rr99ss00tt11', NULL, 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 1.5, '2025-02-12', 'Client demo of AR try-on feature', true),
('nn55oo66-pp77-qq88-rr99-ss00tt11uu22', NULL, 'rr99ss00-tt11-uu22-vv33-ww44xx55yy66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 2.5, '2025-01-28', 'Stakeholder review meeting', true),
('oo66pp77-qq88-rr99-ss00-tt11uu22vv33', NULL, 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 2.0, '2025-02-20', 'Sprint planning and backlog refinement', true),
('pp77qq88-rr99-ss00-tt11-uu22vv33ww44', NULL, 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 1.0, '2025-01-30', 'Quick sync call with product owner', false);
