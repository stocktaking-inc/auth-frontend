# Use official Node.js image for building and running
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (use --omit=dev if possible)
RUN npm ci --omit=dev

# Copy only necessary files for build
COPY vite.config.ts postcss.config.js tailwind.config.js ./
COPY tsconfig*.json ./
COPY index.html ./
COPY src ./src
COPY public ./public

# Build the application
RUN npm run build

# Expose port 4173 (used by `npm run preview`)
EXPOSE 4173

# Start the preview server
CMD ["npm", "run", "preview", "--", "--host"]
