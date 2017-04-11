import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app/App.react';
import Homepage from './homepage';
import Project from './projects/detail';
import Locale from './locales/detail';

export default function createRoutes() {
  const onChange = (prevState, nextState) => {
    if (window && window.dataLayer) {
      window.dataLayer.push({
        event: 'VirtualPageview',
        virtualPageURL: nextState.location.pathname,
        virtualPageTitle: nextState.location.pathname,
      });
    }
  };

  return (
    <Route component={App} onChange={onChange.bind(this)} path="/">
      <IndexRoute component={Homepage} />
      <Route component={Project} path="project/:id" />
      <Route component={Locale} path="locales/:id" />
    </Route>
  );
}
