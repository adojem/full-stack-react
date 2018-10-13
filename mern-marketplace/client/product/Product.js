import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { listRelated, read } from './api-product';
import Suggestions from './Suggestions';
import AddToCart from '../cart/AddToCart';

const styles = theme => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
   flex: {
      display: 'flex',
      alignItems: 'stretch',
   },
   card: {
      padding: '24px 40px 40px',
   },
   subheading: {
      margin: '24px',
      color: theme.palette.openTitle,
   },
   price: {
      display: 'flex',
      padding: '16px',
      margin: '16px 0px',
      backgroundColor: '#93c5ae3d',
      color: '#375a53',
   },
   media: {
      display: 'inline-block',
      width: '50%',
      marginLeft: '24px',
      flexShrink: 0,
   },
   icon: {
      verticalAlign: 'sub',
   },
   link: {
      color: '#3e4c54b3',
      fontSize: '0.875rem',
   },
});

class Product extends Component {
   constructor({ match }) {
      super();
      this.state = {
         product: { shop: {} },
         suggestions: [],
         suggestionTitle: 'Related Products',
      };
      this.match = match;
   }

   loadProduct = (productId) => {
      read({ productId }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         this.setState({ product: data });
         return listRelated({ productId: data._id }).then((data) => {
            if (data.error) {
               return console.log(data.errror);
            }
            return this.setState({ suggestions: data });
         });
      });
   };

   componentDidMount = () => {
      this.loadProduct(this.match.params.productId);
   };

   componentWillReceiveProps = props => this.loadProduct(props.match.params.productId);

   render() {
      const { product, suggestions, suggestionTitle } = this.state;
      const imageUrl = product._id
         ? `/api/product/image/${product._id}?${new Date().getTime()}`
         : '/api/product/defaultphoto';
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            <Grid container spacing={40}>
               <Grid item xs={7} sm={7}>
                  <Card className={classes.card}>
                     <CardHeader
                        title={product.name}
                        subheader={product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        action={(
                           <span className={classes.action}>
                              <AddToCart item={product} />
                           </span>
                        )}
                     />
                     <div className={classes.flex}>
                        <CardMedia
                           className={classes.media}
                           image={imageUrl}
                           title={product.name}
                        />
                        <Typography
                           component="p"
                           variant="subheading"
                           className={classes.subheading}
                        >
                           {product.description}
                           <br />
                           <span className={classes.price}>{`$${product.price}`}</span>
                           <Link to={`/shops/${product.shop._id}`} className={classes.link}>
                              <span>
                                 <Icon className={classes.icon}>shopping_basket</Icon>
                                 {product.shop.name}
                              </span>
                           </Link>
                        </Typography>
                     </div>
                  </Card>
               </Grid>
               {suggestions.length > 0 && (
                  <Grid item xs={5} sm={5}>
                     <Suggestions products={suggestions} title={suggestionTitle} />
                  </Grid>
               )}
            </Grid>
         </div>
      );
   }
}

Product.propTypes = {
   classes: PropTypes.object.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         productId: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
};

export default withStyles(styles)(Product);
