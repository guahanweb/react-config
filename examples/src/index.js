import React from 'react';
import { render } from 'react-dom';
import '../sass/main.scss';

import { withConfig, ConfigLoader } from '../../src';

function fetchConfigs() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve({
        foo: 'bar',
        value: 10
      });
    }, 2000);
  });
}

const Loader = () => (
  <div className="loader">
    <div className="wrapper">
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  </div>
);

const ConnectedConfigTest = withConfig(state => state)(props => (
  <div className="config-test">
    <pre className="dump">{JSON.stringify(props, null, 2)}</pre>
  </div>
));

const App = () => (
  <ConfigLoader fetch={fetchConfigs}>{config => (
    <div className="app-wrapper">
      <header>
        <h1>React Config Loader</h1>
      </header>
      {config.loading ? <Loader/> : (
        <div className="configs">
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
      )}
    </div>
  )}</ConfigLoader>
);

render(<App />, document.getElementById('root'));
