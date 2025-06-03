FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias globales si se quiere
RUN npm install -g create-react-app

# Instalar las dependencias al construir
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el resto del código (opcional, si no usas volumen)
COPY . .

# Variables para evitar errores con live reload en algunos entornos
ENV CHOKIDAR_USEPOLLING=true

# Exponer puerto del servidor dev
EXPOSE 3000

# Comando para iniciar en modo desarrollo
CMD ["npm", "start"]
