import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import seashellImg from './../assets/images/seashell.jpg';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit + 5
   },
   title: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
      color: theme.palette.text.secondary
   },
   media: {
      minHeight: 330
   }
});

class Home extends Component {
   render() {
      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <Typography type="headline" component="h2" className={classes.title}>
               Home Page
            </Typography>
            <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
            <CardContent>
               <Typography>
                  Welcome to the MERN skeleton home page.
               </Typography>
            </CardContent>
         </Card>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
// export default Home;