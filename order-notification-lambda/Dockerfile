FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serverless serverless-offline

COPY . .

EXPOSE 4000

CMD ["npm", "run", "offline"]
