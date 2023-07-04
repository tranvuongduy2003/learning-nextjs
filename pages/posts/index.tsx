import { GetStaticProps, GetStaticPropsContext } from "next";

interface IPost {
  id: string;
  title: string;
}

export interface IPostListPageProps {
  posts: IPost[];
}

export default function PostListPage({ posts }: IPostListPageProps) {
  console.log(posts);

  return (
    <div>
      Post List Page
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  console.log("static props");
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    props: {
      posts: data.data.map((item: any) => ({ id: item.id, title: item.title })),
    },
  };
};
