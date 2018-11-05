import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VRObjectForm from './VRObjectForm';
import { read } from './api-game';

const styles = theme => ({
   card: {
      maxWidth: 1000,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: 'center',
   },
   title: {
      marginTop: theme.spacing.uint * 2,
      color: theme.palette.openTitle,
      fontSize: '1.125rem',
   },
   imgPreview: {
      width: '300px',
   },
   textField: {
      display: 'block',
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   spacingTop: {
      marginTop: '10px',
   },
   heading: {
      width: '130px',
      padding: '10px',
   },
   objectDetails: {
      overflow: 'auto',
   },
   error: {
      marginTop: theme.spacing.unit * 2,
   },
   errorIcon: {
      marginRight: '0.3rem',
      verticalAlign: 'middle',
   },
   submit: {
      margin: 'auto',
      marginBottom: '10px',
   },
});

class GameForm extends Component {
   state = {
      game: {
         name: '',
         clue: '',
         world: '',
         answerObjects: [],
         wrongObjects: [],
         redirect: false,
         readError: 'error test',
      },
   };

   componentDidMount = () => {
      const { gameId } = this.props;

      if (gameId) {
         read({ gameId }).then((data) => {
            if (data.error) {
               return this.setState({ readError: data.error });
            }
            return this.setState({ game: data });
         });
      }
   };

   handleChange = name => (event) => {
      const { game: newGame } = this.state;
      newGame[name] = event.target.value;
      this.setState({ game: newGame });
   };

   addObject = name => () => {
      const { game: newGame } = this.state;
      newGame[name].push({});
      this.setState({ game: newGame });
   };

   handleObjectChange = (index, type, name, val) => {
      const { game: newGame } = this.state;
      newGame[type][index][name] = val;
      this.setState({ game: newGame });
   };

   removeObject = (type, index) => (event) => {
      const { game: newGame } = this.state;
      newGame[type].splice(index, 1);
      this.setState({ game: newGame });
   };

   render() {
      const { game, readError } = this.state;
      const {
         classes, errorMsg, gameId, onSubmit,
      } = this.props;

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography className={classes.title} variant="h5" component="h2">
                  {gameId ? 'Edit ' : 'New '}
                  Game
               </Typography>
               <img className={classes.imgPreview} src={game.world} alt={game.name} />
               <TextField
                  id="world"
                  className={classes.textField}
                  label="Game World equirectangular Image (URL)"
                  margin="normal"
                  fullWidth
                  value={game.world}
                  onChange={this.handleChange('world')}
               />
               <TextField
                  id="name"
                  className={classes.textField}
                  label="Name"
                  margin="normal"
                  fullWidth
                  value={game.name}
                  onChange={this.handleChange('name')}
               />
               <TextField
                  id="multiline-flexible"
                  className={classes.textField}
                  label="Clue Text"
                  margin="normal"
                  multiline
                  rows="2"
                  fullWidth
                  value={game.clue}
                  onChange={this.handleChange('clue')}
               />
               <Divider className={classes.spacingTop} />
               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>VR Objects to collect</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.objectDetails}>
                     {game.answerObjects.map((item, i) => (
                        <div key={i}>
                           <VRObjectForm
                              index={i}
                              type="answerObjects"
                              vrObject={item}
                              handleUpdate={this.handleObjectChange}
                              removeObject={this.removeObject}
                           />
                        </div>
                     ))}
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addObject('answerObjects')}
                     >
                        <AddBoxIcon color="secondary" style={{ marginRight: '8px' }} />
                        Add Object
                     </Button>
                  </ExpansionPanelDetails>
               </ExpansionPanel>
               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>Other VR objects</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.objectDetails}>
                     {game.wrongObjects.map((item, i) => (
                        <div key={i}>
                           <VRObjectForm
                              index={i}
                              type="wrongObjects"
                              vrObject={item}
                              handleUpdate={this.handleObjectChange}
                              removeObject={this.removeObject}
                           />
                        </div>
                     ))}
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addObject('wrongObjects')}
                     >
                        <AddBoxIcon color="secondary" style={{ marginRight: '8px' }} />
                        Add Object
                     </Button>
                  </ExpansionPanelDetails>
               </ExpansionPanel>
               {(errorMsg || readError) && (
                  <Typography className={classes.error} component="p" color="error">
                     <Icon className={classes.errorIcon}>error</Icon>
                     {errorMsg || readError}
                  </Typography>
               )}
            </CardContent>
            <CardActions>
               <Button
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                  onClick={onSubmit(game)}
               >
                  Submit
               </Button>
               <Link to="/" className={classes.submit}>
                  <Button variant="contained">Cancel</Button>
               </Link>
            </CardActions>
         </Card>
      );
   }
}

GameForm.propTypes = {
   classes: PropTypes.object.isRequired,
   gameId: PropTypes.string
}

export default withStyles(styles)(GameForm);
