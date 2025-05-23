
SELECT e.city, AVG(f.rating) as average_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.city;