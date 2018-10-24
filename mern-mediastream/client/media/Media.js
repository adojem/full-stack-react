import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import ReactPlayer from 'react-player';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import auth from '../auth/auth-helper';

const styles = theme => ({
   card: {
      padding: '1.25rem',
   },
   header: {
      padding: '0 1rem 1rem 0.75rem',
   },
   action: {
      display: 'inline-block',
      margin: '1.5rem 1.25rem 0 0',
      color: theme.palette.secondary.dark,
      fontSize: '1.125rem',
   },
   avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
   },
});

const Media = ({ classes, media }) => {
   const mediaUrl = media._id ? `/api/media/video/${media._id}` : null;

   return (
      <Card className={classes.card}>
         <CardHeader
            className={classes.header}
            title={media.title}
            subheader={media.genre}
            action={<span className={classes.action}>{`${media.views} views`}</span>}
         />
         <ReactPlayer
            controls
            url={mediaUrl}
            width="inherit"
            height="inherit"
            sytle={{ maxHeight: '500px' }}
            config={{
               attributes: {
                  style: {
                     height: '100%',
                     width: '100%',
                  },
               },
            }}
         />
         <List>
            <ListItem>
               <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                     {media.postedBy.name && media.postedBy.name[0]}
                  </Avatar>
               </ListItemAvatar>
               <ListItemText
                  primary={media.postedBy.name}
                  secondary={`Published on ${new Date(media.created).toDateString()}`}
               />
               {auth.isAuthenticated().user
                  && auth.isAuthenticated().user._id === media.postedBy._id && (
                  <ListItemSecondaryAction>
                     <Link to={`/media/edit/${media._id}`}>
                        <IconButton>
                           <EditIcon />
                        </IconButton>
                     </Link>
                  </ListItemSecondaryAction>
               )}
            </ListItem>
            <Divider />
            <ListItem>
               <ListItemText primary={media.description} />
            </ListItem>
         </List>
      </Card>
   );
};

Media.propTypes = {
   classes: PropTypes.object.isRequired,
   media: PropTypes.object,
};

export default withStyles(styles)(Media);
