import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Person from '@material-ui/icons/Person';
import { list } from './api-user';

const styles = theme => ({
   root: theme.mixins.gutters({
      padding: theme.spacing.unit,
      margin: theme.spacing.unit * 5,
   }),
   title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle,
   },
});

class Users extends Component {
   state = { users: [] };

   componentDidMount = () => {
      list().then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ users: data });
      });
   };

   render() {
      const { classes } = this.props;
      const { users } = this.state;

      return (
         <Paper className={classes.root} elevation={4}>
            <Typography variant="title" className={classes.title}>
               All Users
            </Typography>
            <List>
               {users.map((item, i) => (
                  <Link to={`/user/${item._id}`} key={item._id}>
                     <ListItem button>
                        <ListItemAvatar>
                           <Avatar>
                              <Person />
                           </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                           <IconButton>
                              <ArrowForward />
                           </IconButton>
                        </ListItemSecondaryAction>
                     </ListItem>
                  </Link>
               ))}
            </List>
         </Paper>
      );
   }
}

Users.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
