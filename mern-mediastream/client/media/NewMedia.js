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
import CloudUpload from '@material-ui/icons/CloudUpload';
import auth from '../auth/auth-helper';
import { create } from './api-media';

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

class NewMedia extends Component {
   state = {
      title: '',
      video: '',
      description: '',
      genre: '',
      redirect: false,
      error: '',
      mediaId: '',
   };

   componentDidMount = () => {
      this.mediaData = new FormData();
   };

   handleChange = name => (event) => {
      const value = name === 'video' ? event.target.files[0] : event.target.value;
      this.mediaData.set(name, value);
      this.setState({ [name]: value });
   };

   clickSubmit = () => {
      const jwt = auth.isAuthenticated();
      create(
         {
            userId: jwt.user._id,
         },
         {
            t: jwt.token,
         },
         this.mediaData,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            mediaId: data._id,
            redirect: true,
         });
      });
   };

   render() {
      const {
         description, error, genre, mediaId, redirect, title, video,
      } = this.state;
      const { classes } = this.props;

      if (redirect) {
         return <Redirect to={`/media/${mediaId}`} />;
      }

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography variant="h5" component="h1" className={classes.title}>
                  New Video
               </Typography>
               <div className={classes.upload}>
                  <label htmlFor="icon-button-file">
                     <input
                        type="file"
                        accept="video/*"
                        id="icon-button-file"
                        className={classes.input}
                        onChange={this.handleChange('video')}
                     />
                     <Button variant="contained" color="secondary" component="span">
                        Upload
                        <CloudUpload className={classes.rightIcon} />
                     </Button>
                  </label>
                  <span className={classes.filename}>{video ? video.name : ''}</span>
               </div>
               <TextField
                  id="title"
                  className={classes.textField}
                  label="Title"
                  margin="normal"
                  value={title}
                  onChange={this.handleChange('title')}
               />
               <TextField
                  multiline
                  rows="2"
                  id="multiline-flexible"
                  className={classes.textField}
                  label="Description"
                  margin="normal"
                  value={description}
                  onChange={this.handleChange('description')}
               />
               <TextField
                  id="genre"
                  className={classes.textField}
                  label="Genre"
                  margin="normal"
                  value={genre}
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

NewMedia.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewMedia);
