FROM node:18-bullseye
WORKDIR /app
COPY ./ ./
RUN npm install --omit=dev
CMD ["npm", "start"]