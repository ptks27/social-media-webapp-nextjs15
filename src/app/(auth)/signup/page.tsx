import { Metadata } from "next";
import signupImage from "@/assets/signup-image.jpg"
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";


export const metadata: Metadata = {
    title: "Sign Up"
}


export default function Page() {
    return (
        <main className="flex h-screen items-center justify-center p-5">
            <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
                <div className="md:w-1/2 w-full space-x-10 overflow-y-auto p-10">
                    <div className="space-y-1 text-center">
                        <h1 className="text-3xl font-bold">
                            เข้าสู่ระบบ บีบ้า ﾟᰔ
                        </h1>
                        <p className="text-muted-foreground">
                            เว็บที่ <span className="italic font-bold">คุณ</span> สามารถหาเพื่อนได้
                        </p>
                        <br />
                    </div>
                    <div className="space-y-5">
                        <SignUpForm/>
                        <Link href="/login" className="block text-center hover:underline"> 
                        มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
                        </Link>
                    </div>
                </div>
                <Image
                src={signupImage}
                alt=""
                className="w-1/2 hidden md:block object-cover"
                />
            </div>
        </main>
    );
}
