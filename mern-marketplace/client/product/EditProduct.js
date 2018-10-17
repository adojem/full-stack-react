import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { read, update } from './api-product';
import auth from '../auth/auth-helper';

const styles = theme => ({
   card: {
      maxWidth: 500,
      margin: 'auto',
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
   },
   textField: {
      width: 400,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
   },
   submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2,
   },
   bigAvatar: {
      width: 60,
      height: 60,
      margin: 'auto',
   },
   input: {
      display: 'none',
   },
   filename: {
      marginLeft: '10px',
   },
   rightIcon: {
      marginLeft: '0.5rem',
   },
});

class EditProduct extends Component {
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
      read({ productId: this.match.params.productId }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            id: data._id,
            name: data.name,
            description: data.description,
            category: data.category,
            quantity: data.quantity,
            price: data.price,
         });
      });
   };

   handleChange = name => (event) => {
      const value = name === 'image' ? event.target.files[0] : event.target.value;
      this.productData.set(name, value);
      return this.setState({ [name]: value });
   };

   clickSubmit = () => {
      const jwt = auth.isAuthenticated();
      update(
         {
            shopId: this.match.params.shopId,
            productId: this.match.params.productId,
         },
         {
            t: jwt.token,
         },
         this.productData,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ redirect: true });
      });
   };

   render() {
      const {
         category,
         description,
         error,
         id,
         image,
         quantity,
         name,
         price,
         redirect,
      } = this.state;
      const imageUrl = id
         ? `/api/product/image/${id}?${new Date().getTime()}`
         : '/api/product/defaultphoto';

      if (redirect) {
         return <Redirect to="/seller/shops" />;
      }

      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="headline" component="h2" className={classes.title}>
                  Edit Product
               </Typography>
               <br />
               <Avatar src={imageUrl} className={classes.bigAvatar} />
               <br />
               <label htmlFor="icon-button-file">
                  <input
                     accept="image/*"
                     className={classes.input}
                     id="icon-button-file"
                     type="file"
                     onChange={this.handleChange('image')}
                  />
                  <Button variant="raised" color="secondary" component="span">
                     Change Image
                     <CloudUpload className={classes.rightIcon} />
                  </Button>
               </label>
               <span className={classes.filename}>{image ? image.name : ''}</span>
               <br />
               <TextField
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={name}
                  margin="normal"
                  onChange={this.handleChange('name')}
               />
               <br />
               <TextField
                  id="multiline-flexible"
                  label="Description"
                  multiline
                  rows="3"
                  className={classes.textField}
                  value={description}
                  margin="normal"
                  onChange={this.handleChange('description')}
               />
               <br />
               <TextField
                  id="category"
                  label="Category"
                  className={classes.textField}
                  value={category}
                  margin="normal"
                  onChange={this.handleChange('category')}
               />
               <br />
               <TextField
                  type="number"
                  id="quantity"
                  label="Quantity"
                  className={classes.textField}
                  value={quantity}
                  margin="normal"
                  onChange={this.handleChange('quantity')}
               />
               <br />
               <TextField
                  id="price"
                  label="Price"
                  className={classes.textField}
                  value={price}
                  margin="normal"
                  onChange={this.handleChange('price')}
               />
               <br />
               {error && <Typography>{error}</Typography>}
            </CardContent>
            <CardActions>
               <Button
                  color="primary"
                  variant="raised"
                  className={classes.submit}
                  onClick={this.clickSubmit}
               >
                  Update
               </Button>
               <Link
                  to={`/seller/shops/edit/${this.match.params.shopId}`}
                  className={classes.submit}
               >
                  <Button variant="raised">Cancel</Button>
               </Link>
            </CardActions>
         </Card>
      );
   }
}

EditProduct.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProduct);
