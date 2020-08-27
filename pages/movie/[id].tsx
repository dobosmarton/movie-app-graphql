import React from "react";
import Box from "@material-ui/core/Box";
import Layout from "../../src/components/Layout";
import MovieDetails from "../../src/components/MovieDetails";

export default function MoviePage() {
  return (
    <Layout>
      <div>
        <Box my={4}>
          <MovieDetails />
        </Box>
      </div>
    </Layout>
  );
}
