import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Media from './Media';
import RelatedMedia from './RelatedMedia';
import { listRelated, read } from './api-media';

const styles = theme => ({});

class PlayMedia extends Component {
   constructor({ match }) {
      super();
      this.state = {
         media: { postedBy: {} },
         relatedMedia: [],
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
         this.setState({ media: data });
         listRelated({
            mediaId: data._id,
         }).then((data) => {
            if (data.error) {
               return console.log(data.error);
            }
            return this.setState({ relatedMedia: data });
         });
      });
   };

   render() {
      const { media, relatedMedia } = this.state;
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            <Media media={media} />
            <RelatedMedia media={relatedMedia} />
         </div>
      );
   }
}

PlayMedia.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayMedia);
