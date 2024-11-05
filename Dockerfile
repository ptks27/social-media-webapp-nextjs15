# ใช้ Node.js v20 alpine เป็น base image
FROM node:20-alpine as builder

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้าง production build
RUN npm run build

# เปิด port 3000
EXPOSE 3000

# รัน Next.js ในโหมด production
CMD ["npm", "run", "start"]