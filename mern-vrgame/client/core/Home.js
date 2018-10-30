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
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
   },
   title: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit
         * 2}px`,

      color: theme.palette.text.secondary,
   },
   media: {
      minHeight: 330,
   },
});

const Home = ({ classes }) => (
   <Card className={classes.card}>
      <Typography variant="h6" component="h2" className={classes.title}>
         Home Page
      </Typography>
      <CardMedia className={classes.media} image={seashellImg} />
      <CardContent>
         <Typography component="p">Welcome to the MERN VR Game</Typography>
      </CardContent>
   </Card>
);

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
