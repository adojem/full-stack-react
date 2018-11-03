const list = () =>
   fetch('/api/games', { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const listByMaker = params =>
   fetch(`/api/games/by/${params.userId}`, {
      method: 'GET',
      headers: 'application/json',
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const create = (params, credentials, game) =>
   fetch(`/api/games/by/${params.userId}`, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(game),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

export { create, list, listByMaker };
