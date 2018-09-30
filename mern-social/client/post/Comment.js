import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import auth from '../auth/auth-helper';
import { comment } from './api-post';

const styles = theme => ({
   cardHeader: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
   },
   smallAvatar: {
      width: 25,
      height: 25,
   },
   commentField: {
      width: '96%',
   },
});

class Comment extends Component {
   state = {
      text: '',
   };

   handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
   };

   addComment = (event) => {
      const { postId, updateComments } = this.props;
      const { text } = this.state;

      if (event.keyCode === 13 && event.target.value) {
         event.preventDefault();
         const jwt = auth.isAuthenticated();
         comment(
            {
               userId: jwt.user._id,
            },
            {
               t: jwt.token,
            },
            postId,
            { text },
         ).then((data) => {
            if (data.error) {
               return console.log(data.error);
            }
            this.setState({ text: '' });
            return updateComments(data.comments);
         });
      }
   };

   render() {
      const { text } = this.state;
      const { classes } = this.props;

      return (
         <CardHeader
            avatar={(
               <Avatar
                  className={classes.smallAvatar}
                  src={`/api/users/photo/${auth.isAuthenticated().user._id}`}
               />
            )}
            title={(
               <TextField
                  multiline
                  value={text}
                  onChange={this.handleChange('text')}
                  placeholder="Write something ..."
                  className={classes.commentField}
                  margin="normal"
               />
            )}
            className={classes.cardHeader}
         />
      );
   }
}

Comment.propTypes = {
   classes: PropTypes.object.isRequired,
   postId: PropTypes.string.isRequired,
   comments: PropTypes.array.isRequired,
   updateComments: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comment);
