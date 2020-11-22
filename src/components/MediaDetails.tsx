import React, { FC, useEffect, useContext, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MaterialLink from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';
import LinkIcon from '@material-ui/icons/Link';
import { MediaContext } from '../context/MediaProvider';
import { Avatar, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: 'nowrap',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },

  icon: {
    marginLeft: 2,
    height: 16,
    width: 16,
  },

  chip: {
    marginRight: theme.spacing(2),
    marginBottom: 12,
  },
}));

type Props = {
  id: string;
};

const MediaDetails: FC<Props> = ({ id }) => {
  const classes = useStyles();
  const router = useRouter();

  const { getMedia, fetchWikipediaPost } = useContext(MediaContext);

  const media = useMemo(() => getMedia(id), [router.query.id, getMedia]);

  const transformTitle = (title: string) => {
    return title.split(' ').join('_');
  };

  useEffect(() => {
    if (media?.title) {
      fetchWikipediaPost(id, transformTitle(media.title));
    }
  }, [media?.title]);

  if (!media) return null;

  return (
    <Container>
      <div className={classes.row}>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {media.title}
          <MaterialLink
            style={{ marginLeft: 12 }}
            target="_blank"
            href={`https://en.wikipedia.org/wiki/${transformTitle(media.title)}`}>
            <LinkIcon height={24} />
          </MaterialLink>
        </Typography>

        <Avatar className={classes.rating}>
          <Typography color="initial" component="span" variant="body1">
            {media.voteAverage}
          </Typography>
          <StarIcon className={classes.icon} />
        </Avatar>
      </div>

      {(media.genres || []).map((genre) => (
        <Chip key={genre.id} label={genre.name} className={classes.chip} />
      ))}

      <Typography component="p">{media.wikipedia?.extract}</Typography>
    </Container>
  );
};

export default MediaDetails;
