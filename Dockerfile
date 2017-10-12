FROM node

ADD . /var/taraxacum

WORKDIR /var/taraxacum

RUN npm install

CMD npm start

EXPOSE 5000