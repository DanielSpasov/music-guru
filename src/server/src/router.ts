import { Router, Response } from 'express';
import { readdirSync } from 'fs';

import { IRoute } from './Interfaces';

const router = Router();

let totalRoutes: number = 0;
readdirSync(`${__dirname}/Routes`).forEach((dir: string) => {
  let routeCounter: number = 0;
  readdirSync(`${__dirname}/Routes/${dir}`)
    .filter((file: string) => file.endsWith('.ts'))
    .forEach((endpoint: string) => {
      const path = `${__dirname}/Routes/${dir}/${endpoint}`;
      const { Route }: { Route: IRoute } = require(path);
      if (!Route) return;
      router[Route.type](`/api/v1/${Route.path}`, Route.run);
      routeCounter++;
    });
  const routes = routeCounter === 1 ? 'route' : 'routes';
  console.log(`${routeCounter} '${dir}' ${routes} loaded.`);
  totalRoutes += routeCounter;
});
console.log(`${totalRoutes} in total.`);

router.get('*', (_, res: Response) =>
  res.status(404).json({ message: 'Page not found' })
);

export default router;
