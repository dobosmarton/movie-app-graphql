import React, { FC, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { MediaContext } from '../context/MediaProvider';

const useStyles = makeStyles({
  root: {
    width: 265,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    position: 'relative',
    transition: 'all 0.2s',
  },
  chip: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 99,
  },
  cardAction: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardCover: {
    objectFit: 'cover',
    objectPosition: 'top',
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

type Props = {
  mediaId: string;
};

const getGenre = (genre) => {
  if (!genre) return '';
  const splitted = genre.split(',');
  return splitted.slice(0, 2).join(',');
};

const MediaCard: FC<Props> = ({ mediaId }) => {
  const classes = useStyles();
  const { getMedia, selectedMediaId, setSelectedMediaId } = useContext(MediaContext);

  const media = useMemo(() => getMedia(mediaId), [mediaId, getMedia]);

  const isSelected = selectedMediaId === mediaId;

  return (
    <Card
      className={classes.root}
      style={{ transform: isSelected ? 'scale(1)' : 'scale(0.9)' }}
      onClick={() => setSelectedMediaId(mediaId)}>
      <CardActionArea className={classes.cardAction}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100%"
          className={classes.cardCover}
          image={` https://image.tmdb.org/t/p/w500${media.posterPath}`}
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
