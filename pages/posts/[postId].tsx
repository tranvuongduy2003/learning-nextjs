import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

interface PostPageProps {
  post: any;
}

export default function PostPage({ post }: PostPageProps) {
  console.log(post);

  return (
    <div>
      <h1>Post Detail Page</h1>

      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("GET STATIC PATHS");

  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  console.log(context.params?.postId);
  const postId = context.params?.postId;

  if (!postId) return { notFound: true };

  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
};
