import React, { FC, useEffect, useContext, useMemo, useCallback } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { MoviesContext } from "../context/MoviesProvider";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 580,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
  },
  cardAction: {
    height: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  content: {
    width: "100%",
  },
  cardCover: {
    objectFit: "cover",
    objectPosition: "top",
  },
  title: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
  },
  icon: {
    marginRight: 2,
    height: 16,
    width: 16,
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});

type Props = {
  movieId: string;
};

const MovieCard: FC<Props> = ({ movieId }) => {
  const classes = useStyles();
  const { getMovie, fetchMovieDetails, fetchWikipediaPost } = useContext(
    MoviesContext
  );

  const movie = useMemo(() => getMovie(movieId), [movieId, getMovie]);

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, [movieId]);

  const getGenre = useCallback((genre) => {
    if (!genre) return "";
    const splitted = genre.split(",");
    return splitted.slice(0, 2).join(",");
  }, []);

  return (
    <Link href="/movie/[id]" as={`movie/${movieId}`}>
      <Card className={classes.root}>
        <CardActionArea className={classes.cardAction}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="360"
            className={classes.cardCover}
            image={movie.Poster}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {movie.Title}
            </Typography>
            <div className={classes.cardRow}>
              <Typography
                className={classes.rating}
                color="textSecondary"
                component="span"
                variant="body2"
              >
                <StarIcon className={classes.icon} />
                {movie.imdbRating}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {getGenre(movie.Genre)}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.Plot}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default MovieCard;
