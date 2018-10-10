import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import seashellImg from '../assets/images/seashell.jpg';
import Suggestions from '../product/Suggestions';

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
   <div className={classes.root}>
      <Grid container spacing={24}>
         <Grid item xs={8} sm={8}>
            <Card className={classes.card}>
               <Typography variant="headline" component="h2" className={classes.title}>
                  Home Page
               </Typography>
               <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
               <CardContent>
                  <Typography variant="body1" component="p">
                     Welcome to the Mern Skeleton home page
                  </Typography>
               </CardContent>
            </Card>
         </Grid>
         <Grid item xs={4} sm={4}>
            <Suggestions />
         </Grid>
      </Grid>
   </div>
);

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
