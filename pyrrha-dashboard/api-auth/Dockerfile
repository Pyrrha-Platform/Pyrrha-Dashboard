FROM registry.access.redhat.com/ubi8/nodejs-16@sha256:c48eab04f1ddc5775f3da5ec126eac2ba2f76c187e462b901a7d7c29345aba55

WORKDIR /app

COPY package.json /app

USER root

RUN npm install --only=prod
COPY server.js /app
COPY rest /app/rest
COPY services /app/services

#TODO: convert to .env file
COPY vcap-local.json /app

#TODO: remove these if not needed
COPY graphql /app/graphql
COPY _mockData /app/_mockData
COPY schema.graphql /app

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

USER 1001

CMD ["npm", "start"]
