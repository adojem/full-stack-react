import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import withStyles from '@material-ui/core/styles/withStyles';
import auth from '../auth/auth-helper';
import { comment, uncomment } from './api-post';

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
   commentText: {
      backgroundColor: 'white',
      padding: theme.spacing.unit,
      margin: `2px ${theme.spacing.unit * 2}px 2px 2px`,
   },
   commentDate: {
      display: 'block',
      color: 'gray',
      fontSize: '0.8em',
   },
   commentDelete: {
      fontSize: '1.6em',
      verticalAlign: 'middle',
      cursor: 'pointer',
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

   deleteComment = comment => () => {
      const { postId, updateComments } = this.props;
      const jwt = auth.isAuthenticated();
      uncomment(
         {
            userId: jwt.user._id,
         },
         {
            t: jwt.token,
         },
         postId,
         comment,
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return updateComments(data.comments);
      });
   };

   render() {
      const { text } = this.state;
      const { classes, comments } = this.props;
      const commentBody = item => (
         <p className={classes.commentText}>
            <Link to={`/user/${item.postedBy._id}`}>{item.postedBy.name}</Link>
            <br />
            {item.text}
            <span className={classes.commentDate}>
               {new Date(item.created).toDateString()}
               {' '}
|
               {auth.isAuthenticated().user._id === item.postedBy._id && (
                  <Icon onClick={this.deleteComment(item)} className={classes.commentDelete}>delete</Icon>
               )}
            </span>
         </p>
      );

      return (
         <div>
            <CardHeader
               avatar={(
                  <Avatar
                     className={classes.smallAvatar}
                     src={`/api/users/photo/${auth.isAuthenticated().user._id}`}
                  />
               )}
               title={(
                  <TextField
                     onKeyDown={this.addComment}
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
            {comments.map(item => (
               <CardHeader
                  avatar={(
                     <Avatar
                        className={classes.smallAvatar}
                        src={`/api/users/photo/${item.postedBy._id}`}
                     />
                  )}
                  title={commentBody(item)}
                  className={classes.cardHeader}
                  key={item._id}
               />
            ))}
         </div>
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
