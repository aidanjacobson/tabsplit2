FROM node:16-slim

COPY * /
EXPOSE 42070
RUN npm install
CMD ["node", "index.js"]