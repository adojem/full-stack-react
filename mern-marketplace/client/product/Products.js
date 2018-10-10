import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

const styles = theme => ({
   root: {
      display: 'flex',
      background: theme.palette.background.paper,
      padding: '0 8px',
   },
   container: {
      minWidth: '100%',
      padding: '14px',
   },
   gridList: {
      width: '100%',
      minHeight: 200,
      padding: '16px 0 10px',
   },
   tileBar: {
      backgroundColor: 'rgba(0,0,0, 0.72)',
      textAlign: 'left',
   },
   tileTitle: {
      maginbBottom: '5px',
      color: 'rgb(189,222,219)',
      display: 'block',
   },
});

const Products = ({ classes, products }) => (
   <div className={classes.root}>
      {products.length > 0 ? (
         <div className={classes.container}>
            <GridList cellHeight={200} className={classes.gridList}>
               {products.map(product => (
                  <GridListTile key={product._id} className={classes.tile}>
                     <Link to={`/product/${product._id}`}>
                        <GridListTileBar
                           className={classes.tileBar}
                           title={(
                              <Link to={`/product/${product._id}`} className={classes.tileTitle}>
                                 {product.name}
                              </Link>
                           )}
                           subtitle={(
                              <span>
$
                                 {product.price}
                              </span>
                           )}
                           actionIcon={<AddShoppingCart item={product} />}
                        />
                     </Link>
                  </GridListTile>
               ))}
            </GridList>
         </div>
      ) : (
         <Typography>No products found!</Typography>
      )}
   </div>
);

Products.propTypes = {
   classes: PropTypes.object.isRequired,
   products: PropTypes.array.isRequired,
};

export default withStyles(styles)(Products);
