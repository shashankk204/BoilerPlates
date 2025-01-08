FROM node
WORKDIR /user/src/app

COPY package* .

RUN npm i

COPY . .

EXPOSE 3000

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

CMD ["npm","run","dev"]
