FROM nginx:latest
WORKDIR /app
COPY ./dist/track-debts-frontend .
RUN cp -R /app/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
