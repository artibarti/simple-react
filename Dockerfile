FROM node:15.0.1-alpine3.10

WORKDIR /simple-react

ENV PATH /simple-react/node_modules/.bin:$PATH

COPY . ./

RUN sed -i 's/localhost/simple-rest-api/g' package.json

RUN npm install --silent
RUN npm install react-scripts@4.0.0 -g --silent

ENTRYPOINT ["npm", "start"]