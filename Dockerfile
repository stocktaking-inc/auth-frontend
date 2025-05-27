FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY vite.config.ts postcss.config.js tailwind.config.js ./
COPY tsconfig*.json ./
COPY index.html ./
COPY src ./src
COPY public ./public

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
