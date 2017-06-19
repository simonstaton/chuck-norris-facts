import React from 'react';
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, RouterContext, match} from 'react-router';
import routes from './scripts/routes';
import Helmet from 'react-helmet';

export default (app) => {

  app
    .get('*', function(req, res, next) {

      const location = req.url;
      const history = createMemoryHistory(req.path);

      match({ routes, location, history }, (error, redirectLocation, renderProps) => {

        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (!renderProps) {
          res.status(404).send('Not found');
        } else {

          const promises = renderProps.components
              .filter(component => component.request)
              .map(component => component.request(renderProps));

          Promise.all(promises).then((data) => {

            let serverRendering = renderToString(<RouterContext {...renderProps} />);

            let head = Helmet.rewind();

            res.status(200);
            res.render('index.ejs', {serverRendering, head, data});
  
          });
        }
      })
    });
};
