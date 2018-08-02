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