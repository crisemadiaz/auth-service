Auth Service - Microservicio de Autenticación
Este proyecto requiere configuración de variables de entorno y Docker para funcionar correctamente.

#Crea un archivo .env en la raíz del proyecto:
Base de datos
DB_HOST=db
DB_PORT=3001
DB_USER=usuario
DB_PASSWORD=password
DB_NAME=auth_db

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
      - mariadb
    networks:
      - backend

  mariadb:
    image: mariadb:11
    environment:
      MARIADB_ROOT_PASSWORD: root
      MARIADB_DATABASE: auth_db
      MARIADB_USER: usuario_db
      MARIADB_PASSWORD: clave_db
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "admin", "-pclave_db"]
      interval: 5s
      timeout: 10s
      retries: 10
    volumes:
      - mariadb_data:/var/lib/mysql
    networks:
      - backend

volumes:
  mariadb_data:

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
