# ใช้ Node.js v20 alpine เป็น base image
FROM node:20-alpine as builder

# ติดตั้ง dependencies ที่จำเป็นสำหรับ node-gyp
RUN apk add --no-cache python3 make g++

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm ci --only=production

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# สร้าง production build
RUN npm run build

# เริ่ม production stage
FROM node:20-alpine as runner

WORKDIR /app

# คัดลอก node_modules, built app และไฟล์ที่จำเป็น
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# เปิด port 3000
EXPOSE 3000

# ตั้งค่า environment เป็น production
ENV NODE_ENV=production

# รัน Next.js ในโหมด production
CMD ["npm", "start"]