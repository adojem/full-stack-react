import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
   error: {
      marginTop: theme.spacing.unit * 2,
   },
   errorIcon: {
      marginRight: '0.3rem',
      verticalAlign: 'middle',
   },
   textField: {
      width: 300,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
   },
   submit: {
      margin: 'auto',
      marginTop: '0.3rem',
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

   clickSubmit = () => {
      const { email, password } = this.state;
      const user = {
         email: email || undefined,
         password: password || undefined,
      };
      this.setState({ redirectToReferrer: true });
   };

   render() {
      const { error, redirectToReferrer } = this.state;
      const { classes, location } = this.props;
      const { from } = location.state || { from: { pathname: '/' } };

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
                  type="email"
                  id="email"
                  className={classes.textField}
                  label="Email"
                  margin="normal"
                  onChange={this.handleChange('email')}
               />
               <TextField
                  type="password"
                  id="password"
                  className={classes.textField}
                  label="Password"
                  margin="normal"
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
      );
   }
}

Signin.propTypes = {
   classes: PropTypes.object.isRequired,
   location: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);
