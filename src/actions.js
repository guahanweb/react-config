const loadConfigs = () => ({ type: 'config:LOAD' });

const configsLoaded = config => ({
  type: 'config:LOADED',
  loading: false,
  config
});

export { loadConfigs, configsLoaded };
