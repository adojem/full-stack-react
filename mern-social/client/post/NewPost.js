import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
   Avatar,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   Icon,
   IconButton,
   TextField,
   Typography,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { withStyles } from '@material-ui/core/styles';
import { create } from './api-post';
import auth from '../auth/auth-helper';

const styles = theme => ({
   root: {
      backgroundColor: '#efefef',
      padding: `${theme.spacing.unit * 3}px 0px 1px`,
   },
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginBottom: theme.spacing.unit * 3,
      backgroundColor: 'rgba(65,150,136, .09)',
      boxShadow: 'none',
   },
   cardContent: {
      backgroundColor: 'white',
      paddintTop: 0,
      paddingBottom: 0,
   },
   cardHeader: {
      paddintTop: 8,
      paddingBottom: 8,
   },
   photoButton: {
      height: 30,
      marginBottom: 5,
   },
   input: {
      display: 'none',
   },
   textField: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      width: '90%',
   },
   filename: {
      margin: theme.spacing.unit * 2,
   },
});

class NewPost extends Component {
   state = {
      text: '',
      photo: '',
      error: '',
      user: {},
   };

   componentDidMount = () => {
      this.postData = new FormData();
      this.setState({ user: auth.isAuthenticated().user });
   };

   clickPost = () => {
      const jwt = auth.isAuthenticated();
      create(
         {
            userId: jwt.user._id,
         },
         {
            t: jwt.token,
         },
         this.postData,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         this.setState({ text: '', photo: '' });
         return this.props.addUpdate(data);
      });
   };

   handleChange = name => (event) => {
      const value = name === 'photo' ? event.target.files[0] : event.target.value;
      this.postData.set(name, value);
      this.setState({ [name]: value });
   };

   render() {
      const { classes } = this.props;
      const {
         error, photo, text, user,
      } = this.state;

      return (
         <div className={classes.root}>
            <Card className={classes.card}>
               <CardHeader
                  title={user.name}
                  avatar={
                     <Avatar src={`/api/users/photo/${user._id}`} className={classes.cardHeader} />
                  }
               />
               <CardContent className={classes.cardContent}>
                  <TextField
                     placeholder="Share your thoughts ..."
                     multiline
                     rows="3"
                     value={text}
                     onChange={this.handleChange('text')}
                     className={classes.textField}
                     margin="normal"
                  />
                  <label htmlFor="icon-button-file">
                     <input
                        accept="image/*"
                        onChange={this.handleChange('photo')}
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                     />
                     <IconButton color="secondary" className={classes.photoButton} component="span">
                        <PhotoCamera />
                     </IconButton>
                  </label>
                  <span className={classes.filename}>{photo ? photo.name : ''}</span>
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
                     disabled={text === ''}
                     onClick={this.clickPost}
                     className={classes.submit}
                  >
                     POST
                  </Button>
               </CardActions>
            </Card>
         </div>
      );
   }
}

NewPost.propTypes = {
   classes: PropTypes.object.isRequired,
   addUpdate: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewPost);
