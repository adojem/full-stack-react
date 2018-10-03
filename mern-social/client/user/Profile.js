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
   ListItemAvatar,
   ListItemText,
   ListItemSecondaryAction,
   Paper,
   Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import auth from '../auth/auth-helper';
import { read } from './api-user';
import { listByUser } from '../post/api-post';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.error.light,
   },
});

class Profile extends Component {
   constructor({ match }) {
      super();
      this.state = {
         user: {
            following: [],
            followers: [],
         },
         redirectToSignin: false,
         following: false,
         posts: [],
      };
      this.match = match;
   }

   init = (userId) => {
      const jwt = auth.isAuthenticated();
      read(
         {
            userId,
         },
         { t: jwt.token },
      ).then((data) => {
         if (data.error) {
            this.setState({ redirectToSignin: true });
         }
         else {
            const following = this.checkFollow(data);
            this.setState({ user: data, following });
            this.loadPosts(data._id);
         }
      });
   };

   componentDidMount = () => {
      this.init(this.match.params.userId);
   };

   componentWillReceiveProps = () => {
      const { match } = this.props;
      this.init(match.params.userId);
   };

   checkFollow = (user) => {
      const jwt = auth.isAuthenticated();
      const match = user.followers.find(follower => follower._id === jwt.user._id);
      return match;
   };

   clickFollowButton = (callApi) => {
      const jwt = auth.isAuthenticated();
      const { user, following } = this.state;
      callApi(
         {
            userId: jwt.user._id,
         },
         {
            t: jwt.token,
         },
         user._id,
      ).then((data) => {
         if (data.error) {
            this.setState({ error: data.error });
         }
         else {
            this.setState({ user: data, following: !following });
         }
      });
   };

   loadPosts = (user) => {
      const jwt = auth.isAuthenticated();
      listByUser({
         userId: user,
      }, {
         t: jwt.token,
      })
         .then((data) => {
            if (data.error) {
               console.log(data.error);
            }
            else {
               this.setState({ posts: data });
            }
         });
   };

   removePost = (post) => {
      const { posts: updatedPost } = this.state;
      const index = updatedPost.indexOf(post);
      updatedPost.splice(index, 1);
      return this.setState({ posts: updatedPost });
   }

   render() {
      const { classes } = this.props;
      const {
         user, posts, redirectToSignin, following,
      } = this.state;
      const photoUrl = user._id
         ? `/api/users/photo/${user._id}?${new Date().getTime()}`
         : '/api/users/defaultphoto';
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
                     <ListItemAvatar>
                        <Avatar src={photoUrl} className={classes.bigAvatar} />
                     </ListItemAvatar>
                     <ListItemText primary={user.name} secondary={user.email} />
                     {auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id ? (
                        <ListItemSecondaryAction>
                           <Link to={`/user/edit/${user._id}`}>
                              <IconButton color="primary">
                                 <Icon>edit_icon</Icon>
                              </IconButton>
                           </Link>
                           <DeleteUser userId={user._id} />
                        </ListItemSecondaryAction>
                     ) : (
                        <FollowProfileButton
                           following={following}
                           onButtonClick={this.clickFollowButton}
                        />
                     )}
                  </ListItem>
                  <Divider />
                  <ListItem>
                     <ListItemText
                        primary={user.about}
                        secondary={`Joined: ${new Date(user.created).toDateString()}`}
                     />
                     {auth.isAuthenticated().user
                        && auth.isAuthenticated().user._id === user.id && <ListItemSecondaryAction />}
                  </ListItem>
               </List>
               <ProfileTabs user={user} posts={posts} removePostUpdate={this.removePost} />
            </Paper>
         </div>
      );
   }
}

Profile.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
