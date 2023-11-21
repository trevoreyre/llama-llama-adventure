FROM node:18
USER node
ENV HOME /home/node
ENV PREFIX /home/node/.npm-global

RUN mkdir /home/node/.npm-global
RUN mkdir /home/node/llama-llama-adventure
RUN npm install -g pnpm

WORKDIR /home/node/llama-llama-adventure
