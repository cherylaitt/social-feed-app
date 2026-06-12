import { FeedActionButton } from "./feed-action-button";

export default function FeedActionButtonGroup({
  likeNum,
  commentNum,
  shareNum,
}: {
  likeNum: number;
  commentNum: number;
  shareNum: number;
}) {
  return (
    <>
      <FeedActionButton
        icon={{ ios: "heart", android: "favorite", web: "favorite" }}
        label="Like"
        count={likeNum}
      />
      <FeedActionButton
        icon={{
          ios: "bubble.left",
          android: "chat_bubble",
          web: "chat_bubble",
        }}
        label="Comment"
        count={commentNum}
      />
      <FeedActionButton
        icon={{
          ios: "arrowshape.turn.up.right",
          android: "share",
          web: "share",
        }}
        label="Share"
        count={shareNum}
      />
    </>
  );
}
