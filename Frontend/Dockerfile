# Etapa de construcción
FROM node:16 AS build

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos el resto de archivos del proyecto
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiamos los archivos de construcción a la ubicación de Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"] 