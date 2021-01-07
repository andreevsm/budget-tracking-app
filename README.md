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

./mvnw POSTGRES_URL="jdbc:postgresql://localhost:5432/budget" POSTGRES_USERNAME="postgres" POSTGRES_PASSWORD="1q2w3e4r5t6y" package

./mvnw POSTGRES_URL=jdbc:postgresql://localhost:5432/budget;POSTGRES_USERNAME=postgres;POSTGRES_PASSWORD=1q2w3e4r5t6y package  

export POSTGRES_URL=jdbc:postgresql://localhost:5432/budget
export POSTGRES_USERNAME=postgres 
export POSTGRES_PASSWORD=1q2w3e4r5t6y 