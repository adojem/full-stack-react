import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Search as SearchIcon } from '@material-ui/icons';
import { list } from './api-product';
import Products from './Products';

const styles = theme => ({
   card: {
      margin: 'auto',
      paddingTop: 10,
      backgroundColor: '#80808624',
      textAlign: 'center',
   },
   menu: {
      width: 200,
   },
   textField: {
      width: 150,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginBottom: '1.25rem',
      verticalAlign: 'bottom',
   },
   searchField: {
      width: 300,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginBottom: '1.25rem',
   },
   searchButton: {
      minWidth: '1.25rem',
      height: '1.875rem',
      marginBottom: '1.25rem',
      padding: '0 8px',
   },
});

class Search extends Component {
   state = {
      category: '',
      search: '',
      results: [],
      searched: false,
   };

   handleChange = name => event => this.setState({ [name]: event.target.value });

   search = () => {
      const { search, category } = this.state;
      if (search) {
         list({
            search: search || undefined,
            category,
         }).then((data) => {
            if (data.error) {
               return console.log(data.error);
            }
            return this.setState({ results: data, searched: true });
         });
      }
   };

   enterKey = (event) => {
      if (event.keyCode === 13) {
         event.preventDefault();
         this.search();
      }
   };

   render() {
      const { category, results, searched } = this.state;
      const { classes, categories } = this.props;

      return (
         <Card className={classes.card}>
            <TextField
               id="select-category"
               className={classes.textField}
               label="Select category"
               value={category}
               margin="normal"
               onChange={this.handleChange('category')}
               select
               SelectProps={{
                  MenuProps: {
                     className: classes.menu,
                  },
               }}
            >
               <MenuItem>All</MenuItem>
               {categories.map(option => (
                  <MenuItem key={option} value={option}>
                     {option}
                  </MenuItem>
               ))}
            </TextField>
            <TextField
               id="search"
               className={classes.searchField}
               label="Search products"
               type="search"
               margin="normal"
               onKeyDown={this.enterKey}
               onChange={this.handleChange('search')}
            />
            <Button
               variant="raised"
               color="primary"
               className={classes.searchButton}
               onClick={this.search}
            >
               <SearchIcon />
            </Button>
            <Divider />
            <Products products={results} searched={searched} />
         </Card>
      );
   }
}

Search.propTypes = {
   classes: PropTypes.object.isRequired,
   categories: PropTypes.array.isRequired,
};

export default withStyles(styles)(Search);
