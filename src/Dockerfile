# Basis-Image für Node.js (zum Bauen)
FROM node:18 AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die Package-Dateien und installiere Abhängigkeiten
COPY package.json package-lock.json ./
RUN npm install

# Kopiere den restlichen Code und baue das Projekt
COPY . .
RUN npm run build

# Neues Image für die Laufzeit (Nginx als Webserver)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponiere den Port
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
