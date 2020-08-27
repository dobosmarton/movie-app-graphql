import React from "react";
import Box from "@material-ui/core/Box";
import Layout from "../src/components/Layout";
import SearchInput from "../src/components/SearchInput";
import MovieList from "../src/components/MovieList";

export default function Index() {
  return (
    <Layout>
      <div>
        <Box my={4}>
          <SearchInput />

          <MovieList />
        </Box>
      </div>
    </Layout>
  );
}
