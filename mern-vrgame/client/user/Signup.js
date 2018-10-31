import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { create } from './api-user';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   textField: {
      width: 300,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
   },
   error: {
      marginTop: theme.spacing.unit * 2,
      marginLeft: '-6px',
   },
   errorIcon: {
      marginRight: '.3rem',
      verticalAlign: 'middle',
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

   handleChange = name => event => this.setState({ [name]: event.target.value });

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
         return this.setState({
            error: '',
            open: true,
         });
      });
   };

   render() {
      const {
         email, error, password, name, open,
      } = this.state;
      const { classes } = this.props;

      return (
         <Fragment>
            <Card className={classes.card}>
               <CardContent>
                  <Typography variant="h5">Sign Up</Typography>
                  <TextField
                     id="name"
                     className={classes.textField}
                     label="Name"
                     margin="normal"
                     value={name}
                     onChange={this.handleChange('name')}
                  />
                  <TextField
                     id="email"
                     className={classes.textField}
                     label="Email"
                     margin="normal"
                     value={email}
                     onChange={this.handleChange('email')}
                  />
                  <TextField
                     id="password"
                     className={classes.textField}
                     label="Password"
                     margin="normal"
                     value={password}
                     onChange={this.handleChange('password')}
                  />
                  {error && (
                     <Typography className={classes.error} component="p" color="error">
                        <Icon className={classes.errorIcon}>error</Icon>
                        {error}
                     </Typography>
                  )}
               </CardContent>
               <CardActions>
                  <Button
                     className={classes.submit}
                     variant="contained"
                     color="primary"
                     onClick={this.clickSubmit}
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
                     <Button variant="contained" color="primary">
                        Sign In
                     </Button>
                  </Link>
               </DialogActions>
            </Dialog>
         </Fragment>
      );
   }
}

Signup.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
