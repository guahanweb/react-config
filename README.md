# react-config

### Introduction

`react-config` is intended to provide an easy way to bootstrap async data
into your React application and make it available to any other components.
Current features include:

* Cusomizable `ConfigLoader` component
* Sink for `ConfigLoader` to connect to your Redux state
* Connector to provide loaded configs to any components

## Quick Start

### Install

```
npm install @guahanweb/react-config -D
```

### Import and Configure

```javascript
import { ConfigLoader } from '@guahanweb/react-config';
const config_url = 'https://my.domain.com/configs';

const App = () => (
  <ConfigLoader uri={config_url}>
    {
      config => (<pre className="configs">{JSON.stringify(config, null, 2)}</pre>)
    }
  </ConfigLoader>
);

render(<App />, document.getElementById('root'));
```

# Usage Guide

## `ConfigLoader` Component

The `ConfigLoader` component serves as a vehicle to manage async requests to load
configuration and surface the data through your application. There are several
props you can provide in order to customize the behavior of your loader.

* `uri`: When provided, the loader will fetch your configuration from this address.
* `fetch`: Instead of `uri`, you may provide a custom function to do your own data retrieval and manipulation. The `fetch` function is expected to return a promise that will be resolved with your data.

### Child nodes

There are two patterns supported by the loader.

* **Callback Render:** if your child node is a function, it will be executed as a callback render and passed the loaded configuration as a parameter.
* **Connected Children:** if you provide nested React components, they will be rendered as you defined them. It is expected you will connect any child components needing access to the configuration object.

### Example
```javascript
import { ConfigLoader } from '@guahanweb/react-config';

function myFetch() {
  return fetch('/my/configs.json', { method: 'POST' })
    .then(response => response.json());
}

// callback render pattern
const App = () => (
  <ConfigLoader fetch={myFetch}>{
    config => (<pre>{JSON.stringify(config, null, 2)}</pre>)
  }</ConfigLoader>
);
```

## `withConfig` Connector

By leveraging the `withConfig` connector, you can provide choice configuration elements as props to your component. This connector follows a similar `mapStateToProps` pattern to Redux.

### Example
```javascript
import { ConfigLoader, withConfig } from '@guahanweb/react-config';

const Check = (props) => {
  return pros.loading ? (
    <div className="loader">Loading...</div>
  ) : (
    <header><h1>{title}</h1></header>
  );
};

// connect your components
const ConfigCheck = withConfig(
  ({ loading }) => ({ loading })
)(Check);

// render
const App = () => (
  <ConfigLoader uri="/my/configs.json">
    <ConfigCheck />
  </ConfigLoader>
);
```
