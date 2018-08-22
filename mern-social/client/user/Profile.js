import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   Avatar,
   Divider,
   Icon,
   IconButton,
   List,
   ListItem,
   ListItemText,
   ListItemSecondaryAction,
   Paper,
   Typography
} from '@material-ui/core';
import PersonRounded from '@material-ui/icons/PersonRounded';
import { withStyles } from '@material-ui/core/styles';
import auth from '../auth/auth-helper';
import { read } from './api-user';
import DeleteUser from './DeleteUser';

const styles = (theme) => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.error.light
   }
});

class Profile extends Component {
   constructor({ match }) {
      super();
      this.state = { user: '', redirectToSignin: false };
      this.match = match;
   }

   init = (userId) => {
      const jwt = auth.isAuthenticated();
      read(
         {
            userId: userId
         },
         { t: jwt.token }
      ).then((data) => {
         if (data.error) {
            this.setState({ redirectToSignin: true });
         } else {
            this.setState({ user: data });
         }
      });
   };

   componentDidMount = () => {
      this.init(this.match.params.userId);
   };

   componentWillReceiveProps = () => {
      this.init(this.props.match.params.userId);
   };

   render() {
      const { classes } = this.props;
      const redirectToSignin = this.state.redirectToSignin;
      if (redirectToSignin) {
         return <Redirect to="/signin" />;
      }
      return (
         <div>
            <Paper className={classes.root} elevation={4}>
               <Typography variant="title" className={classes.title}>
                  Profile
               </Typography>
               <List dense>
                  <ListItem>
                     <Avatar>
                        <PersonRounded />
                     </Avatar>
                     <ListItemText
                        primary={this.state.user.name}
                        secondary={this.state.user.email}
                     />
                     {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id ==
                           this.state.user._id && (
                           <ListItemSecondaryAction>
                              <Link to={'/user/edit/' + this.state.user._id}>
                                 <IconButton color="primary">
                                    <Icon>edit_icon</Icon>
                                 </IconButton>
                              </Link>
                              <DeleteUser userId={this.state.user._id} />
                           </ListItemSecondaryAction>
                        )}
                  </ListItem>
                  <Divider />
                  <ListItem>
                     <ListItemText
                        primary={this.state.user.about}
                        secondary={
                           'Joined: ' +
                           new Date(this.state.user.created).toDateString()
                        }
                     />
                     {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id ==
                           this.state.user.id && <ListItemSecondaryAction />}
                  </ListItem>
               </List>
            </Paper>
         </div>
      );
   }
}

Profile.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
