SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role
FROM employee 
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
ORDER BY employees.first_name, employees.last_name;