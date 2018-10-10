import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { read } from './api-shop';
import { listByShop } from '../product/api-product';
import Products from '../product/Products';

const styles = theme => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
   card: {
      textAlign: 'center',
      paddingBottom: theme.spacing.unit * 2,
   },
   title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
   },
   subheading: {
      marginTop: theme.spacing.unit,
      color: theme.palette.openTitle,
   },
   bigAvatar: {
      width: 100,
      height: 100,
      margin: 'auto',
   },
   productTitle: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${
         theme.spacing.unit
      }px ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle,
      width: '100%',
   },
});

class Shop extends Component {
   constructor({ match }) {
      super();
      this.state = {
         shop: '',
         products: [],
      };
      this.match = match;
   }

   loadProducts = () => {
      listByShop({
         shopId: this.match.params.shopId,
      }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ products: data });
      });
   };

   componentDidMount = () => {
      this.loadProducts();
      read({
         shopId: this.match.params.shopId,
      }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.errror });
         }
         return this.setState({ shop: data });
      });
   };

   render() {
      const { shop, products } = this.state;
      const logoUrl = shop._id
         ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
         : '/api/shops/defaultphoto';
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            <Grid container spacing={24}>
               <Grid item xs={4} sm={4}>
                  <Card className={classes.card}>
                     <CardContent>
                        <Typography variant="headline" component="h2" className={classes.title}>
                           {shop.name}
                        </Typography>
                        <Avatar src={logoUrl} className={classes.bigAvatar} />
                        <br />
                        <Typography
                           variant="subheading"
                           component="h2"
                           className={classes.subheading}
                        >
                           {shop.description}
                        </Typography>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={8} sm={8}>
                  <Card>
                     <Typography variant="title" component="h2" className={classes.productTitle}>
                        Products
                     </Typography>
                     <Products products={products} />
                  </Card>
               </Grid>
            </Grid>
         </div>
      );
   }
}

Shop.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shop);
