const signin = user => fetch('/api/signin/', {
   method: 'POST',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
   credentials: 'include',
   body: JSON.stringify(user),
})
   .then(response => response.json())
   .catch(err => console.log(err));

const signout = () => fetch('/api/signout', {
   method: 'GET',
})
   .then(response => response.json())
   .catch(err => console.log(err));

export default { signin, signout };
