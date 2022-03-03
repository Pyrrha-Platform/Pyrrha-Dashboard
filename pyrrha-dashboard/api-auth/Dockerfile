FROM registry.access.redhat.com/ubi8/nodejs-16

WORKDIR /app

COPY package.json /app
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

ENV NODE_ENV production
ENV PORT 4000

EXPOSE 4000

CMD ["npm", "start"]