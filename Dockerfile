FROM node:10-alpine
WORKDIR /frontend
COPY . .

ENV NODE_ENV=production
ENV PORT=80

RUN npm install -g @angular/cli
RUN npm install
RUN npm run build

EXPOSE $PORT
CMD ["sh", "-c", "ng serve --host 0.0.0.0 --disableHostCheck --port $PORT --prod"]