import config from '../../config/config';

const read = params =>
   fetch(`${config.serverUrl}/api/media/${params.mediaId}`, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const create = (params, credentials, media) =>
   fetch(`/api/media/new/${params.userId}`, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: media,
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const update = (params, credentials, media) =>
   fetch(`/api/media/${params.mediaId}`, {
      method: 'PUT',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(media),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const remove = (params, credentials) =>
   fetch(`/api/media/${params.mediaId}`, {
      method: 'DELETE',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listPopular = () =>
   fetch('/api/media/popular', {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listRelated = params =>
   fetch(`/api/media/related/${params.mediaId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listByUser = params =>
   fetch(`/api/media/by/${params.userId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

export {
   create, listByUser, listPopular, listRelated, read, remove, update,
};
