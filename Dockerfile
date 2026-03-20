FROM node:18-alpine

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY app/package*.json ./
RUN npm install

COPY app .

USER appuser

EXPOSE 3000

CMD ["npm", "start"]

