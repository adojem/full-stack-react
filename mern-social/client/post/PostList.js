import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class PostList extends Component {
   render() {
      const { posts, removeUpdate } = this.props;

      return (
         <div>
            {posts.map((item, i) => (
               <Post post={item} key={i} onRemove={removeUpdate} />
            ))}
         </div>
      );
   }
}

PostList.propTypes = {
   posts: PropTypes.array.isRequired,
   removeUpdate: PropTypes.func.isRequired,
};

export default PostList;
