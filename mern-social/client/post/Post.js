import React, { Component } from 'react';
import { Card, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
   card: {
      maxWidth: 600,
   },
});

class Post extends Component {
   render() {
      const { classes } = this.props;
      return <Card className={classes.card} />;
   }
}

export default withStyles(styles)(Post);
