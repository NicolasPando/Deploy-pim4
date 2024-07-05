FROM node:18
WORKDIR /app
COPY package*.json ./
RUN ls -la /app  # Añadir este paso para verificar los archivos
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
