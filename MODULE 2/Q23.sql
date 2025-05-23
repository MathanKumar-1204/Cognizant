
SELECT MONTH(registration_date) as month, COUNT(registration_id) as registration_count
FROM Registrations
WHERE registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
GROUP BY MONTH(registration_date);