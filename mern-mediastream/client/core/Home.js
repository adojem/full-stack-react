import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import seashellImg from '../assets/images/seashell.jpg';

const styles = theme => ({
   card: {
      margin: `${theme.spacing.unit * 5}px 30px`,
   },
   title: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 0px`,
      color: theme.palette.text.secondary,
      fontSize: '1rem',
   },
   media: {
      minHeight: 330,
   },
});

const Home = ({ classes }) => (
   <Card className={classes.card}>
      <Typography variant="h5" component="h2" className={classes.title}>
         Popular videos
      </Typography>
      <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
      <CardContent>
         <Typography component="p">Welcome to the Mern Mediastream home page</Typography>
      </CardContent>
   </Card>
);

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
