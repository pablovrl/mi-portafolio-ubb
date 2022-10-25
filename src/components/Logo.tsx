import { Box } from "@mui/material";
import Image from "next/image";

export default function Logo() {
  return (
    <Box position={"relative"} sx={{ width: "100%", height: "70px" }} mb={4}>
      <Image src="/logo.svg" alt="web-logo" layout="fill" objectFit="contain" />
    </Box>
  );
}
