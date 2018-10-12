import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { list } from './api-product';
import Products from './Products';

const styles = theme => ({
   card: {
      margin: 'auto',
      marginTop: 20,
   },
   title: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit
         * 2}px`,
      backgroundColor: '#80808024',
      color: theme.palette.openTitle,
   },
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      background: theme.palette.background.paper,
   },
   gridList: {
      flexWrap: 'nowrap',
      width: '100%',
      transform: 'translateZ(0)',
   },
   tileTitle: {
      margin: '0 4px 0 0',
      textAlign: 'center',
      lineHeight: 2.5,
      verticalAlign: 'middle',
      fontSize: '1.3rem',
   },
   link: {
      position: 'absolute',
      top: '53%',
      left: '50%',
      color: '#4d6538',
      textShadow: '0 2px 12px #fff',
      cursor: 'pointer',
      transform: 'translate(-50%, -50%)',
   },
   icon: {
      color: '#738272',
      fontSize: '0.9rem',
   },
});

class Categories extends Component {
   state = {
      products: [],
      selected: '',
   };

   componentWillReceiveProps = ({ categories }) => {
      this.setState({ selected: categories[0] });
      list({ categories: categories[0] }).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ products: data });
      });
   };

   listByCategory = category => () => {
      const { categories } = this.props;
      this.setState({ selected: category });
      list({ category: categories[0] }).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ products: data });
      });
   };

   render() {
      const { products, selected } = this.state;
      const { classes, categories } = this.props;

      return (
         <Card className={classes.card}>
            <Typography variant="title" className={classes.title}>
               Explore by category
            </Typography>
            <div className={classes.root}>
               <GridList className={classes.gridList} cols={4}>
                  {categories.map((tile, i) => (
                     <GridListTile
                        key={i}
                        className={classes.tileTitle}
                        style={{
                           height: '64px',
                           backgroundColor:
                              selected == tile ? 'rgba(95,139,137, .56)' : 'rgba(95,124,139, .32)',
                        }}
                     >
                        <span className={classes.link} onClick={this.listByCategory(tile)}>
                           {tile}
                           <Icon className={classes.icon}>
                              {selected === tile && 'arrow_drop_down'}
                           </Icon>
                        </span>
                     </GridListTile>
                  ))}
               </GridList>
            </div>
            <Divider />
            <Products products={products} searched={false} />
         </Card>
      );
   }
}

Categories.propTypes = {
   classes: PropTypes.object.isRequired,
   categories: PropTypes.array.isRequired,
};

export default withStyles(styles)(Categories);
