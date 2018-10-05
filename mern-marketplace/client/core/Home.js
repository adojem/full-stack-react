import React from 'react';
import { Link } from 'react-router-dom';
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
   <div>
      <Card className={classes.card}>
         <Typography variant="headline" component="h2" className={classes.title}>
            Home Page
         </Typography>
         <Link to="/users">Users</Link>
         <Link to="/signup">Signup</Link>
         <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
         <CardContent>
            <Typography variant="body1" component="p">
               Welcome to the Mern Skeleton home page
            </Typography>
         </CardContent>
      </Card>
   </div>
);

export default withStyles(styles)(Home);
