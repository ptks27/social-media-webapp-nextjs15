import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Bell, Bookmark, Home, Mail, MessageCircle, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./์NotificationsButton";
import MessagesButton from "./MessagesButton";
import streamServerClient from "@/lib/stream";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count
  ]);



  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="หน้าหลัก"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">หน้าหลัก</span>
        </Link>
      </Button>

      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />

      <MessagesButton
      initialState={{ unreadCount : unreadMessagesCount}}
      />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="บันทึก"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">บันทึกไว้</span>
        </Link>
      </Button>
    </div>
  );
}
