import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Flex } from "@mantine/core";

export default function LandingLayout() {
  return (
    <Flex direction="column" gap={0} mih="100vh">
      <Header />
      <Outlet />
    </Flex>
  );
}
