import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   Avatar,
   Card,
   CardHeader,
   CardContent,
   CardActions,
   Divider,
   IconButton,
   Typography,
} from '@material-ui/core';
import {
   Comment as CommentIcon,
   Delete as DeleteIcon,
   Favorite as FavoriteIcon,
   FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import auth from '../auth/auth-helper';
import { remove, like, unlike } from './api-post';
import Comment from './Comment';

const styles = theme => ({
   card: {
      maxWidth: 600,
      margin: 'auto',
      marginButtom: theme.spacing.unit * 3,
      backgroundColor: 'rgba(0,0,0, .06)',
   },
   cardHeader: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
   },
   text: {
      marin: theme.spacing.unit * 2,
   },
   button: {
      margin: theme.spacing.unit,
   },
});

class Post extends Component {
   state = {
      like: false,
      likes: 0,
      comments: [],
   };

   componentDidMount = () => {
      const { post } = this.props;
      this.setState({
         like: this.checkLike(post.likes),
         likes: post.likes.length,
         comments: post.comments,
      });
   };

   componentWillReceiveProps = ({ post }) => {
      this.setState({
         like: this.checkLike(post.likes),
         likes: post.likes.length,
         comments: post.comments,
      });
   };

   checkLike = (likes) => {
      const jwt = auth.isAuthenticated();
      const match = likes.indexOf(jwt.user._id) !== -1;
      return match;
   };

   like = () => {
      const { post } = this.props;
      const callApi = this.state.like ? unlike : like;
      const jwt = auth.isAuthenticated();
      callApi(
         {
            userId: jwt.user._id,
         },
         {
            t: jwt.token,
         },
         post._id,
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState(state => ({
            like: !state.like,
            likes: data.likes.length,
         }));
      });
   };

   updateComments = (comments) => {
      this.setState({ comments });
   };

   deletePost = () => {
      const { post, onRemove } = this.props;
      const jwt = auth.isAuthenticated();
      remove(
         {
            postId: post._id,
         },
         {
            t: jwt.token,
         },
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return onRemove(post);
      });
   };

   render() {
      const { classes, post } = this.props;
      const { comments, like, likes } = this.state;

      return (
         <Card className={classes.card}>
            <CardHeader
               avatar={<Avatar src={`/api/users/photo/${post.postedBy._id}`} />}
               action={
                  post.postedBy._id === auth.isAuthenticated().user._id && (
                     <IconButton onClick={this.deletePost}>
                        <DeleteIcon />
                     </IconButton>
                  )
               }
               title={<Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>}
               subheader={new Date(post.created).toDateString()}
               className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
               <Typography component="p" className={classes.text}>
                  {post.text}
               </Typography>
               {post.photo && (
                  <div className={classes.photo}>
                     <img src={`/api/posts/photo/${post._id}`} alt="" />
                  </div>
               )}
            </CardContent>
            <CardActions>
               {like ? (
                  <IconButton
                     onClick={this.like}
                     className={classes.button}
                     aria-label="Like"
                     color="secondary"
                  >
                     <FavoriteIcon />
                  </IconButton>
               ) : (
                  <IconButton
                     onClick={this.like}
                     className={classes.button}
                     aria-label="Unlike"
                     color="secondary"
                  >
                     <FavoriteBorderIcon />
                  </IconButton>
               )}
               <span>{likes}</span>
               <IconButton className={classes.button} aria-label="Comment" color="secondary">
                  <CommentIcon />
               </IconButton>
               <span>{comments.length}</span>
            </CardActions>
            <Divider />
            <Comment postId={post._id} comments={comments} updateComments={this.updateComments} />
         </Card>
      );
   }
}

Post.propTypes = {
   classes: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   onRemove: PropTypes.func.isRequired,
};

export default withStyles(styles)(Post);
