import React, { useRef, useContext, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { MediaContext } from '../context/MediaProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 520,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '32px auto',
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
  const { fetchMedia } = useContext(MediaContext);

  const onSerachClick = (e: MouseEvent) => {
    e.preventDefault();
    fetchMedia({ variables: { query: inputRef.current.value } });
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        inputRef={inputRef}
        className={classes.input}
        placeholder="Search for movies and films"
        inputProps={{ 'aria-label': 'search for movies and films' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onSerachClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
