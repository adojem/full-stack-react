import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { follow, unfollow } from './api-user';

class FollowProfileButton extends Component {
   followClick = () => {
      const { onButtonClick } = this.props;
      onButtonClick(follow);
   };

   unfollowClick = () => {
      const { onButtonClick } = this.props;
      onButtonClick(unfollow);
   };

   render() {
      const { following } = this.props;

      return (
         <div>
            {following ? (
               <Button variant="raised" color="secondary" onClick={this.unfollowClick}>
                  Unfollow
               </Button>
            ) : (
               <Button variant="raised" color="primary" onClick={this.followClick}>
                  Follow
               </Button>
            )}
         </div>
      );
   }
}

FollowProfileButton.propTypes = {
   following: PropTypes.bool.isRequired,
   onButtonClick: PropTypes.func.isRequired,
};

export default FollowProfileButton;
