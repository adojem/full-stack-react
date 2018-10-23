import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MediaList from '../media/MediaList';
import { listPopular } from '../media/api-media';

const styles = theme => ({
   card: {
      margin: `${theme.spacing.unit * 5}px 30px`,
   },
   title: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 0px`,
      color: theme.palette.text.secondary,
      fontSize: '1rem',
   },
   media: {
      minHeight: 330,
   },
});

class Home extends Component {
   state = {
      media: [],
   };

   componentDidMount = () => {
      listPopular().then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ media: data });
      });
   };

   render() {
      const { media } = this.state;
      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <Typography variant="h5" component="h2" className={classes.title}>
               Popular videos
            </Typography>
            <MediaList className={classes.media} media={media} />
         </Card>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
