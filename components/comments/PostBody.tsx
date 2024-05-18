export const PostBody = ({
  body,
  userId,
}: {
  body: string;
  userId: string;
}) => (
  <section className="mt-10">
    <p className="mt-10">{body}</p>
    <p className="text-lg mt-3 text-emerald-600">Posted by User: {userId}</p>
  </section>
);
