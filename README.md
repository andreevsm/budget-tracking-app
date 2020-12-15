# Приложение учета личного бюджета
## Функции приложения
1. Пользователь может создавать/редактировать/удалять счет, а также иметь счет в разной валюте
2. Пользователь может переводить средства между счетами согласно конвертации
3. Основные функции со счетом:
- Оплатить или перевести
- Пополнить счет
- Информация о счете
- Настройки (закрыть счет, Переименовать и тд)
- История операций
4. Добавлять расходам категорию
5. Анализ финансов в контексте счета и всех счетов: расходы и зачисления. Диаграммы/графики
6. Фильтр в графиках по категориям
7. Блок с курсом валют
8. Пользователь может открыть вклад

## Счет
```
Уникальный идентификатор
Дата создания счета
Наименование
Описание
Валюта
Номер счета
Тип счета (обычный, премиум и тд)
```

## Пользователь
```
Уникальный идентификатор
Фамилия
Имя
Отчество
Почта
Пароль
```

Памятка по docker

docker ps - просмотр контейнеров
docker rm -rf <name> - удаление контейнера
docker stop <name> - остановка контейнера
docker run -p 5555:80 —name pgadmin -e PGADMIN_DEFAULT_EMAIL=«aandreev.sm@gmail.com» -e PGADMIN_DEFAULT_PASSWORD=«password» dpage/pgadmin4
psql -h localhost -p 5432 -U postgres
docker exec -it  <name> bash
docker run -p 5432:5432 --name budget-app -e POSTGRES_PASSWORD=1q2w3e4r5t6y -d postgres
docker stop $(docker ps -a -q) - остановка всех контейнеров
docker rm $(docker ps -a -q) - удаление всех контейнеров

docker exec -it budget-app bash
psql -U postgres

CREATE TABLE IF NOT EXISTS accounts (
	id serial PRIMARY KEY,
	userid int NOT NULL,
	FOREIGN KEY (userId) REFERENCES users (id),
	name VARCHAR(55) NOT NULL,
	description VARCHAR(255)
)

docker run --name budget-db -p 5432:5432 -v /Users/sergeyandreev/my-projects/budget-tracking-app/data/budget:/var/lib/postgresql/data postgres


CREATE TABLE IF NOT EXISTS operations (
	id serial PRIMARY KEY NOT NULL,
	account_id int NOT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	amount int NOT NULL,
)

1q2w3e4r5t6y
