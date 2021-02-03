FROM openjdk:11.0-slim

ADD target/insurance-app.jar app.jar

EXPOSE 9000

ENTRYPOINT [ "java", "-jar", "app.jar" ]