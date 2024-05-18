import { CommentSection } from "@/components/comments/CommentSection";
import { PostBody } from "@/components/comments/PostBody";

import { Heading } from "@/components/ui/heading";
import { getCommentByPostId, getPostsById } from "@/services/posts";
import { IPosts } from "@/types/posts";

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const postDataById: IPosts = await getPostsById(params.id);
  const commentData = await getCommentByPostId(params.id);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading title={postDataById?.title} />
        </div>

        <PostBody body={postDataById.body} userId={postDataById.user_id} />
        <CommentSection comments={commentData} />
      </div>
    </>
  );
};

export default PostDetail;
