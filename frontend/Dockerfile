FROM node:alpine as builder
WORKDIR /frontend
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html