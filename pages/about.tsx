import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

export interface AboutPageProps {}

const Header = dynamic(() => import("@/components/common/header"), {
  ssr: false,
});

export default function AboutPage(props: AboutPageProps) {
  return (
    <div>
      <h1>About Page</h1>

      <Header />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
