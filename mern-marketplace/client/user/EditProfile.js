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
import auth from '../auth/auth-helper';
import { read, update } from './api-user';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
   },
   title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle,
   },
   error: {
      verticalAlign: 'middle',
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

class EditProfile extends Component {
   constructor({ match }) {
      super();
      this.state = {
         name: '',
         password: '',
         email: '',
         redirectToProfile: false,
         error: '',
      };
      this.match = match;
   }

   componentDidMount = () => {
      const { match } = this.props;
      const jwt = auth.isAuthenticated();
      read({ userId: match.params.userId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ name: data.name, email: data.email });
      });
   };

   handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
   };

   clickSubmit = () => {
      const jwt = auth.isAuthenticated();
      const { name, email, password } = this.state;
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
         return this.setState({ userId: data._id, redirectToProfile: true });
      });
   };

   render() {
      const { classes } = this.props;
      const {
         name, email, password, error, redirectToProfile,
      } = this.state;
      if (redirectToProfile) {
         return <Redirect to={`/user/${this.state.userId}`} />;
      }

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="headline" component="h2" className={classes.title}>
                  Edit Profile
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
      );
   }
}

EditProfile.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
