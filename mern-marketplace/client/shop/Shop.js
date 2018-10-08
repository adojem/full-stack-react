import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { read } from './api-shop';

const styles = theme => ({
   title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
   },
   subheading: {
      marginTop: theme.spacing.unit,
      color: theme.palette.openTitle,
   },
});

class Shop extends Component {
   constructor({ match }) {
      super();
      this.state = {
         shop: '',
      };
      this.match = match;
   }

   componentDidMount = () => {
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
      const { shop } = this.state;
      const { classes } = this.props;

      return (
         <CardContent>
            <Typography variant="headline" component="h2" className={classes.title}>
               {shop.name}
            </Typography>
            <Avatar />
            <br />
            <Typography variant="subheading" component="h2" className={classes.subheading}>
               {shop.description}
            </Typography>
         </CardContent>
      );
   }
}

Shop.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shop);
