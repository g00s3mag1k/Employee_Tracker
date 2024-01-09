SELECT employee.first_name, employee.last_name, roles.title AS role
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON employee.department_id = department.department_id
ORDER BY employee.first_name, employee.last_name;