FROM node:10.14.2 as builder
WORKDIR /srv/xport
COPY package.json /srv/xport
RUN yarn
COPY . /srv/xport
RUN yarn build
# RUN cp /srv/adaxtech/public/static/media/* /srv/adaxtech/build/static/media

FROM nginx:alpine
RUN mkdir -p /root/certs/xport-digital.com
COPY xport.pem /root/certs/xport-digital.com/xport.pem
COPY xport.key /root/certs/xport-digital.com.com/xport.key
RUN chmod 400 /root/certs/xport-digital.com/xport.key
COPY ./default.conf.production /etc/nginx/conf.d/
RUN mv /etc/nginx/conf.d/default.conf.production /etc/nginx/conf.d/default.conf
COPY --from=builder /srv/xport/build /usr/share/nginx/html
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
