# Gunakan image Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy file dependency
COPY package*.json ./

# Install dependency
RUN npm install

# Copy semua file ke dalam image
COPY . .

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
