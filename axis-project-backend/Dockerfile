FROM openjdk:11.0-slim

ADD target/insurance-app.jar insurance-app.jar

EXPOSE 9000

ENTRYPOINT [ "java", "-jar", "insurance-app.jar" ]
