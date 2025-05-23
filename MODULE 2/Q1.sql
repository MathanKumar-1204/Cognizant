1. User Upcoming Events
Copy
SELECT e.title, e.start_date, e.end_date
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
JOIN Users u ON r.user_id = u.user_id
WHERE e.status = 'upcoming' AND u.city = 'New York' AND e.city = u.city
ORDER BY e.start_date;
2. Top Rated Events
Copy
SELECT e.title, AVG(f.rating) as average_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id
HAVING COUNT(f.feedback_id) >= 10
ORDER BY average_rating DESC;
3. Inactive Users
Copy
SELECT u.user_id, u.full_name
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE r.registration_id IS NULL OR r.registration_date < DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY);
4. Peak Session Hours
Copy
SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
WHERE HOUR(s.start_time) BETWEEN 10 AND 12
GROUP BY e.event_id;
5. Most Active Cities
Copy
SELECT u.city, COUNT(DISTINCT r.user_id) as user_count
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY user_count DESC
LIMIT 5;
6. Event Resource Summary
Copy
SELECT e.title, r.resource_type, COUNT(r.resource_id) as resource_count
FROM Events e
JOIN Resources r ON e.event_id = r.event_id
GROUP BY e.event_id, r.resource_type;
7. Low Feedback Alerts
Copy
SELECT u.full_name, f.comments, e.title
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3;
8. Sessions per Upcoming Event
Copy
SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id;
9. Organizer Event Summary
Copy
SELECT u.full_name, COUNT(e.event_id) as event_count, e.status
FROM Users u
JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, e.status;
10. Feedback Gap
Copy
SELECT e.title
FROM Events e
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE f.feedback_id IS NULL AND e.event_id IN (SELECT event_id FROM Registrations);
11. Daily New User Count
Copy
SELECT registration_date, COUNT(user_id) as user_count
FROM Users
WHERE registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
GROUP BY registration_date;
12. Event with Maximum Sessions
Copy
SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id
ORDER BY session_count DESC
LIMIT 1;
13. Average Rating per City
Copy
SELECT e.city, AVG(f.rating) as average_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.city;
14. Most Registered Events
Copy
SELECT e.title, COUNT(r.registration_id) as registration_count
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id
ORDER BY registration_count DESC
LIMIT 3;
15. Event Session Time Conflict
Copy
SELECT s1.title as session1, s2.title as session2
FROM Sessions s1
JOIN Sessions s2 ON s1.event_id = s2.event_id
WHERE s1.session_id < s2.session_id
AND s1.start_time < s2.end_time AND s1.end_time > s2.start_time;
16. Unregistered Active Users
Copy
SELECT u.user_id, u.full_name
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE r.registration_id IS NULL AND u.registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY);
17. Multi-Session Speakers
Copy
SELECT speaker_name, COUNT(session_id) as session_count
FROM Sessions
GROUP BY speaker_name
HAVING session_count > 1;
18. Resource Availability Check
Copy
SELECT e.title
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;
19. Completed Events with Feedback Summary
Copy
SELECT e.title, COUNT(r.registration_id) as registration_count, AVG(f.rating) as average_rating
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
JOIN Feedback f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id;
20. User Engagement Index
Copy
SELECT u.user_id, u.full_name, COUNT(DISTINCT r.event_id) as event_count, COUNT(f.feedback_id) as feedback_count
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id;
21. Top Feedback Providers
Copy
SELECT u.full_name, COUNT(f.feedback_id) as feedback_count
FROM Users u
JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id
ORDER BY feedback_count DESC
LIMIT 5;
22. Duplicate Registrations Check
Copy
SELECT user_id, event_id, COUNT(registration_id) as registration_count
FROM Registrations
GROUP BY user_id, event_id
HAVING registration_count > 1;
23. Registration Trends
Copy
SELECT MONTH(registration_date) as month, COUNT(registration_id) as registration_count
FROM Registrations
WHERE registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
GROUP BY MONTH(registration_date);
24. Average Session Duration per Event
Copy
SELECT e.title, AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) as average_duration
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id;
25. Events Without Sessions
Copy
SELECT e.title
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL;
You can save these queries in a .sql file and run them in your MySQL environment.