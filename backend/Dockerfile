FROM maven:3.6.3-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
ENV POSTGRES_URL=jdbc:postgresql://db:5432/budget
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_PASSWORD=1q2w3e4r5t6y
RUN mvn -f /home/app/pom.xml clean package -DskipTests

FROM openjdk:15
ENV POSTGRES_URL=jdbc:postgresql://db:5432/budget
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_PASSWORD=1q2w3e4r5t6y
COPY --from=build /home/app/target/budget-backend.jar /usr/local/lib/budget-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/budget-backend.jar"]