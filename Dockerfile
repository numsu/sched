FROM mhart/alpine-node:10

ARG buildTimePackages="python make g++"

RUN apk add --no-cache ${buildTimePackages}

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN apk del ${buildTimePackages}

EXPOSE 8080
ENTRYPOINT [ "npm", "run", "server:prod" ]
