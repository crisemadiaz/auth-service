# Usamos una imagen base de Node.js
FROM node:18

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos necesarios
COPY package*.json ./
RUN npm install

# Copiamos el resto de la app
COPY . .

# Exponemos el puerto
EXPOSE 3001

# Comando para correr la app
CMD ["node", "src/index.js"]
