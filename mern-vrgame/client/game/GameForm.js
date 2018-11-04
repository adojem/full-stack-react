import React, { Component } from 'react';
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

   render() {
      const { game, readError } = this.state;
      const { classes, errorMsg, gameId } = this.props;

      return (
         <Card className={classes.card}>
            <CardContent>
               <Typography className={classes.title} variant="h5" component="h2">
                  {gameId ? 'Edit ' : 'New '}
                  Game
               </Typography>
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
                  <Typography>
                     <Icon>error</Icon>
                     {errorMsg || readError}
                  </Typography>
               )}
            </CardContent>
            <CardActions>
               <Button className={classes.submit} variant="contained" color="primary">
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

export default withStyles(styles)(GameForm);
