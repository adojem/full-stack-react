import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Media from './Media';
import RelatedMedia from './RelatedMedia';
import { listRelated, read } from './api-media';

const styles = () => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
});

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

   componentWillReceiveProps = ({ match }) => this.loadMedia(match.params.mediaId);

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
      const nextUrl = relatedMedia.length > 0 ? `/media/${relatedMedia[0]._id}` : '';
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            <Grid container spacing={24}>
               <Grid item xs={12} md={8}>
                  <Media media={media} nextUrl={nextUrl} />
               </Grid>
               {relatedMedia.length > 0 && (
                  <Grid item xs={12} md={4}>
                     <RelatedMedia media={relatedMedia} />
                  </Grid>
               )}
            </Grid>
         </div>
      );
   }
}

PlayMedia.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayMedia);
