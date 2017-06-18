import React from 'react';
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, RouterContext, match} from 'react-router';
import routes from './scripts/routes'; // Get shared routes from the front-end (used for isomorphic views)
import Helmet from 'react-helmet';

// Function returned to access app in scope
export default (app) => {

  // Router - currently just serves the index.ejs view with a react router port
  app
    .get('*', function(req, res, next) {

      // Get data for react-router
      const location = req.url;
      const history = createMemoryHistory(req.path);

      // Map current view state via react-router
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

          // Once all requests have succeeded render view
          Promise.all(promises).then((data) => {

            // Render react router class as string
            let serverRendering = renderToString(<RouterContext {...renderProps} />);

            // Setup react-helmet
            let head = Helmet.rewind();

            // Return react html as response
            res.status(200);
            res.render('index.ejs', {serverRendering, head, data});
          });
        }
      })
    });
};
