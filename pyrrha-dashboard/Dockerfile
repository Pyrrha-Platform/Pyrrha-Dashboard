FROM node:24-alpine as build

ARG REACT_APP_API_BASE_URL=http://localhost:5000
ARG REACT_APP_WEBSOCKET_URL=PYRRHA_WS_URL
ARG REACT_APP_MAPBOX_ACCESS_TOKEN=PYRRHA_MAPBOX_TOKEN

WORKDIR /app
COPY package.json .
COPY nginx.conf .

#for node-gyp    
RUN apk add --no-cache python3 make g++

RUN yarn install
# RUN npm install react-scripts -g --silent
#TODO: optimize COPY here. It copies node_modules over to the image again
COPY . .
RUN yarn run build

FROM nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
