import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { signin } from './api-auth';
import auth from './auth-helper';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
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

class Signin extends Component {
   state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false,
   };

   handleChange = name => event => this.setState({ [name]: event.target.value });

   handleKeydown = e => e.keyCode === 13 && this.clickSubmit();

   clickSubmit = () => {
      const { email, password } = this.state;
      const user = {
         email: email || undefined,
         password: password || undefined,
      };
      signin(user).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return auth.authenticate(data, () => {
            this.setState({ redirectToReferrer: true });
         });
      });
   };

   render() {
      const {
         email, error, password, redirectToReferrer,
      } = this.state;
      const { classes, location } = this.props;
      const { from } = location.state || {
         from: {
            pathname: '/',
         },
      };

      if (redirectToReferrer) {
         return <Redirect to={from} />;
      }

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="h5" component="h2" className={classes.title}>
                  Sign In
               </Typography>
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
                  type="password"
                  label="Password"
                  margin="normal"
                  value={password}
                  onChange={this.handleChange('password')}
                  onKeyDown={this.handleKeydown}
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
      );
   }
}

Signin.propTypes = {
   classes: PropTypes.object.isRequired,
   location: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);
