
SELECT u.user_id, u.full_name
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE r.registration_id IS NULL OR r.registration_date < DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY);