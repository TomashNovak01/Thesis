insert into contract
values
(1, '1534', 'Договор № 1534', '20.10.2022'),
(2, '86741', 'Договор № 86741', '02.02.2023'),
(3, '514', 'Договор № 514', '24.01.2023'),
(4, '17544', 'Договор № 17544', '14.06.2023'),
(0, '471', 'Договор № 471', '22.11.2022');


insert into field
values
(0, 'МИНИ-ГРП', 'МИНИ-ГРП', 30, 10, 'опер.'),
(1, 'Хим. машина', 'Хим. машина', 60, 20, 'опер.'),
(2, 'Песколента', 'Песколента', 110, 20, 'опер.'),
(3, 'Вакуумная установка', 'Вакуумная установка', 70, 20, 'опер.'),
(4, 'БАЗОВАЯ СЕРВИСНАЯ СТАВКА (минимальный необходимый набор ресурсов для ГРП)', 'БАЗОВАЯ СЕРВИСНАЯ СТАВКА (минимальный необходимый набор ресурсов для ГРП)', 10, 10, 'опер.'),
(5, 'БАЗОВАЯ СТАВКА для второй (последующей) стадии МГРП', 'БАЗОВАЯ СТАВКА для второй (последующей) стадии МГРП', 20, 10, 'опер.'),
(6, 'Гелант', 'Гелант', 610, 40, 'кг/л');


insert into role
values
(0, 'Сотрудник'),
(1, 'Исследователь');


insert into template
values
(0, 'Шаблон ГРП номер 1'),
(1, 'Шаблон ГРП номер 2');


insert into public."user"
values
(0, 1, 'Голков', 'Олег', 'Григорьевич', 'Researcher№1', 'res1@res.res', 'res'),
(1, 0, 'Иванов', 'Николай', 'Игорьевич', 'Employee№1', 'emp1@emp.emp', 'emp');


insert into field_template_lkp
values
(0, 0, 0),
(1, 1, 0),
(2, 5, 0),
(3, 3, 0),
(4, 0, 1),
(5, 4, 1),
(6, 5, 1),
(7, 6, 1);


insert into research
values
(547, false, 'т. подрядчик', 'т. скв. 2365', 'т. куст 846', 'т. пласт 147', 'Т. МЕСТОРОЖДЕНИЕ');


insert into field_research
values
(0, 4, 547),
(1, 5, 547),
(2, 0, 547),
(3, 1, 547),
(4, 3, 547),
(5, 6, 547);
