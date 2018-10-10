import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
      display: 'inline-block',
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
   },
   iconButton: {
      width: '1.75rem',
      height: '1.75rem',
   },
   productTitle: {
      marginBottom: '5px',
   },
   subheading: {
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

const Suggestions = ({ classes }) => (
   <Paper className={classes.root} elevation={4}>
      <Typography variant="title" className={classes.title}>
         Product Title
      </Typography>
      <span>
         <Card className={classes.card}>
            <CardMedia className={classes.cover} />
            <div className={classes.detials}>
               <CardContent className={classes.content}>
                  <Link to="/product/">
                     <Typography
                        variant="title"
                        component="h3"
                        className={classes.productTitle}
                        color="primary"
                     >
                        Item Name
                     </Typography>
                  </Link>
                  <Link to="/shop/">
                     <Typography variant="subheading" className={classes.subheading}>
                        <Icon className={classes.icon}>shopping_basket</Icon>
                        Shop Name
                     </Typography>
                  </Link>
                  <Typography component="p" className={classes.date}>
                     Added on
                  </Typography>
               </CardContent>
               <div className={classes.controls}>
                  <Typography
                     variant="subheading"
                     component="h3"
                     className={classes.price}
                     color="primary"
                  >
                     $ 9.99
                  </Typography>
                  <span className={classes.actions}>
                     <Link to="/product/">
                        <IconButton color="secondary">
                           <Visibility className={classes.iconButton} />
                        </IconButton>
                     </Link>
                  </span>
               </div>
            </div>
         </Card>
      </span>
   </Paper>
);

Suggestions.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestions);
