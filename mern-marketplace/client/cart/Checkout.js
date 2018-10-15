import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
   card: {
      margin: '1.5rem',
      padding: '1rem 2.5rem 5.625rem 2.5rem',
      backgroundColor: '#80808017',
   },
   title: {
      margin: '1.5rem 1rem .5rem 0',
      color: theme.palette.openTitle,
   },
   subheading: {
      marginTop: '1.25rem',
      color: 'rgba(88,114,128, 0.87)',
   },
   textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '90%',
   },
   streetField: {
      width: '93%',
      marginTop: '4px',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
   },
   addressField: {
      width: '45%',
      marginTop: '4px',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
   },
   error: {
      marginTop: theme.spacing.unit,
   },
   errorIcon: {
      marginRight: '5px',
      verticalAlign: 'middle',
   },
});

class Checkout extends Component {
   state = {
      checkoutDetails: {
         customer_name: '',
         customer_email: '',
         delivery_address: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
            coutry: '',
         },
      },
      error: '',
   };

   handleCustomerChange = name => (event) => {
      const { checkoutDetails } = this.state;
      checkoutDetails[name] = event.target.value || undefined;
      this.setState({ checkoutDetails });
   };

   handleAddressChange = name => (event) => {
      const { checkoutDetails } = this.state;
      checkoutDetails.delivery_address[name] = event.target.value || undefined;
      this.setState({ checkoutDetails });
   };

   render() {
      console.log(this.state);
      const { checkoutDetails, error } = this.state;
      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <Typography variant="title" className={classes.title}>
               Checkout
            </Typography>
            <TextField
               type="text"
               id="name"
               className={classes.textField}
               label="Name"
               margin="normal"
               value={checkoutDetails.customer_name}
               onChange={this.handleCustomerChange('customer_name')}
            />
            <br />
            <TextField
               type="email"
               id="email"
               className={classes.textField}
               label="Email"
               margin="normal"
               value={checkoutDetails.customer_email}
               onChange={this.handleCustomerChange('customer_email')}
            />
            <br />
            <Typography className={classes.subheading} variant="subheading" component="h3">
               Delivery Address
            </Typography>
            <TextField
               type="text"
               id="street"
               className={classes.streetField}
               label="Street"
               margin="normal"
               value={checkoutDetails.delivery_address.street}
               onChange={this.handleAddressChange('street')}
            />
            <br />
            <TextField
               type="text"
               id="city"
               className={classes.addressField}
               label="City"
               margin="normal"
               value={checkoutDetails.delivery_address.city}
               onChange={this.handleAddressChange('city')}
            />
            <TextField
               type="text"
               id="state"
               className={classes.addressField}
               label="State"
               margin="normal"
               value={checkoutDetails.delivery_address.state}
               onChange={this.handleAddressChange('state')}
            />
            <br />
            <TextField
               type="text"
               id="zipcode"
               className={classes.addressField}
               label="Zip Code"
               margin="normal"
               value={checkoutDetails.delivery_address.zipcode}
               onChange={this.handleAddressChange('zipcode')}
            />
            <TextField
               type="text"
               id="country"
               className={classes.addressField}
               label="Country"
               margin="normal"
               value={checkoutDetails.delivery_address.country}
               onChange={this.handleAddressChange('country')}
            />
            <br />
            {error && (
               <Typography component="p" color="error" className={classes.error}>
                  <Icon className={classes.errorIcon}>error</Icon>
                  {error}
               </Typography>
            )}
         </Card>
      );
   }
}

Checkout.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);
