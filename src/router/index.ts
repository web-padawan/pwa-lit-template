/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from '@vaadin/router';
import { until } from 'lit-html/directives/until';

import { routes } from './routes';

let routerInstance: Router;

export const initializeRouter = (outlet: HTMLElement) => {
  if (!routerInstance && outlet) {
    routerInstance = new Router(outlet);

    routerInstance.setRoutes([
      // Redirect to URL without trailing slash
      {
        path: '(.*)/',
        action: (context, commands) => {
          const newPath = context.pathname.slice(0, -1);
          return commands.redirect(newPath);
        }
      },
      ...routes
    ]);
  }

  return routerInstance;
};

export const waitForRouter = (): Promise<Router> => {
  return new Promise((resolve) => {
    if (routerInstance) {
      resolve(routerInstance);
    } else {
      setTimeout(() => waitForRouter(), 100);
    }
  });
};

export const urlForName = (name: string) => {
  const url = waitForRouter().then((router) => {
    console.log(router);

    return router.urlForName(name);
  });

  return until(url, '');
};
