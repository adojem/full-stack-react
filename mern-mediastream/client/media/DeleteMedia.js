import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import auth from '../auth/auth-helper';
import { remove } from './api-media';

class DeleteMedia extends Component {
   state = {
      redirect: false,
      open: false,
   };

   handleModal = () => this.setState(state => ({ open: !state.open }));

   deleteMedia = () => {
      const { mediaId } = this.props;
      const jwt = auth.isAuthenticated();
      remove({ mediaId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ redirect: true });
      });
   };

   render() {
      const { open, redirect } = this.state;
      const { mediaTitle } = this.props;

      if (redirect) {
         return <Redirect to="/" />;
      }

      return (
         <Fragment>
            <IconButton aria-label="Delete" color="secondary" onClick={this.handleModal}>
               <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={this.handleModal}>
               <DialogTitle>{`Delete ${mediaTitle}`}</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     {`Confirm to delete ${mediaTitle} from you account.`}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={this.handleModal}>
                     Cancel
                  </Button>
                  <Button
                     variant="contained"
                     color="secondary"
                     autoFocus
                     onClick={this.deleteMedia}
                  >
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </Fragment>
      );
   }
}

DeleteMedia.propTypes = {
   mediaId: PropTypes.string.isRequired,
   mediaTitle: PropTypes.string.isRequired,
};

export default DeleteMedia;
