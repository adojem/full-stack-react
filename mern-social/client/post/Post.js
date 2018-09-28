import React, { Component } from 'react';
import {
   Avatar, Card, CardHeader, CardContent, Divider, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
   card: {
      maxWidth: 600,
   },
});

class Post extends Component {
   componentDidMount = () => {};

   render() {
      const { classes, post } = this.props;
      return (
         <Card className={classes.card}>
            <CardHeader avatar={<Avatar src={`/api/users/photo/${post.postedBy._id}`} />} />
            <CardContent>
               <Typography>{post.text}</Typography>
            </CardContent>
         </Card>
      );
   }
}

export default withStyles(styles)(Post);
