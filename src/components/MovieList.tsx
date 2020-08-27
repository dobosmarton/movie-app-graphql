import React, { useContext, useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { MoviesContext } from "../context/MoviesProvider";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    overflowX: "scroll",
    minHeight: 300,
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 50,
  },
}));

const MovieList = () => {
  const classes = useStyles();
  const { movies, isLoading } = useContext(MoviesContext);

  const movieList = useMemo(() => Object.keys(movies), [movies]);

  return (
    <div className={classes.root}>
      {isLoading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
      {movieList.map((movieId) => (
        <div key={movieId}>
          <MovieCard movieId={movieId} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
