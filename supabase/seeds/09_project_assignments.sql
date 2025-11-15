-- ============================================================================
-- PROJECT ASSIGNMENTS
-- ============================================================================

INSERT INTO project_assignments (id, project_id, user_id, role, allocation_percentage, start_date, end_date) VALUES
('cc88dd99-ee00-ff11-gg22-hh33ii44jj55', 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 60, '2024-11-01', '2025-03-15'),
('dd99ee00-ff11-gg22-hh33-ii44jj55kk66', 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 'developer', 100, '2024-11-01', '2025-03-15'),
('ee00ff11-gg22-hh33-ii44-jj55kk66ll77', 'oo66pp77-qq88-rr99-ss00-tt11uu22vv33', 'bb88cc99-dd00-ee11-ff22-aa33bb44cc55', 'consultant', 50, '2024-11-15', '2025-02-28'),
('ff11gg22-hh33-ii44-jj55-kk66ll77mm88', 'pp77qq88-rr99-ss00-tt11-uu22vv33ww44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 50, '2025-02-01', '2025-09-15'),
('gg22hh33-ii44-jj55-kk66-ll77mm88nn99', 'pp77qq88-rr99-ss00-tt11-uu22vv33ww44', 'cc33dd44-ee55-ff66-aa77-bb88cc99dd00', 'developer', 100, '2025-02-01', '2025-09-15'),
('hh33ii44-jj55-kk66-ll77-mm88nn99oo00', 'pp77qq88-rr99-ss00-tt11-uu22vv33ww44', 'cc99dd00-ee11-ff22-aa33-bb44cc55dd66', 'developer', 80, '2025-02-01', '2025-09-15'),
('ii44jj55-kk66-ll77-mm88-nn99oo00pp11', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 50, '2024-12-15', '2025-04-30'),
('jj55kk66-ll77-mm88-nn99-oo00pp11qq22', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 'aa77bb88-cc99-dd00-ee11-ff22aa33bb44', 'developer', 100, '2024-12-15', '2025-04-30'),
('kk66ll77-mm88-nn99-oo00-pp11qq22rr33', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 'c2ggde11-be2d-6gh0-dd8f-8dd1df502c33', 'designer', 100, '2024-12-15', '2025-04-30'),
('ll77mm88-nn99-oo00-pp11-qq22rr33ss44', 'rr99ss00-tt11-uu22-vv33-ww44xx55yy66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 40, '2024-10-01', '2025-02-28'),
('mm88nn99-oo00-pp11-qq22-rr33ss44tt55', 'rr99ss00-tt11-uu22-vv33-ww44xx55yy66', 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 'developer', 100, '2024-10-01', '2025-02-28'),
('nn99oo00-pp11-qq22-rr33-ss44tt55uu66', 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 50, '2024-11-15', '2025-06-01'),
('oo00pp11-qq22-rr33-ss44-tt55uu66vv77', 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 'developer', 100, '2024-11-15', '2025-06-01'),
('pp11qq22-rr33-ss44-tt55-uu66vv77ww88', 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 'developer', 60, '2024-11-15', '2025-06-01'),
('qq22rr33-ss44-tt55-uu66-vv77ww88xx99', 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 30, '2025-01-15', '2025-08-01'),
('rr33ss44-tt55-uu66-vv77-ww88xx99yy00', 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 'b1ffcd00-ad1c-5fg9-cc7e-7cc0ce491b22', 'developer', 100, '2025-01-15', '2025-08-01'),
('ss44tt55-uu66-vv77-ww88-xx99yy00zz11', 'vv33ww44-xx55-yy66-zz77-aa88bb99cc00', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 40, '2024-09-01', '2025-06-15'),
('tt55uu66-vv77-ww88-xx99-yy00zz11aa22', 'vv33ww44-xx55-yy66-zz77-aa88bb99cc00', 'cc33dd44-ee55-ff66-aa77-bb88cc99dd00', 'developer', 100, '2024-09-01', '2025-06-15'),
('uu66vv77-ww88-xx99-yy00-zz11aa22bb33', 'xx55yy66-zz77-aa88-bb99-cc00dd11ee22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'project_manager', 50, '2024-12-01', '2025-08-15'),
('vv77ww88-xx99-yy00-zz11-aa22bb33cc44', 'xx55yy66-zz77-aa88-bb99-cc00dd11ee22', 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 'developer', 100, '2024-12-01', '2025-08-15');
