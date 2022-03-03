FROM registry.access.redhat.com/ubi8/nodejs-16

# SHELL ["/bin/bash", "-o", "pipefail", "-c"]
# RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
# RUN yum install -y nodejs

# RUN mkdir /app
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
