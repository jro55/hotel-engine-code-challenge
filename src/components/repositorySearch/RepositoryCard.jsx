import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function RepositoryCard(props) {
  const classes = useStyles();

  const {
        title,
        description,
        stars,
        language,
        imageUrl,
        owner,
        onClick,
    } = props;

  return (
    <Card className={classes.root}>
        <div className={classes.header}>
            <div className={classes.header__item}>
                <StarIcon style={{ color: 'gold' }} />
                <span className={classes.header__item__text}>{stars}</span>
            </div>
            <div className={classes.header__item}>
                <GitHubIcon style={{ fontSize: '1.3em' }} />
                <span className={classes.header__item__text}>{owner}</span>
            </div>
        </div>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={onClick}
      >
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles({
    root: {
      minWidth: 345,
      flex: 1,
      margin: 15,
    },
    media: {
      height: 140,
      backgroundSize: 'contain',
      marginTop: 15,
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardActionArea: {
        height: 220
    },
    header: {
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between'
    },
    header__item: {
        // flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    header__item__text: {
        marginBottom: -1,
        paddingLeft: 5
    },
    language: {
        flex: 1,
        textAlign: 'right'
    },
  });
