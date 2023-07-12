# dockerfile for expressjs nodejs server

# pull official base image
FROM node:18-alpine3.17

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV ATLAS_URI mongodb+srv://abhinavreddydev:6la2MfRJL22gYihu@abhinavreddy.8j1tqbf.mongodb.net/?retryWrites=true&w=majority

# copy package.json and package-lock.json
COPY package*.json ./

# install app dependencies
RUN npm install

# add app
COPY . .

# expose port 5050
EXPOSE 5050

# start app
CMD ["npm", "start"]