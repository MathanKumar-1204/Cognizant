
SELECT u.user_id, u.full_name, COUNT(DISTINCT r.event_id) as event_count, COUNT(f.feedback_id) as feedback_count
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id;