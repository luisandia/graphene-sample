FROM node:12-alpine as builder
WORKDIR /frontend
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.17
EXPOSE 5000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/localhost.key /etc/nginx/localhost.key
COPY ./nginx/localhost.crt /etc/nginx/localhost.crt

COPY --from=builder /frontend/build /usr/share/nginx/html
RUN chmod 775 -R /usr/share/nginx/html