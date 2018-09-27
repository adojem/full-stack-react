import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Divider, Typography } from '@material-ui/core';
import PostList from './PostList';

const styles = theme => ({
   card: {
      margin: 'auto',
      paddingTop: 0,
      paddingBottom: theme.spacing.unit * 3,
   },
   title: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit
         * 2}px`,
      color: theme.palette.openTitle,
   },
});

class Newsfeed extends Component {
   state = {
      posts: [],
   };

   addPost = (post) => {
      const { posts: updatedPosts } = this.state;
      updatedPosts.unshift(post);
      this.setState({ posts: updatedPosts });
   };

   removePost = (post) => {
      const { posts: updatedPosts } = this.state;
      const index = updatedPosts.indexOf(post);
      updatedPosts.splice(index, 1);
      this.setState({ posts: updatedPosts });
   };

   render() {
      const { classes } = this.props;
      const { posts } = this.state;

      return (
         <Card className={classes.card}>
            <Typography variant="title" className={classes.title}>
               Newsfeed
            </Typography>
            <Divider />
            <PostList removeUpdate={this.removePost} posts={posts} />
         </Card>
      );
   }
}

Newsfeed.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Newsfeed);
