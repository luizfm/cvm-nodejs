FROM node:18.17.0

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]
