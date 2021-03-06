import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteUser from './DeleteUser';
import auth from '../auth/auth-helper';
import { read } from './api-user';
import config from '../../config/config';
import stripeButton from '../assets/images/stripeButton.png';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle,
   },
   stripe_connect: {
      marginRight: '10px',
   },
   stripe_connected: {
      marginRight: '10px',
   },
   stripeIcon: {
      verticalAlign: 'middle',
   },
});

class Profile extends Component {
   constructor({ match }) {
      super();

      this.state = {
         user: '',
         redirectToSignin: false,
      };
      this.match = match;
   }

   init = (userId) => {
      const jwt = auth.isAuthenticated();
      read({ userId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            return this.setState({ redirectToSignin: true });
         }
         return this.setState({ user: data });
      });
   };

   componentDidMount = () => {
      const { match } = this.props;
      this.init(match.params.userId);
   };

   componentWillReceiveProps = ({ match }) => {
      this.init(match.params.userId);
   };

   render() {
      const { classes } = this.props;
      const { user, redirectToSignin } = this.state;
      if (redirectToSignin) {
         return <Redirect to="/signin" />;
      }

      return (
         <Paper className={classes.root} elevation={4}>
            <Typography variant="title" className={classes.title}>
               Profile
            </Typography>
            <List>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <Person />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                  {auth.isAuthenticated().user
                     && auth.isAuthenticated().user._id === user._id && (
                     <ListItemSecondaryAction>
                        {user.seller && user.stripe_seller ? (
                           <Button
                              className={classes.stripe_connected}
                              variant="raised"
                              disabled
                           >
                                 Stripe connected
                           </Button>
                        ) : (
                           <a
                              href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
                                 config.stripe_connect_test_client_id
                              }&scope=read_write`}
                              className={classes.stripe_connect}
                           >
                              <img
                                 className={classes.stripeIcon}
                                 src={stripeButton}
                                 alt="Connect with Stripe"
                              />
                           </a>
                        )}
                        <Link to={`/user/edit/${user._id}`}>
                           <IconButton>
                              <Edit />
                           </IconButton>
                        </Link>
                        <DeleteUser userId={user._id} />
                     </ListItemSecondaryAction>
                  )}
               </ListItem>
               <Divider />
               <ListItem>
                  <ListItemText primary={`Joined: ${new Date(user.created).toDateString()}`} />
               </ListItem>
            </List>
         </Paper>
      );
   }
}

Profile.propTypes = {
   classes: PropTypes.object.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         userId: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
};

export default withStyles(styles)(Profile);
