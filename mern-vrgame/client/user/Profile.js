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
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import DeleteUser from './DeleteUser';
import GameDetail from '../game/GameDetail';
import auth from '../auth/auth-helper';
import { read } from './api-user';
import { listByMaker } from '../game/api-game';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      padding: theme.spacing.unit * 3,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle,
   },
});

class Profile extends Component {
   constructor({ match }) {
      super();
      this.state = {
         user: '',
         redirectToSignin: false,
         games: [],
      };
      this.match = match;
   }

   componentDidMount = () => this.init(this.match.params.userId);

   componentWillReceiveProps = ({ match }) => this.init(match.params.userId);

   init = (userId) => {
      const jwt = auth.isAuthenticated();
      read({ userId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            return this.setState({ redirectToSignin: true });
         }
         this.setState({ user: data });
         return listByMaker({ userId: data._id }).then((data) => {
            if (data.error) {
               return console.log(data.error);
            }
            return this.setState({ games: data });
         });
      });
   };

   updateGames = (game) => {
      const { games: updatedGames } = this.state;
      const index = updatedGames.indexOf(game);
      updatedGames.splice(index, 1);
      this.setState({ games: updatedGames });
   };

   render() {
      const { classes } = this.props;
      const { games, user, redirectToSignin } = this.state;

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
                     <Avatar>
                        <Person />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                  {auth.isAuthenticated().user._id
                     && auth.isAuthenticated().user._id === user._id && (
                     <ListItemSecondaryAction>
                        <Link to={`/user/edit/${user._id}`}>
                           <IconButton aria-label="Edit" color="primary">
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
               {user
                  && games.length > 0 && (
                  <Typography>{`${user.name.split(' ')[0]}'s Games`}</Typography>
               )}
               {games.map(game => (
                  <GameDetail key={game._id} game={game} updatedGames={this.updateGames} />
               ))}
            </List>
         </Paper>
      );
   }
}

Profile.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
