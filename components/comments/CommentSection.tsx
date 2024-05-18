import { IComment } from "@/types/posts";
import { NoComment } from "./NoComment";
import { CommentCard } from "./CommentCard";

export const CommentSection = ({ comments }: { comments: IComment[] }) => (
  <section>
    <p className="mt-10 text-xl font-semibold">Comment</p>
    {comments.length === 0 ? (
      <NoComment />
    ) : (
      comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))
    )}
  </section>
);
