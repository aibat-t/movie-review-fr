# FROM node:lts-alpine
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD [ "npm", "run", "serve" ]

FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]