FROM maven:3.9-eclipse-temurin-17 AS buil 
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B 
COPY src ./src
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S ottoman && adduser -s ottoman -G ottoman
COPY --from=build /app/target/*.jar app.jar
USER ottoman
EXPOSE 8083
ENTRYPOINT ["java","-jar","app.jar"]