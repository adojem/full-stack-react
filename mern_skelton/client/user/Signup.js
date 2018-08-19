import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { create } from './api-user';
import {
   Card,
   CardActions,
   CardContent,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   TextField,
   Typography,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
   console.dir(theme.palette);
   return {
      card: {
         maxWidth: 600,
         margin: 'auto',
         textAlign: 'center',
         marginTop: theme.spacing.unit * 5,
         paddingBottom: theme.spacing.unit * 2,
      },
      error: {
         verticalAlign: 'middle'
      },
      title: {
         marginTop: theme.spacing.unit * 2,
         color: theme.palette.primary.main
      },
      textField: {
         marginLeft: theme.spacing.unit,
         marginRight: theme.spacing.unit,
         width: 300
      },
      submit: {
         margin: 'auto',
         marginBottom: theme.spacing.unit * 2,
      }
   };
};

class Signup extends Component {
   state = {
      name: '',
      password: '',
      email: '',
      open: false,
      error: ''
   };

   handleChange = (name) => (event) => {
      this.setState({ [name]: event.target.value });
   };

   clickSubmit = () => {
      const user = {
         name: this.state.name || undefined,
         email: this.state.email || undefined,
         password: this.state.password || undefined
      };

      create(user).then((data) => {
         if (data.error) {
            this.setState({ error: data.error });
         } else {
            this.setState({ error: '', open: true });
         }
      });
   };

   render() {
      const { classes } = this.props;

      return (
         <div>
            <Card className={classes.card}>
               <CardContent>
                  <Typography
                     component="h2"
                     className={classes.title}
                     variant="headline"
                  >
                     Sign Up
                  </Typography>
                  <TextField
                     id="name"
                     label="Name"
                     className={classes.textField}
                     value={this.state.name}
                     onChange={this.handleChange('name')}
                     margin="normal"
                  />
                  <br />
                  <TextField
                     id="email"
                     type="email"
                     label="Email"
                     className={classes.textField}
                     value={this.state.email}
                     onChange={this.handleChange('email')}
                     margin="normal"
                  />
                  <br />
                  <TextField
                     id="password"
                     type="password"
                     label="Password"
                     className={classes.textField}
                     value={this.state.password}
                     onChange={this.handleChange('password')}
                     margin="normal"
                  />
                  <br />
                  {this.state.error && (
                     <Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>
                           error
                        </Icon>
                        {this.state.error}
                     </Typography>
                  )}
               </CardContent>
               <CardActions>
                  <Button
                     color="primary"
                     variant="raised"
                     onClick={this.clickSubmit}
                     className={classes.submit}
                  >
                     Submit
                  </Button>
               </CardActions>
            </Card>
            <Dialog open={this.state.open} disableBackdropClick={true}>
               <DialogTitle>New Account</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     New account successfully created.
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button
                     component={Link}
                     to="/signin"
                     color="primary"
                     variant="raised"
                  >
                     Sign In
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      );
   }
}

Signup.proptypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
