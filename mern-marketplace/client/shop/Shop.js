import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { read } from './api-shop';

const styles = theme => ({
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
      const logoUrl = shop._id
         ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
         : '/api/shops/defaultphoto';
      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="headline" component="h2" className={classes.title}>
                  {shop.name}
               </Typography>
               <Avatar src={logoUrl} className={classes.bigAvatar} />
               <br />
               <Typography variant="subheading" component="h2" className={classes.subheading}>
                  {shop.description}
               </Typography>
            </CardContent>
         </Card>
      );
   }
}

Shop.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shop);
