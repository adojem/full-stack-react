import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Suggestions from '../product/Suggestions';
import { listLatest, listCategories } from '../product/api-product';
import Search from '../product/Search';
import Categories from '../product/Categories';

const styles = () => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
});

class Home extends Component {
   state = {
      suggestionTitle: 'Latest Products',
      suggestions: [],
      categories: [],
   };

   componentDidMount = () => {
      listLatest().then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ suggestions: data });
      });
      listCategories().then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ categories: data });
      });
   };

   render() {
      const { classes } = this.props;
      const { categories, suggestions, suggestionTitle } = this.state;

      return (
         <div className={classes.root}>
            <Grid container spacing={24}>
               <Grid item xs={8} sm={8}>
                  <Search categories={categories} />
                  <Categories categories={categories} />
               </Grid>
               <Grid item xs={4} sm={4}>
                  <Suggestions products={suggestions} title={suggestionTitle} />
               </Grid>
            </Grid>
         </div>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
