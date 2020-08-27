import React, { useRef, useCallback, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { MoviesContext } from "../context/MoviesProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 520,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    margin: "32px auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchInput = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { fetchMovies } = useContext(MoviesContext);

  const onSerachClick = useCallback(
    (e) => {
      e.preventDefault();
      fetchMovies(inputRef.current.value);
    },
    [fetchMovies]
  );

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        inputRef={inputRef}
        className={classes.input}
        placeholder="Search for a movie"
        inputProps={{ "aria-label": "search for a movie" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={onSerachClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
