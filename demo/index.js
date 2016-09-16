import React from 'react';
import ReactDOM from 'react-dom';

function init() {
  const Presentation = require('./presentation').default;
  ReactDOM.render(
    <Presentation />,
    document.getElementById('root')
  );
}

init();

if (module.hot) module.hot.accept('./presentation', init);
