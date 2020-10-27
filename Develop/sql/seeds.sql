INSERT INTO department (id,name)

VALUES (1, "Sales"),
(2, "Customer Service"),
(3, "Accounting"),
(4, "Marketing"),
(5, "Management");

INSERT INTO role (id, title, salary, department_id)

VALUES(10, "Manager", 100000.00, 5),
(11, "Salesperson", 85000.0, 1),
(12, "Accountant", 70000.0, 3),
(13, "Customer Service Representative", 4000.0, 2),
(14, "Marketing Director", 60000.0, 4);



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)

VALUES(20, "Emily", "Kate", 12, 10),
(21, "Carlos", "Andres", 11, 10),
(22, "Luisa", "Nur", 13, 10),
(23, "Pablo", "Israel", 12,  10);