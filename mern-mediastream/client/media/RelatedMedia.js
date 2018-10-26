import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';

const styles = theme => ({
   root: theme.mixins.gutters({
      backgroundColor: '#80808024',
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle,
      fontSize: '1.1rem',
   },
   card: {
      display: 'inline-flex',
      width: '100%',
   },
   details: {
      display: 'inline-block',
      width: '100%',
   },
   content: {
      flex: '1 0 auto',
      padding: '1rem 0.5rem 0',
   },
   mediaTitle: {
      width: '130px',
      marginBottom: '5px',
      fontSize: '1.1rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
   },
   subheading: {
      color: 'rgba(88,114,128, 0.67)',
   },
   date: {
      color: 'rgba(0,0,0, 0.4)',
   },
   controls: {
      marginTop: '.5rem',
   },
   views: {
      display: 'inline',
      paddingLeft: '8px',
      color: theme.palette.text.secondary,
      lineHeight: '3',
   },
});

const RelatedMedia = ({ classes, media }) => (
   <Paper className={classes.root} elevation={4} style={{ padding: '1rem' }}>
      <Typography className={classes.title} variant="h6">
         Up Next
      </Typography>
      {media.map(item => (
         <span key={item._id}>
            <Card className={classes.card}>
               <div
                  style={{
                     margin: '5px',
                     backgroundColor: 'black',
                  }}
               >
                  <Link to={`/media/${item._id}`}>
                     <ReactPlayer
                        url={`/api/media/video/${item._id}`}
                        width="160px"
                        height="140px"
                     />
                  </Link>
               </div>
               <div className={classes.details}>
                  <CardContent className={classes.content}>
                     <Link to={`/media/${item._id}`}>
                        <Typography
                           className={classes.mediaTitle}
                           variant="h6"
                           component="h3"
                           color="primary"
                        >
                           {item.title}
                        </Typography>
                     </Link>
                     <Typography className={classes.subheading} variant="subtitle1">
                        {item.genre}
                     </Typography>
                     <Typography className={classes.date} component="p">
                        {new Date(item.created).toDateString()}
                     </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                     <Typography
                        className={classes.views}
                        variant="subtitle1"
                        component="h3"
                        color="primary"
                     >
                        {`${item.views} views`}
                     </Typography>
                  </div>
               </div>
            </Card>
         </span>
      ))}
   </Paper>
);

RelatedMedia.propTypes = {
   classes: PropTypes.object.isRequired,
   media: PropTypes.array.isRequired,
};

export default withStyles(styles)(RelatedMedia);
