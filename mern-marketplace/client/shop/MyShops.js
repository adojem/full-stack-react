import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { listByOwner } from './api-shop';
import auth from '../auth/auth-helper';
import DeleteShop from './DeleteShop';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px ${theme.spacing.unit}px`,
      color: theme.palette.protectedTitle,
      fontSize: '1.2rem',
   },
   addButton: {
      float: 'right',
   },
   leftIcon: {
      marginRight: '0.5rem',
   },
});

class MyShops extends Component {
   state = {
      shops: [],
      redirectToSignin: false,
   };

   componentDidMount = () => {
      this.loadShops();
   };

   loadShops = () => {
      const jwt = auth.isAuthenticated();
      listByOwner(
         {
            userId: jwt.user._id,
         },
         { t: jwt.token },
      ).then((data) => {
         if (data.error) {
            return this.setState({ redirectToSignin: true });
         }
         return this.setState({ shops: data });
      });
   };

   removeShop = (shop) => {
      const { shops } = this.state;
      const updatedShops = shops;
      const index = updatedShops.indexOf(shop);
      updatedShops.splice(index, 1);
      return this.setState({ shops: updatedShops });
   };

   render() {
      const { classes } = this.props;
      const { shops } = this.state;

      return (
         <Paper className={classes.root} elevation={4}>
            <Typography variant="title" className={classes.title}>
               Your Shops
               <span className={classes.addButton}>
                  <Link to="/seller/shop/new">
                     <Button color="primary" variant="raised">
                        <Icon className={classes.leftIcon}>add_box</Icon>
                        New Shop
                     </Button>
                  </Link>
               </span>
            </Typography>
            <List dense>
               {shops.map(shop => (
                  <Fragment key={shop._id}>
                     <ListItem button>
                        <ListItemAvatar>
                           <Avatar
                              src={`/api/shops/logo/${shop._id}?${new Date().getTime()}`}
                              className={classes.avatar}
                           />
                        </ListItemAvatar>
                        <ListItemText primary={shop.name} secondary={shop.description} />
                        {auth.isAuthenticated().user
                           && auth.isAuthenticated().user._id == shop.owner._id && (
                           <ListItemSecondaryAction>
                              <Link to={`/seller/orders/${shop.name}/${shop._id}`}>
                                 <Button aria-label="Orders" color="primary">
                                       View Orders
                                 </Button>
                              </Link>
                              <Link to={`/seller/shop/edit/${shop._id}`}>
                                 <IconButton>
                                    <Edit />
                                 </IconButton>
                              </Link>
                              <DeleteShop shop={shop} onRemove={this.removeShop} />
                           </ListItemSecondaryAction>
                        )}
                     </ListItem>
                  </Fragment>
               ))}
            </List>
         </Paper>
      );
   }
}

MyShops.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyShops);
