FROM node:alpine as builder
WORKDIR /frontend
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html