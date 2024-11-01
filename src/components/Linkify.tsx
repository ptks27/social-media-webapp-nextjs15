import Link from "next/link";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";

interface LinkifyProps {
  children: React.ReactNode;
}

export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}

function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkItUrl className="text-pink-400 hover:underline">{children}</LinkItUrl>
  );
}

function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[\u0E00-\u0E7Fa-zA-Z0-9_]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip key={key} username={match.slice(1)}>
          {match}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[\u0E00-\u0E7Fa-zA-Z0-9_]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtag/${match.slice(1)}`}
          className="text-blue-200 hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}