import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
   card: {
      marginRight: '12px',
      marginLeft: '12px',
      padding: '10px',
   },
   textField: {
      display: 'block',
      width: 300,
      marginLeft: 'auto',
      marginBottom: theme.spacing.unit,
      marginRight: 'auto',
   },
   numberField: {
      width: 70,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
   },
});

class VRObjectForm extends Component {
   state = {
      objUrl: '',
      mtlUrl: '',
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      color: 'white',
   };

   handleChange = name => (event) => {
      const { handleUpdate, index, type } = this.props;
      this.setState({ [name]: event.target.value });
      handleUpdate(index, type, name, event.target.value);
   };

   render() {
      const {
         color,
         objUrl,
         mtlUrl,
         rotateX,
         rotateY,
         rotateZ,
         translateX,
         scale,
         translateY,
         translateZ,
      } = this.state;
      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <TextField
               id="obj"
               className={classes.textField}
               label=".obj url"
               value={objUrl}
               margin="normal"
               fullWidth
               onChange={this.handleChange('objUrl')}
            />
            <TextField
               id="mtl"
               className={classes.textField}
               label=".mtl url"
               value={mtlUrl}
               margin="normal"
               fullWidth
               onChange={this.handleChange('mtlUrl')}
            />
            <TextField
               id="translateX"
               className={classes.numberField}
               label="TranslateX"
               value={translateX}
               margin="normal"
               onChange={this.handleChange('translateX')}
            />
            <TextField
               id="translateY"
               className={classes.numberField}
               label="TranslateY"
               value={translateY}
               margin="normal"
               onChange={this.handleChange('translateY')}
            />
            <TextField
               id="translateZ"
               className={classes.numberField}
               label="TranslateZ"
               value={translateZ}
               margin="normal"
               onChange={this.handleChange('translateZ')}
            />
            <TextField
               id="rotateX"
               className={classes.numberField}
               label="RotateX"
               value={rotateX}
               margin="normal"
               onChange={this.handleChange('rotateX')}
            />
            <TextField
               id="rotateY"
               className={classes.numberField}
               label="RotateY"
               value={rotateY}
               margin="normal"
               onChange={this.handleChange('rotateY')}
            />
            <TextField
               id="rotateZ"
               className={classes.numberField}
               label="RotateZ"
               value={rotateZ}
               margin="normal"
               onChange={this.handleChange('rotateZ')}
            />
            <TextField
               id="scale"
               className={classes.numberField}
               label="Scale"
               value={scale}
               margin="normal"
               onChange={this.handleChange('scale')}
            />
            <TextField
               id="color"
               className={classes.numberField}
               label="Color"
               value={color}
               margin="normal"
               onChange={this.handleChange('color')}
            />
            <Button>
               <Icon style={{ marginRight: '5px' }}>cancel</Icon>
               Delete
            </Button>
         </Card>
      );
   }
}

VRObjectForm.propTypes = {
   classes: PropTypes.object.isRequired,
   index: PropTypes.number.isRequired,
   vrObject: PropTypes.object.isRequired,
   handleUpdate: PropTypes.func.isRequired,
};

export default withStyles(styles)(VRObjectForm);
