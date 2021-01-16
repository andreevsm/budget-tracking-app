# Приложение учета личного бюджета
## Функции приложения
1. Пользователь может зарегистрироваться/залогиниться в приложении
2. Пользователь может создать счет в разной валюте
3. пользовать может создать категорию платежа
4. Пользователь может добавить платеж (расход/доход) по выбранной категории
5. Пользователь может просмотреть историю платежей

## Памятка по docker
docker ps - просмотр контейнеров
docker rm -rf <name> - удаление контейнера
docker stop <name> - остановка контейнера
docker exec -it  <name> bash
docker run -p 5432:5432 --name budget-app -e POSTGRES_PASSWORD=1q2w3e4r5t6y -d postgres
docker stop $(docker ps -a -q) - остановка всех контейнеров
docker rm $(docker ps -a -q) - удаление всех контейнеров

docker exec -it budget-app bash
psql -U postgres

CREATE TABLE IF NOT EXISTS transactions (
	id serial PRIMARY KEY,
	account_income int not null,
	account_outcome int not null,
	income decimal(12, 2) not null,
	outcome decimal(12, 2) not null,
	comment VARCHAR(255),
	created_at TIMESTAMP WITHOUT TIME zone not null
)

./mvnw POSTGRES_URL="jdbc:postgresql://localhost:5432/budget" POSTGRES_USERNAME="postgres" POSTGRES_PASSWORD="1q2w3e4r5t6y" package

export POSTGRES_URL=jdbc:postgresql://localhost:5432/budget
export POSTGRES_USERNAME=postgres 
export POSTGRES_PASSWORD=1q2w3e4r5t6y 