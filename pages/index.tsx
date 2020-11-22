import React from "react";
import Box from "@material-ui/core/Box";
import Layout from "../src/components/Layout";
import SearchInput from "../src/components/SearchInput";
import MediaList from "../src/components/MediaList";

export default function Index() {
  return (
    <Layout>
      <div>
        <Box my={4}>
          <SearchInput />

          <MediaList />
        </Box>
      </div>
    </Layout>
  );
}
