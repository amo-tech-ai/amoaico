-- ============================================================================
-- PROFILES (Agency Team + Client Users)
-- ============================================================================

INSERT INTO profiles (id, first_name, last_name, role, capacity_hours_per_week, skills, avatar_url) VALUES
('aa11bb22-cc33-dd44-ee55-ff66aa77bb88', 'David', 'Kim', 'agency', 40, ARRAY['fullstack', 'python', 'ai-ml', 'api-design'], 'https://i.pravatar.cc/150?u=david-kim'),
('bb22cc33-dd44-ee55-ff66-aa77bb88cc99', 'Lisa', 'Anderson', 'agency', 35, ARRAY['product-management', 'strategy', 'analytics'], 'https://i.pravatar.cc/150?u=lisa-anderson'),
('cc33dd44-ee55-ff66-aa77-bb88cc99dd00', 'Alex', 'Martinez', 'agency', 40, ARRAY['devops', 'aws', 'docker', 'kubernetes'], 'https://i.pravatar.cc/150?u=alex-martinez'),
('dd44ee55-ff66-aa77-bb88-cc99dd00ee11', 'Rachel', 'Brown', 'agency', 30, ARRAY['content-strategy', 'copywriting', 'seo'], 'https://i.pravatar.cc/150?u=rachel-brown'),
('ee55ff66-aa77-bb88-cc99-dd00ee11ff22', 'Michael', 'Taylor', 'agency', 38, ARRAY['qa', 'testing', 'automation', 'cypress'], 'https://i.pravatar.cc/150?u=michael-taylor'),
('ff66aa77-bb88-cc99-dd00-ee11ff22aa33', 'Sophie', 'White', 'agency', 32, ARRAY['brand-design', 'illustration', 'animation'], 'https://i.pravatar.cc/150?u=sophie-white'),
('aa77bb88-cc99-dd00-ee11-ff22aa33bb44', 'Ryan', 'Johnson', 'agency', 36, ARRAY['mobile', 'react-native', 'swift', 'kotlin'], 'https://i.pravatar.cc/150?u=ryan-johnson'),
('bb88cc99-dd00-ee11-ff22-aa33bb44cc55', 'Priya', 'Patel', 'agency', 34, ARRAY['data-science', 'analytics', 'sql', 'tableau'], 'https://i.pravatar.cc/150?u=priya-patel'),
('cc99dd00-ee11-ff22-aa33-bb44cc55dd66', 'Chris', 'Lee', 'agency', 40, ARRAY['backend', 'nodejs', 'postgresql', 'graphql'], 'https://i.pravatar.cc/150?u=chris-lee'),
('dd00ee11-ff22-aa33-bb44-cc55dd66ee77', 'Amanda', 'Davis', 'agency', 28, ARRAY['social-media', 'community-management', 'influencer-marketing'], 'https://i.pravatar.cc/150?u=amanda-davis');

INSERT INTO profiles (id, first_name, last_name, role, avatar_url) VALUES
('ee11ff22-aa33-bb44-cc55-dd66ee77ff88', 'Robert', 'Miller', 'client', 'https://i.pravatar.cc/150?u=robert-miller'),
('ff22aa33-bb44-cc55-dd66-ee77ff88aa99', 'Jennifer', 'Lopez', 'client', 'https://i.pravatar.cc/150?u=jennifer-lopez'),
('aa33bb44-cc55-dd66-ee77-ff88aa99bb00', 'Thomas', 'Anderson', 'client', 'https://i.pravatar.cc/150?u=thomas-anderson'),
('bb44cc55-dd66-ee77-ff88-aa99bb00cc11', 'Emily', 'Watson', 'client', 'https://i.pravatar.cc/150?u=emily-watson'),
('cc55dd66-ee77-ff88-aa99-bb00cc11dd22', 'Daniel', 'Moore', 'client', 'https://i.pravatar.cc/150?u=daniel-moore'),
('dd66ee77-ff88-aa99-bb00-cc11dd22ee33', 'Olivia', 'Harris', 'client', 'https://i.pravatar.cc/150?u=olivia-harris'),
('ee77ff88-aa99-bb00-cc11-dd22ee33ff44', 'William', 'Clark', 'client', 'https://i.pravatar.cc/150?u=william-clark'),
('ff88aa99-bb00-cc11-dd22-ee33ff44aa55', 'Isabella', 'Lewis', 'client', 'https://i.pravatar.cc/150?u=isabella-lewis'),
('aa99bb00-cc11-dd22-ee33-ff44aa55bb66', 'Matthew', 'Walker', 'client', 'https://i.pravatar.cc/150?u=matthew-walker'),
('bb00cc11-dd22-ee33-ff44-aa55bb66cc77', 'Charlotte', 'Hall', 'client', 'https://i.pravatar.cc/150?u=charlotte-hall');
