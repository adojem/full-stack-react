const read = params =>
   fetch(`/api/games/${params.gameId}`, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const list = () =>
   fetch('/api/games', { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const listByMaker = params =>
   fetch(`/api/games/by/${params.userId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
      },
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

const update = (params, credentials, game) =>
   fetch(`/api/games/${params.gameId}`, {
      method: 'PUT',
      headers: {
         Accept: 'application/json',
         'Content-type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(game),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const remove = (params, credentials) =>
   fetch(`/api/games/${params.gameId}`, {
      method: 'DELETE',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
   })
      .then(resposne => resposne.json())
      .catch(err => console.log(err));

export {
   create, list, listByMaker, read, remove, update,
};
