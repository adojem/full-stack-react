import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
});

class Cart extends Component {
   state = {
      checkout: false,
   };

   setCheckout = val => this.setState({ checkout: val });

   render() {
      const { classes } = this.props;
      return (
         <div className={classes.root}>
            <Grid container spacing={24}>
               <Grid item xs={6} sm={6}>
                  Cart
               </Grid>
               <Grid item xs={6} sm={6}>
                  Cart
               </Grid>
            </Grid>
         </div>
      );
   }
}

Cart.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
