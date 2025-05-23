
SELECT u.full_name, COUNT(e.event_id) as event_count, e.status
FROM Users u
JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, e.status;