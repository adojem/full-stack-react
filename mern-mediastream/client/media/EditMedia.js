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
import auth from '../auth/auth-helper';
import { update, read } from './api-media';

const styles = theme => ({
   card: {
      maxWidth: 500,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
      fontSize: '1.2rem',
   },
   upload: {
      margin: '2rem .5rem .5rem',
   },
   error: {
      marginTop: theme.spacing.unit * 2,
   },
   errorIcon: {
      marginRight: '0.3rem',
      verticalAlign: 'middle',
   },
   rightIcon: {
      marginLeft: '0.3rem',
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
   input: {
      display: 'none',
   },
   filename: {
      marginLeft: '10px',
   },
});

class EditMedia extends Component {
   constructor({ match }) {
      super();
      this.state = {
         media: {
            title: '',
            description: '',
            genre: '',
         },
         redirect: false,
         error: '',
      };
      this.mediaId = match.params.mediaId;
   }

   componentDidMount = () => {
      read({
         mediaId: this.mediaId,
      }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ media: data });
      });
   };

   handleChange = name => (event) => {
      const updatedMedia = this.state.media;
      updatedMedia[name] = event.target.value;
      this.setState({ [name]: updatedMedia });
   };

   clickSubmit = () => {
      const { media } = this.state;
      const jwt = auth.isAuthenticated();
      update(
         {
            mediaId: media._id,
         },
         {
            t: jwt.token,
         },
         media,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            media: data,
            redirect: true,
            error: '',
         });
      });
   };

   render() {
      const { error, media, redirect } = this.state;
      const { classes } = this.props;

      if (redirect) {
         return <Redirect to={`/media/${media._id}`} />;
      }

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="h5" component="h1" className={classes.title}>
                  Edit Video Details
               </Typography>
               <TextField
                  id="title"
                  className={classes.textField}
                  label="Title"
                  margin="normal"
                  value={media.title}
                  onChange={this.handleChange('title')}
               />
               <TextField
                  multiline
                  rows="2"
                  id="multiline-flexible"
                  className={classes.textField}
                  label="Description"
                  margin="normal"
                  value={media.description}
                  onChange={this.handleChange('description')}
               />
               <TextField
                  id="genre"
                  className={classes.textField}
                  label="Genre"
                  margin="normal"
                  value={media.genre}
                  onChange={this.handleChange('genre')}
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

EditMedia.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditMedia);
