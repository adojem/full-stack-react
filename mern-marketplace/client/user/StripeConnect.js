import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import auth from '../auth/auth-helper';
import { stripeUpdate } from './api-user';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit
         * 2}px`,
      color: theme.palette.protectedTitle,
      fontSize: '1.125rem',
   },
   subheading: {
      marginLeft: '1.5rem',
      color: theme.palette.openTitle,
   },
});

class StripeConnect extends Component {
   state = {
      error: false,
      connecting: false,
      connected: false,
   };

   componentDidMount = () => {
      const { location } = this.props;
      const parsed = queryString.parse(location.search);
      if (parsed.error) {
         return this.setState({ error: true });
      }
      if (parsed.code) {
         this.setState({ connecting: true, error: false });
         const jwt = auth.isAuthenticated();
         stripeUpdate(
            {
               userId: jwt.user._id,
            },
            {
               t: jwt.token,
            },
            parsed.code,
         ).then((data) => {
            if (data.error) {
               return this.setState({
                  error: true,
                  connecting: false,
                  connected: false,
               });
            }
            return this.setState({
               error: false,
               connecting: false,
               connected: true,
            });
         });
      }
   };

   render() {
      const { error, connecting, connected } = this.state;
      const { classes } = this.props;

      return (
         <div>
            <Paper className={classes.root} elevation={4}>
               <Typography variant="title" className={classes.title}>
                  Connect your Stripe Account
               </Typography>
               {error && (
                  <Typography variant="subheading" className={classes.subheading}>
                     Could not connect your Stripe acount. Try again later.
                  </Typography>
               )}
               {connecting && (
                  <Typography variant="subheading" className={classes.subheading}>
                     Connecting your Stripe account ...
                  </Typography>
               )}
               {connected && (
                  <Typography variant="subheading" className={classes.subheading}>
                     Your Stripe account successfully connected!
                  </Typography>
               )}
            </Paper>
         </div>
      );
   }
}

StripeConnect.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StripeConnect);
