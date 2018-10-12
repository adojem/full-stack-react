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
   title: {
      width: '100%',
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit
         * 2}px`,
      color: theme.palette.openTitle,
   },
   tile: {
      textAlign: 'center',
   },
   image: {
      height: '100%',
   },
   tileBar: {
      backgroundColor: 'rgba(0,0,0, 0.72)',
      textAlign: 'left',
   },
   tileTitle: {
      marginBottom: '5px',
      color: 'rgb(189,222,219)',
      display: 'block',
   },
   icon: {
      margin: theme.spacing.unit,
   },
});

const Products = ({ classes, products, searched }) => (
   <div className={classes.root}>
      {products.length > 0 ? (
         <div className={classes.container}>
            <GridList cellHeight={200} cols={3} className={classes.gridList}>
               {products.map(product => (
                  <GridListTile key={product._id} className={classes.tile}>
                     <Link to={`/product/${product._id}`}>
                        <img
                           className={classes.image}
                           src={`/api/product/image/${product._id}`}
                           alt={product.name}
                        />
                     </Link>
                     <GridListTileBar
                        className={classes.tileBar}
                        title={(
                           <Link to={`/product/${product._id}`} className={classes.tileTitle}>
                              {product.name}
                           </Link>
                        )}
                        subtitle={<span>{`$${product.price}`}</span>}
                        actionIcon={(
                           <AddShoppingCart
                              className={classes.icon}
                              color="secondary"
                              item={product}
                           />
                        )}
                     />
                  </GridListTile>
               ))}
            </GridList>
         </div>
      ) : (
         searched && (
            <Typography variant="subheading" component="h4" className={classes.title}>
               No products found!
            </Typography>
         )
      )}
   </div>
);

Products.propTypes = {
   classes: PropTypes.object.isRequired,
   products: PropTypes.array.isRequired,
   searched: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Products);
