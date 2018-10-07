import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { list } from './api-shop';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 3,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle,
      textAlign: 'center',
      fontSize: '1.2rem',
   },
   subheading: {
      color: theme.palette.text.secondary,
   },
   shopTitle: {
      fontSize: '1.2rem',
   },
   details: {
      padding: '1.5rem',
   },
});

class Shops extends Component {
   state = {
      shops: [],
   };

   componentDidMount = () => {
      this.loadShops();
   };

   loadShops = () => {
      list().then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ shops: data });
      });
   };

   render() {
      const { classes } = this.props;
      const { shops } = this.state;

      return (
         <Paper className={classes.root} elevation={4}>
            <Typography variant="title" className={classes.title}>
               All Shops
            </Typography>
            <List dense>
               {shops.map(shop => (
                  <Link to={`/shops/${shop._id}`} key={shop._id}>
                     <Divider />
                     <ListItem button>
                        <ListItemAvatar>
                           <Avatar className={classes.avatar} />
                        </ListItemAvatar>
                        <div className={classes.details}>
                           <Typography
                              variant="headline"
                              component="h2"
                              color="primary"
                              className={classes.shopTitle}
                           >
                              {shop.name}
                           </Typography>
                           <Typography
                              variant="subheading"
                              component="h4"
                              className={classes.subheading}
                           >
                              {shop.description}
                           </Typography>
                        </div>
                     </ListItem>
                     <Divider />
                  </Link>
               ))}
            </List>
         </Paper>
      );
   }
}

Shops.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shops);
