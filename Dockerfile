FROM node:8.11.4-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --quiet

# Bundle app source
COPY . .


