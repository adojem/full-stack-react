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

class Signin extends Component {
   state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false,
   };

   handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
   };

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
         auth.authenticate(data, () => this.setState({ redirectToReferrer: true }));
      });
   };

   render() {
      const { classes, location } = this.props;
      const {
         email, password, error, redirectToReferrer,
      } = this.state;
      const { from } = location.state || { from: { pathname: '/' } };
      if (redirectToReferrer) {
         return <Redirect to={from} />;
      }

      return (
         <div>
            <Card className={classes.card}>
               <CardContent>
                  <Typography variant="headline" component="h2" className={classes.title}>
                     Sign In
                  </Typography>
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
         </div>
      );
   }
}

Signin.propTypes = {
   classes: PropTypes.object.isRequired,
   location: PropTypes.object,
};

export default withStyles(styles)(Signin);
