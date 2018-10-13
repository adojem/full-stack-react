const cart = {
   addItem(item, cb) {
      let cart = [];
      if (typeof window !== 'undefined') {
         if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
         }
         cart.push({
            product: item,
            quantity: 1,
            shop: item.shop._id,
         });
         localStorage.setItem('cart', JSON.stringify(cart));
         cb();
      }
   },
};

export default cart;
