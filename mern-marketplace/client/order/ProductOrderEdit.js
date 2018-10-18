import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { getStatusValues } from './api-order';

const styles = theme => ({
   nested: {
      paddingLeft: theme.spacing.unit,
      paddingBottom: 0,
   },
   statusMessage: {
      position: 'absolute',
      zIndex: '12',
      right: '5px',
      padding: '5px',
   },
   listImg: {
      width: '70px',
      marginRight: '10px',
      verticalAlign: 'top',
   },
   listDetails: {
      display: 'inline-block',
   },
   listQty: {
      margin: 0,
      color: '#5f7c8b',
      fontSize: '0.875rem',
   },
});

class ProductOrderEdit extends Component {
   state = {
      statusValues: [],
      error: '',
   };

   componentDidMount = () => this.loadStatusValues();

   loadStatusValues = () => {
      getStatusValues().then((data) => {
         if (data.error) {
            return this.setState({ error: 'Could not get status' });
         }
         return this.setState({
            statusValues: data,
            error: '',
         });
      });
   };

   render() {
      const { error, statusValues } = this.state;
      const { classes, order, shopId } = this.props;

      return (
         <Fragment>
            <Typography component="span" color="error" className={classes.statusMessage}>
               {error}
            </Typography>
            <List disablePadding style={{ backgroundColor: '#f8f8f8' }}>
               {order.products.map((item, index) => (
                  <span key={item._id}>
                     {item.shop === shopId && (
                        <ListItem button className={classes.nested}>
                           <ListItemText
                              primary={(
                                 <div>
                                    <img
                                       className={classes.listImg}
                                       src={`/api/product/image/${item.product._id}`}
                                       alt={item.product.name}
                                    />
                                    <div className={classes.listDetails}>
                                       {item.product.name}
                                       <p className={classes.listQty}>
                                          {`Quantity: ${item.quantity}`}
                                       </p>
                                    </div>
                                 </div>
                              )}
                           />
                           <TextField
                              select
                              id="select-status"
                              className={classes.textField}
                              label="Update Status"
                              value={item.status}
                              SelectProps={{
                                 MenuProps: {
                                    className: classes.menu,
                                 },
                              }}
                              margin="normal"
                           >
                              {statusValues.map(option => (
                                 <MenuItem key={option} value={option}>
                                    {option}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </ListItem>
                     )}
                     <Divider style={{ width: '80%', margin: 'auto' }} />
                  </span>
               ))}
            </List>
         </Fragment>
      );
   }
}

ProductOrderEdit.propTypes = {
   classes: PropTypes.object.isRequired,
   order: PropTypes.object.isRequired,
   shopId: PropTypes.string.isRequired,
};

export default withStyles(styles)(ProductOrderEdit);
