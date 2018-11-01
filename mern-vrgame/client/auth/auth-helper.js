const auth = {
   isAuthenticated() {
      if (typeof window === 'undefined') {
         return false;
      }
      if (sessionStorage.getItem('jwt')) {
         return JSON.parse(sessionStorage.getItem('jwt'));
      }
      return false;
   },
   authenticate(jwt, cb) {
      if (typeof window !== 'undefined') {
         sessionStorage.setItem('jwt', JSON.stringify(jwt));
      }
      cb();
   },
};

export default auth;
