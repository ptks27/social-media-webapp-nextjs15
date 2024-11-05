import { formatDate } from "date-fns";
import { FollowerInfo, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import FollowerCount from "@/components/FollowerCount";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

export default function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };

  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <div className="text-muted-foreground">@{user.username}</div>
          </div>
          <div>
            {" "}
            เป็นสมาชิกตั้งแต่ {formatDate(user.createdAt, "d, MMM yyyy")}
          </div>
          <div className="flex items-center gap-3">
            <span>
              โพสต์:{" "}
              <span className="font-semibold">
                {formatNumber(user._count.posts)}
              </span>
            </span>
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>
        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}
      </div>
      {user.bio && (
        <>
          <hr />
          <Linkify>
            <div className="overflow-hidden whitespace-pre-line">
              {user.bio}
            </div>
          </Linkify>
        </>
      )}
    </div>
  );
} 