-- ============================================================================
-- PAYMENTS
-- ============================================================================

INSERT INTO payments (id, invoice_id, amount, payment_method, status, transaction_id, paid_at, notes) VALUES
('hh55ii66-jj77-kk88-ll99-mm00nn11oo22', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 42000.00, 'stripe', 'completed', 'ch_3DEF456abc', '2025-02-10 11:30:00+00', 'Payment received for AI dashboard milestone'),
('ii66jj77-kk88-ll99-mm00-nn11oo22pp33', 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 33600.00, 'bank_transfer', 'completed', 'ACH-2025-002-33600', '2025-03-25 14:00:00+00', 'Bank transfer received'),
('jj77kk88-ll99-mm00-nn11-oo22pp33qq44', 'tt11uu22-vv33-ww44-xx55-yy66zz77aa88', 44800.00, 'stripe', 'completed', 'ch_3GHI789def', '2025-01-28 16:45:00+00', 'Health tracking platform payment'),
('kk88ll99-mm00-nn11-oo22-pp33qq44rr55', 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 28000.00, 'stripe', 'completed', 'ch_3JKL012ghi', '2025-04-10 10:15:00+00', 'Partial payment for course builder'),
('ll99mm00-nn11-oo22-pp33-qq44rr55ss66', 'ww44xx55-yy66-zz77-aa88-bb99cc00dd11', 112000.00, 'bank_transfer', 'completed', 'ACH-2025-003-112000', '2025-05-10 09:00:00+00', 'Large payment for streaming infrastructure'),
('mm00nn11-oo22-pp33-qq44-rr55ss66tt77', 'xx55yy66-zz77-aa88-bb99-cc00dd11ee22', 84000.00, 'stripe', 'completed', 'ch_3MNO345jkl', '2025-03-10 13:20:00+00', 'LegalTech document generation payment'),
('nn11oo22-pp33-qq44-rr55-ss66tt77uu88', 'dd11ee22-ff33-gg44-hh55-ii66jj77kk88', 67200.00, 'stripe', 'completed', 'ch_3PQR678mno', '2025-02-25 15:30:00+00', 'E-signature integration payment'),
('oo22pp33-qq44-rr55-ss66-tt77uu88vv99', 'ee22ff33-gg44-hh55-ii66-jj77kk88ll99', 22400.00, 'paypal', 'completed', 'PP-2025-001-22400', '2025-04-05 11:00:00+00', 'PayPal payment for testing phase'),
('pp33qq44-rr55-ss66-tt77-uu88vv99ww00', 'qq88rr99-ss00-tt11-uu22-vv33ww44xx55', 21000.00, 'bank_transfer', 'pending', NULL, NULL, 'Partial payment initiated'),
('qq44rr55-ss66-tt77-uu88-vv99ww00xx11', 'ss00tt11-uu22-vv33-ww44-xx55yy66zz77', 16800.00, 'stripe', 'failed', 'ch_3STU901pqr', NULL, 'Payment failed - card declined'),
('rr55ss66-tt77-uu88-vv99-ww00xx11yy22', 'cc00dd11-ee22-ff33-gg44-hh55ii66jj77', 28000.00, 'stripe', 'completed', 'ch_3VWX234stu', '2025-04-25 12:00:00+00', 'Partial payment for video encoding'),
('ss66tt77-uu88-vv99-ww00-xx11yy22zz33', 'dd11ee22-ff33-gg44-hh55-ii66jj77kk88', 33600.00, 'bank_transfer', 'completed', 'ACH-2025-004-33600', '2025-02-20 10:30:00+00', 'Second payment for e-signature integration'),
('tt77uu88-vv99-ww00-xx11-yy22zz33aa44', 'ww44xx55-yy66-zz77-aa88-bb99cc00dd11', 56000.00, 'stripe', 'completed', 'ch_3YZA567vwx', '2025-05-05 14:00:00+00', 'Partial payment for streaming platform'),
('uu88vv99-ww00-xx11-yy22-zz33aa44bb55', 'xx55yy66-zz77-aa88-bb99-cc00dd11ee22', 42000.00, 'bank_transfer', 'completed', 'ACH-2025-005-42000', '2025-03-05 09:15:00+00', 'Second payment for legal automation'),
('vv99ww00-xx11-yy22-zz33-aa44bb55cc66', 'uu22vv33-ww44-xx55-yy66-zz77aa88bb99', 25200.00, 'stripe', 'completed', 'ch_3BCD890yza', '2025-02-23 16:00:00+00', 'Course builder planning payment');
