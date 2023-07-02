import { useRouter } from "next/router";
import React from "react";

interface IPostDetailPageProps {}

const PostDetailPage: React.FunctionComponent<IPostDetailPageProps> = (
  props
) => {
  const router = useRouter();

  return (
    <div>
      <h1>Post Detail Page</h1>

      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
};

export default PostDetailPage;
