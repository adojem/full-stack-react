import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';

const styles = theme => ({
   root: theme.mixins.gutters({
      padding: theme.spacing.unit,
      paddingBottom: 24,
      backgroundColor: '#80808024',
   }),
   title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle,
   },
   card: {
      display: 'inline-flex',
      width: '100%',
   },
   details: {
      display: 'inline-block',
      width: '100%',
   },
   content: {
      flex: '1 0 auto',
      padding: '1rem 0.5rem 0',
   },
   cover: {
      width: '65%',
      height: 130,
      margin: '0.5rem',
   },
   controls: {
      marginTop: '0.5rem',
   },
   date: {
      color: 'rgb(0,0,0, 0.4)',
   },
   icon: {
      verticalAlign: 'sub',
      marginRight: '0.5rem',
   },
   iconButton: {
      width: '1.75rem',
      height: '1.75rem',
   },
   productTitle: {
      marginBottom: '5px',
      fontSize: '1.1rem',
   },
   subheading: {
      fontSize: '0.9rem',
      color: 'rgba(88,114,128, 0.67)',
   },
   actions: {
      float: 'right',
      marginRight: '6px',
   },
   price: {
      display: 'inline',
      lineHeight: '3',
      paddingLeft: '.5rem',
      color: theme.palette.text.secondary,
   },
});

const Suggestions = ({ classes, products, title }) => (
   <Paper className={classes.root} elevation={4}>
      <Typography variant="title" className={classes.title}>
         {title}
      </Typography>
      {products.map(item => (
         <span key={item._id}>
            <Card className={classes.card}>
               <CardMedia
                  className={classes.cover}
                  image={`/api/product/image/${item._id}`}
                  title={item.name}
               />
               <div className={classes.details}>
                  <CardContent className={classes.content}>
                     <Link to={`/product/${item._id}`}>
                        <Typography
                           variant="title"
                           component="h3"
                           className={classes.productTitle}
                           color="primary"
                        >
                           {item.name}
                        </Typography>
                     </Link>
                     <Link to={`/shop/${item.shop._id}`}>
                        <Typography variant="subheading" className={classes.subheading}>
                           <Icon className={classes.icon}>shopping_basket</Icon>
                           {item.shop.name}
                        </Typography>
                     </Link>
                     <Typography component="p" className={classes.date}>
                        {`Added on ${new Date(item.created).toDateString()}`}
                     </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                     <Typography
                        variant="subheading"
                        component="h3"
                        className={classes.price}
                        color="primary"
                     >
                        {`$ ${item.price}`}
                     </Typography>
                     <span className={classes.actions}>
                        <Link to={`/product/${item._id}`}>
                           <IconButton color="secondary">
                              <Visibility className={classes.iconButton} />
                           </IconButton>
                        </Link>
                     </span>
                  </div>
               </div>
            </Card>
            <Divider />
         </span>
      ))}
   </Paper>
);

Suggestions.propTypes = {
   classes: PropTypes.object.isRequired,
   products: PropTypes.array.isRequired,
   title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Suggestions);
