FROM node

WORKDIR /home

ADD . .

RUN ["rm", ".env"]

RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]