FROM node:14.15.4-alpine3.10 as build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:1.19.6-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
