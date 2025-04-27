Auth Service - Microservicio de Autenticación
Este proyecto requiere configuración de variables de entorno y Docker para funcionar correctamente.

#Crea un archivo .env en la raíz del proyecto:
Base de datos
PORT=3001
DB_HOST=mariadb-auth
DB_PORT=3306
DB_USER=usuariodb
DB_PASSWORD=clavedb
DB_NAME=authdb
DB_ROOT_PASSWORD=root

---------------------------------------------------------------------------------------

#Configuración del docker-compose.yml:
El archivo docker-compose.yml ya está preconfigurado para usar las variables del .env:
version: '3.8'

services:
  auth-service:
    build: .
    ports:
      - "3001:3001"
    env_file:
      - .env
    depends_on:
      mariadb-auth:
        condition: service_healthy  # Espera hasta que el healthcheck pase
    networks:
      - backend

  mariadb-auth:
    image: mariadb:10.5
    environment:
      MARIADB_ROOT_PASSWORD: root
      MARIADB_DATABASE: authdb
      MARIADB_USER: ${DB_USER}
      MARIADB_PASSWORD: ${DB_PASSWORD}
    healthcheck:
      test: ["CMD", "mysql", "-uroot", "-proot", "-e", "SELECT 1"]
      interval: 5s
      timeout: 20s
      retries: 10
    volumes:
      - mariadb_auth_data:/var/lib/mysql
    networks:
      - backend

volumes:
  mariadb_auth_data:

networks:
  backend:

-----------------------------------------------

#Comandos para Iniciar:
Construir imágenes y levantar contenedores
docker-compose up --build

Detener contenedores
docker-compose down

Ejecutar en segundo plano
docker-compose up -d

---------------------------------------------

#Desarrollo Local:
Si prefieres ejecutarlo directamente:
Instala dependencias:
npm install
Inicia el servidor:
npm start
