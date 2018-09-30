import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
   AppBar, Tab, Tabs, Typography,
} from '@material-ui/core';
import FollowGrid from './FollowGrid';
import PostList from '../post/PostList';

class ProfileTabs extends Component {
   state = {
      tab: 0,
   };

   componentWillReceiveProps = () => {
      this.setState({ tab: 0 });
   };

   handleTabChange = (event, value) => {
      this.setState({ tab: value });
   };

   render() {
      const { tab } = this.state;
      const { user, posts, removePostUpdate } = this.props;

      return (
         <div>
            <AppBar position="static" color="default">
               <Tabs
                  value={tab}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
               >
                  <Tab label="Posts" />
                  <Tab label="Following" />
                  <Tab label="Followers" />
               </Tabs>
            </AppBar>
            {tab === 0 && (
               <TabContainer>
                  <PostList posts={posts} removeUpdate={removePostUpdate} />
               </TabContainer>
            )}
            {tab === 1 && (
               <TabContainer>
                  <FollowGrid people={user.following} />
               </TabContainer>
            )}
            {tab === 2 && (
               <TabContainer>
                  <FollowGrid people={user.followers} />
               </TabContainer>
            )}
         </div>
      );
   }
}

ProfileTabs.propTypes = {
   user: PropTypes.object.isRequired,
   removePostUpdate: PropTypes.func.isRequired,
   posts: PropTypes.array.isRequired,
};

const TabContainer = ({ children }) => (
   <Typography component="div" style={{ padding: 8 * 2 }}>
      {children}
   </Typography>
);

TabContainer.propTypes = {
   children: PropTypes.node.isRequired,
};

export default ProfileTabs;
