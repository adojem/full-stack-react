import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { read } from './api-media';
import Media from './Media';

const styles = theme => ({});

class PlayMedia extends Component {
   constructor({ match }) {
      super();
      this.state = {
         media: { postedBy: {} },
      };
      this.match = match;
   }

   componentDidMount = () => {
      this.loadMedia(this.match.params.mediaId);
   };

   loadMedia = (mediaId) => {
      read({ mediaId }).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({ media: data });
      });
   };

   render() {
      const { media } = this.state;
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            <Media media={media} />
         </div>
      );
   }
}

PlayMedia.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayMedia);
