import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import auth from '../auth/auth-helper';
import { read } from './api-user';
import { listByUser } from '../media/api-media';
import DeleteUser from './DeleteUser';
import MediaList from '../media/MediaList';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 850,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 3,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle,
   },
   avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
   },
});

class Profile extends Component {
   constructor({ match }) {
      super();
      this.state = {
         user: '',
         redirectToSignin: false,
         media: [],
      };
      this.match = match;
   }

   componentDidMount = () => this.init(this.match.params.userId);

   componentWillReceiveProps = props => this.init(props.match.params.userId);

   init = (userId) => {
      const jwt = auth.isAuthenticated();
      read({ userId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            return this.setState({ redirectToSignin: true });
         }
         this.setState({ user: data });
         return listByUser({ userId: data._id }).then((media) => {
            if (media.error) {
               return console.log(media.error);
            }
            return this.setState({ media });
         });
      });
   };

   render() {
      const { media, redirectToSignin, user } = this.state;
      const { classes } = this.props;

      if (redirectToSignin) {
         return <Redirect to="/signin" />;
      }

      return (
         <Paper className={classes.root} elevation={4}>
            <Typography className={classes.title} variant="h6">
               Profile
            </Typography>
            <List dense>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar className={classes.avatar}>{user.name && user.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                  {auth.isAuthenticated().user
                     && auth.isAuthenticated().user._id === user._id && (
                     <ListItemSecondaryAction>
                        <Link to={`/user/edit/${user._id}`}>
                           <IconButton aria-label="Edit" color="primary">
                              <EditIcon />
                           </IconButton>
                        </Link>
                        <DeleteUser userid={user._id} />
                     </ListItemSecondaryAction>
                  )}
               </ListItem>
               <Divider />
               <ListItem>
                  <ListItemText primary={`Joined: ${new Date(user.created).toDateString()}`} />
               </ListItem>
               <MediaList media={media} />
            </List>
         </Paper>
      );
   }
}

Profile.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
