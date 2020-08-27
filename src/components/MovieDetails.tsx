import React, { FC, useEffect, useContext, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { MoviesContext } from "../context/MoviesProvider";

const useStyles = makeStyles({
  title: {
    whiteSpace: "nowrap",
  },
});

const MovieDetails: FC<{}> = () => {
  const classes = useStyles();
  const router = useRouter();

  const { getMovie, fetchMovieDetails, fetchWikipediaPost } = useContext(
    MoviesContext
  );

  const movie = useMemo(() => getMovie(router.query.id as string), [
    router.query.id,
    getMovie,
  ]);

  useEffect(() => {
    if (!movie && router.query.id) {
      fetchMovieDetails(router.query.id as string);
    } else if (movie?.Title) {
      fetchWikipediaPost(router.query.id as string, movie.Title);
    }
  }, [movie?.Title]);

  return (
    <Container>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {movie?.Title}
      </Typography>
      <Typography gutterBottom component="p">
        {movie?.wikipedia?.extract}
      </Typography>
    </Container>
  );
};

export default MovieDetails;
