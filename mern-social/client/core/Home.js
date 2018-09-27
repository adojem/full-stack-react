import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import seashellImg from '../assets/images/seashell.jpg';
import FindPeople from '../user/FindPeople';
import auth from '../auth/auth-helper';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit + 5,
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

class Home extends Component {
   state = {
      defaultPage: true,
   };

   init = () => {
      if (auth.isAuthenticated()) {
         this.setState({ defaultPage: false });
      }
      else {
         this.setState({ defaultPage: true });
      }
   };

   componentWillReceiveProps = () => {
      this.init();
   };

   componentDidMount = () => {
      this.init();
   };

   render() {
      const { classes } = this.props;
      const { defaultPage } = this.state;

      return (
         <div className={classes.root}>
            {defaultPage && (
               <Grid>
                  <Card className={classes.card}>
                     <Typography type="headline" component="h2" className={classes.title}>
                        Home Page
                     </Typography>
                     <CardMedia
                        className={classes.media}
                        image={seashellImg}
                        title="Unicorn Shells"
                     />
                     <CardContent>
                        <Typography>Welcome to the MERN skeleton home page.</Typography>
                     </CardContent>
                  </Card>
               </Grid>
            )}
            {!defaultPage && (
               <Grid>
                  <Grid>
                     <FindPeople />
                  </Grid>
               </Grid>
            )}
         </div>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
// export default Home;
