import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models/common";
import { Box } from "@mui/material";

const Home: NextPageWithLayout = () => {
  return <Box>Home Page</Box>;
};

Home.Layout = MainLayout;

export default Home;
