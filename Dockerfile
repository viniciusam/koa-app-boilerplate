FROM node:6.9.1-alpine

# Project Files
COPY src /root/app/src
COPY package.json /root/app/package.json
COPY .babelrc /root/app/.babelrc
WORKDIR /root/app

# Build Project
RUN npm install --production \
 && npm run build

ENV NODE_ENV "production"
ENV PORT 3000
EXPOSE 3000

CMD ["node", "build/app.js"]
