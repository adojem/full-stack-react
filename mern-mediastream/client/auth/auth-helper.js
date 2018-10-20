const auth = {
   authenticate(jwt, cb) {
      if (typeof window !== 'undefined') {
         sessionStorage.setItem('jwt', JSON.stringify(jwt));
         cb();
      }
   },
   signout(cb) {
      if (typeof window !== 'undefined') {
         sessionStorage.removeItem('jwt');
      }
      cb();
   },
};

export default auth;
