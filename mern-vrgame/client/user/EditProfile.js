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
import { read, update } from './api-user';
import auth from '../auth/auth-helper';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
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

class EditProfile extends Component {
   constructor({ match }) {
      super();
      this.state = {
         name: '',
         email: '',
         password: '',
         error: '',
         redirectToProfile: false,
      };
      this.match = match;
   }

   componentDidMount = () => {
      const jwt = auth.isAuthenticated();
      read(
         {
            userId: this.match.params.userId,
         },
         {
            t: jwt.token,
         },
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            name: data.name,
            email: data.email,
         });
      });
   };

   handleChange = name => event => this.setState({ [name]: event.target.value });

   handleKeydown = e => e.keyCode === 13 && this.clickSubmit();

   clickSubmit = () => {
      const { name, email, password } = this.state;
      const jwt = auth.isAuthenticated();
      const user = {
         name: name || undefined,
         email: email || undefined,
         password: password || undefined,
      };
      update(
         {
            userId: this.match.params.userId,
         },
         {
            t: jwt.token,
         },
         user,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            userId: data._id,
            redirectToProfile: true,
         });
      });
   };

   render() {
      const {
         email, error, password, name, redirectToProfile, userId,
      } = this.state;
      const { classes } = this.props;

      if (redirectToProfile) {
         return <Redirect to={`/user/${userId}`} />;
      }

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography className={classes.title} variant="h5" component="h2">
                  Edit Profile
               </Typography>
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

EditProfile.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
