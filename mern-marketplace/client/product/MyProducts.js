import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { listByShop } from './api-product';
import DeleteProduct from './DeleteProduct';

const styles = theme => ({
   products: {
      padding: '24px',
   },
   addButton: {
      float: 'right',
   },
   leftIcon: {
      marginRight: '8px',
   },
   title: {
      maring: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
   },
   productTitle: {
      fontSize: '1.1rem',
   },
   subheading: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
      fontSize: '0.9rem',
   },
   cover: {
      width: 110,
      height: 100,
      margin: '8px',
   },
   details: {
      padding: '10px',
   },
});

class MyProducts extends Component {
   constructor({ shopId }) {
      super();
      this.state = {
         products: [],
      };
      this.shopId = shopId;
   }

   loadProducts = () => {
      listByShop({
         shopId: this.shopId,
      }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ products: data });
      });
   };

   componentDidMount = () => {
      this.loadProducts();
   };

   removeProduct = (product) => {
      const updatedProducts = this.state.products;
      const index = updatedProducts.indexOf(product);
      updatedProducts.splice(index, 1);
      this.setState({ shops: updatedProducts });
   };

   render() {
      const { classes, shopId } = this.props;
      const { products } = this.state;

      return (
         <Card className={classes.products}>
            <Typography variant="title" className={classes.title}>
               Products
               <span className={classes.addButton}>
                  <Link to={`/seller/${this.shopId}/products/new`} />
                  <Button color="primary" variant="raised">
                     <Icon className={classes.leftIcon}>add_box</Icon>
                     New Product
                  </Button>
               </span>
            </Typography>
            <List dense>
               {products.map(product => (
                  <span key={product._id}>
                     <ListItem>
                        <CardMedia
                           className={classes.cover}
                           image={`/api/product/image/${product._id}?${new Date().getTime()}`}
                           title={product.name}
                        />
                        <div className={classes.details}>
                           <Typography
                              variant="headline"
                              component="h2"
                              color="primary"
                              className={classes.productTitle}
                           >
                              {product.name}
                           </Typography>
                           <Typography
                              variant="subheading"
                              component="h4"
                              className={classes.subheading}
                           >
                              {`Quantity: ${product.quantity} | Price: $ ${product.price}`}
                           </Typography>
                        </div>
                        <ListItemSecondaryAction>
                           <Link to={`/seller/${product.shop._id}/${product._id}/edit`}>
                              <IconButton aria-label="Edit" color="primary">
                                 <Edit />
                              </IconButton>
                           </Link>
                           <DeleteProduct
                              product={product}
                              shopId={shopId}
                              onRemove={this.removeProduct}
                           />
                        </ListItemSecondaryAction>
                     </ListItem>
                     <Divider />
                  </span>
               ))}
            </List>
         </Card>
      );
   }
}

MyProducts.propTypes = {
   classes: PropTypes.object.isRequired,
   shopId: PropTypes.string.isRequired,
};

export default withStyles(styles)(MyProducts);
