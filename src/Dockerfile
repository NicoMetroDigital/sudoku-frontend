# Basis-Image mit Node.js
FROM node:18-alpine

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere alle Dateien ins Image
COPY . .

# Installiere Abhängigkeiten
RUN npm install

# Baue die App
RUN npm run build

# Nutze Nginx als Webserver
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Port freigeben
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
