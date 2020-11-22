import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import { MediaContext } from '../context/MediaProvider';
import MediaCard from './MediaCard';
import { Grow } from '@material-ui/core';
import MediaDetails from './MediaDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    display: 'flex',
    overflowX: 'scroll',
    minHeight: 300,
  },
  progress: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 50,
  },
}));

const MediaList = () => {
  const classes = useStyles();
  const { media, selectedMediaId, isLoading } = useContext(MediaContext);

  return (
    <div className={classes.root}>
      {isLoading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
      <div className={classes.list}>
        {Object.keys(media).map((mediaId, index) => (
          <Grow key={mediaId} in={true} timeout={(index + 1) * 500}>
            <div>
              <MediaCard mediaId={mediaId} />
            </div>
          </Grow>
        ))}
      </div>
      <MediaDetails id={selectedMediaId} />
    </div>
  );
};

export default MediaList;
