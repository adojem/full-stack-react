import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import auth from '../auth/auth-helper';
import { create } from './api-product';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
   },
   error: {
      verticalAlign: 'middle',
      marginRight: theme.spacing.unit,
   },
   errorTxt: {
      marginTop: theme.spacing.unit,
   },
   title: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
   },
   textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
   },
   submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2,
   },
   filename: {
      marginLeft: '10px',
   },
   rightIcon: {
      marginLeft: theme.spacing.unit,
   },
});

class NewProduct extends Component {
   constructor({ match }) {
      super();
      this.state = {
         name: '',
         description: '',
         image: '',
         category: '',
         quantity: '',
         price: '',
         redirect: false,
         error: '',
      };
      this.match = match;
   }

   componentDidMount = () => {
      this.productData = new FormData();
   };

   handleChange = name => (event) => {
      const value = name === 'image' ? event.target.files[0] : event.target.value;
      this.productData.set(name, value);
      this.setState({ [name]: value });
   };

   clickSubmit = () => {
      const jwt = auth.isAuthenticated();
      create(
         {
            shopId: this.match.params.shopId,
         },
         {
            t: jwt.token,
         },
         this.productData,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            error: '',
            redirect: true,
         });
      });
   };

   render() {
      const {
         name, description, category, image, quantity, price, error, redirect,
      } = this.state;

      if (redirect) {
         return <Redirect to="/seller/shops" />;
      }

      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="headline" component="h2" className={classes.title}>
                  New Product
               </Typography>
               <label htmlFor="icon-button-file">
                  <input
                     accept="image/*"
                     style={{ display: 'none' }}
                     id="icon-button-file"
                     type="file"
                     onChange={this.handleChange('image')}
                  />
                  <Button variant="raised" color="secondary" component="span">
                     Upload Photo
                     <CloudUpload className={classes.rightIcon} />
                  </Button>
               </label>
               <span className={classes.filename}>{image ? image.name : ''}</span>
               <br />
               <TextField
                  id="name"
                  label="Name"
                  value={name}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('name')}
               />
               <br />
               <TextField
                  id="multiline-flexible"
                  label="Description"
                  multiline
                  rows="2"
                  value={description}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('description')}
               />
               <br />
               <TextField
                  id="category"
                  label="Category"
                  value={category}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('category')}
               />
               <br />
               <TextField
                  type="number"
                  id="quantity"
                  label="Quantity"
                  value={quantity}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('quantity')}
               />
               <br />
               <TextField
                  type="number"
                  id="price"
                  label="Price"
                  value={price}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('price')}
               />
               <br />
               {error && (
                  <Typography className={classes.errorTxt} component="p" color="error">
                     <Icon color="error" className={classes.error}>
                        error
                     </Icon>
                     {error}
                  </Typography>
               )}
            </CardContent>
            <CardActions>
               <Button
                  color="primary"
                  variant="raised"
                  className={classes.submit}
                  onClick={this.clickSubmit}
               >
                  Submit
               </Button>
               <Link to="/seller/shops" className={classes.submit}>
                  <Button variant="raised">Cancel</Button>
               </Link>
            </CardActions>
         </Card>
      );
   }
}

NewProduct.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewProduct);
