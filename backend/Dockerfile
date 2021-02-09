# FROM maven:3.6.3-openjdk-15-slim AS build
# RUN mkdir -p /workspace
# WORKDIR /workspace
# COPY pom.xml /workspace
# COPY src /workspace/src

# ENV POSTGRES_URL=jdbc:postgresql://db:5432/budget
# ENV POSTGRES_USERNAME=postgres
# ENV POSTGRES_PASSWORD=1q2w3e4r5t6y

# RUN mvn -f pom.xml clean package

# FROM openjdk:15
# COPY --from=build /workspace/target/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]

#FROM openjdk:15
#COPY target/budget-backend.jar budget-backend.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "/budget-backend.jar"]

FROM maven:3.6.3-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
ENV POSTGRES_URL=jdbc:postgresql://db:5432/budget
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_PASSWORD=1q2w3e4r5t6y
RUN mvn -f /home/app/pom.xml clean package -DskipTests

#
# Package stage
#
FROM openjdk:15
COPY --from=build /home/app/target/budget-backend.jar /usr/local/lib/budget-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/budget-backend.jar"]