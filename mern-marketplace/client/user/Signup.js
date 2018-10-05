import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { create } from './api-user';

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
   },
   title: {
      marginTop: theme.spacing.unit * 2,
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
});

class Signup extends Component {
   state = {
      name: '',
      password: '',
      email: '',
      open: false,
      error: '',
   };

   handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
   };

   clickSubmit = () => {
      const { name, email, password } = this.state;
      const user = {
         name: name || undefined,
         email: email || undefined,
         password: password || undefined,
      };
      create(user).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ error: '', open: true });
      });
   };

   render() {
      const { classes } = this.props;
      const {
         name, email, password, error, open,
      } = this.state;

      return (
         <div>
            <Card className={classes.card}>
               <CardContent>
                  <Typography variant="headline" component="h2" className={classes.title}>
                     Sign Up
                  </Typography>
                  <TextField
                     id="name"
                     type="text"
                     label="Name"
                     className={classes.textField}
                     value={name}
                     onChange={this.handleChange('name')}
                     margin="normal"
                  />
                  <br />
                  <TextField
                     id="email"
                     type="email"
                     label="Email"
                     className={classes.textField}
                     value={email}
                     onChange={this.handleChange('email')}
                     margin="normal"
                  />
                  <br />
                  <TextField
                     id="password"
                     type="password"
                     label="Password"
                     className={classes.textField}
                     value={password}
                     onChange={this.handleChange('password')}
                     margin="normal"
                  />
                  <br />
                  {error && (
                     <Typography component="p" color="error">
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
                     onClick={this.clickSubmit}
                     className={classes.submit}
                  >
                     Submit
                  </Button>
               </CardActions>
            </Card>
            <Dialog open={open} disableBackdropClick>
               <DialogTitle>New Account</DialogTitle>
               <DialogContent>
                  <DialogContentText>New account successfully created.</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Link to="/signin">
                     <Button color="primary" autoFocus variant="raised">
                        Sign In
                     </Button>
                  </Link>
               </DialogActions>
            </Dialog>
         </div>
      );
   }
}

Signup.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
