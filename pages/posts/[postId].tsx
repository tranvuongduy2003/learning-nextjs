import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface PostPageProps {
  post: any;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) return null;

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
    fallback: "blocking",
  };

  // blocking: nếu chưa có dữ liệu sẽ request lên server để lấy data về ngay
  // true: nếu chưa có data thì sẽ trả về version trước đó, còn nextjs sẽ âm thầm request lên server và cập nhật version mới, reload lại lần nữa sẽ thấy được data mới
  // false: nếu không có thì trả về 404 not found page
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
    revalidate: 5,
  };
};
