import { Header } from "@/components/common";
import { AdminLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models/common";
import { Box, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface AboutPageProps {}

// const Header = dynamic(() => import("@/components/common"), {
//   ssr: false,
// });

const AboutPage: NextPageWithLayout = (props: AboutPageProps) => {
  const router = useRouter();
  const [postList, setPostList] = useState([]);

  const page = router.query?.page;

  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );
      const data = await response.json();

      console.log(data);

      setPostList(data.data);
    })();
  }, [page]);

  function handleNextClick() {
    // shallow chỉ cập nhật query chứ không load lại toàn bộ router query

    router.push(
      {
        pathname: "/about",
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About Page
      </Typography>

      <Header />
      <ul>
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleNextClick}>Next page</button>
    </Box>
  );
};

AboutPage.Layout = AdminLayout;

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
