import { z } from "zod";

const requiredString = z.string().trim().min(1, "กรุณากรอกข้อมูล");

// ใช้เช็ค email ให้เป็นตัวที่กำหนด
export const signUpSchema = z.object({
  email: requiredString.email("ที่อยู่อีเมลที่ไม่ถูกต้อง"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "อนุญาตเฉพาะตัวอักษร ตัวเลข - และ _ เท่านั้น",
  ),
  password: requiredString.min(8, "ต้องมีอย่างน้อย 8 ตัวอักษร"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z
    .array(z.string())
    .max(5, "ไม่สามารถมีสิ่งที่แนบมามากกว่า 5 รายการ"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "ต้องมีอักขระไม่เกิน 1,000 ตัว"),
});

export type UpdateUserProfileValue = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
