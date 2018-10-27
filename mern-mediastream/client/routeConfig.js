import PlayMeida from './media/PlayMedia';
import { read } from './media/api-media';

const routes = [
   {
      path: '/media/:mediaId',
      component: PlayMeida,
      loadData: params => read(params),
   },
];

export default routes;
