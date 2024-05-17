import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getCommentByPostId, getPostsById } from "@/services/posts";
import { IComment, IPosts } from "@/types/posts";
import { Mail, UserCircle } from "lucide-react";

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const postDataById: IPosts = await getPostsById(params.id);
  const commentData = await getCommentByPostId(params.id);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading title={postDataById?.title} />
        </div>

        <section className="mt-10">
          <p className="mt-10">{postDataById?.body}</p>

          <p className="text-lg mt-3 text-emerald-600">
            Posted by User: {postDataById?.user_id}
          </p>

          <p className="mt-10 text-xl font-semibold"> Comment </p>

          {commentData?.length === 0 ? (
            <>
              <Card className="mt-5">
                <CardContent className="p-5">
                  <p className="text-lg">No comment yet</p>
                </CardContent>
              </Card>
            </>
          ) : (
            commentData?.map((comment: IComment) => {
              return (
                <>
                  <Card className="mt-5" key={comment?.id}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex">
                        <UserCircle className="mr-2" /> {comment?.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{comment?.body}</p>
                    </CardContent>
                    <CardFooter className="font-light">
                      <Mail className="mr-2" /> {comment?.email}
                    </CardFooter>
                  </Card>
                </>
              );
            })
          )}
        </section>
      </div>
    </>
  );
};

export default PostDetail;
