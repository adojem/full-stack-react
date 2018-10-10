import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import auth from '../auth/auth-helper';
import { read, update } from './api-shop';
import MyProducts from '../product/MyProducts';

const styles = theme => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
   card: {
      textAlign: 'center',
      paddingBottom: theme.spacing.unit * 2,
   },
   title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
   },
   subheading: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
   },
   error: {
      marginRight: '5px',
      verticalAlign: 'middle',
   },
   textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 400,
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
   rightIcon: {
      marginLeft: '5px',
   },
});

class EditShop extends Component {
   constructor({ match }) {
      super();
      this.state = {
         name: '',
         description: '',
         image: '',
         redirect: false,
         error: '',
      };
      this.match = match;
   }

   componentDidMount = () => {
      this.shopData = new FormData();
      const jwt = auth.isAuthenticated();
      read(
         {
            shopId: this.match.params.shopId,
         },
         {
            t: jwt.token,
         },
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            id: data._id,
            name: data.name,
            description: data.description,
            owner: data.owner.name,
         });
      });
   };

   handleChange = name => (event) => {
      const value = name === 'image' ? event.target.files[0] : event.target.value;
      this.shopData.set(name, value);
      this.setState({ [name]: value });
   };

   clickSubmit = () => {
      const jwt = auth.isAuthenticated();
      update(
         {
            shopId: this.match.params.shopId,
         },
         {
            t: jwt.token,
         },
         this.shopData,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ redirect: true });
      });
   };

   render() {
      const {
         id, description, error, name, owner, redirect,
      } = this.state;
      const logoUrl = id
         ? `/api/shops/logo/${id}?${new Date().getTime()}`
         : '/api/shops/defaultphoto';
      const { classes } = this.props;

      if (redirect) {
         return <Redirect to="/seller/shops" />;
      }

      return (
         <div className={classes.root}>
            <Grid container spacing={24}>
               <Grid item xs={6} sm={6}>
                  <Card className={classes.card}>
                     <CardContent>
                        <Typography variant="headline" component="h2" className={classes.title}>
                           Edit Shop
                        </Typography>
                        <br />
                        <Avatar src={logoUrl} className={classes.bigAvatar} />
                        <br />
                        <label htmlFor="icon-button-file">
                           <input
                              accept="image/*"
                              className={classes.input}
                              type="file"
                              id="icon-button-file"
                              onChange={this.handleChange('image')}
                           />
                           <Button variant="raised" color="default" component="span">
                              Change Logo
                              <CloudUpload className={classes.rightIcon} />
                           </Button>
                        </label>
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
                           rows="3"
                           value={description}
                           className={classes.textField}
                           margin="normal"
                           onChange={this.handleChange('description')}
                        />
                        <br />
                        <Typography
                           variant="subheading"
                           component="h4"
                           className={classes.subheading}
                        >
                           {`Owner: ${owner}`}
                        </Typography>
                        <br />
                        {error && (
                           <Typography component="p" color="error">
                              <Icon className={classes.error}>error</Icon>
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
                           Update
                        </Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item xs={6} sm={6}>
                  <MyProducts shopId={this.match.params.shopId} />
               </Grid>
            </Grid>
         </div>
      );
   }
}

EditShop.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditShop);
