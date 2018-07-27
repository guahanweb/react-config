import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loadConfigs, configsLoaded } from '../actions';

import { ConfigLoader } from './loader';

// this only synchronizes data with redux.
// It fires off "loading" action on mount
// It fires off "loaded" action on complete
class ConfigSink extends Component {
  componentDidMount() {
    this.props.loadConfigs();
  }

  componentDidUpdate(prevProps) {
    const { config } = this.props;
    const { config: oldConfig } = prevProps;

    // if we updated but config is the same, bail
    if (config === oldConfig) return;

    this.handleConfigsLoaded(config);
  }

  shouldComponentUpdate() {
    return true;
  }

  handleConfigsLoaded(config) {
    this.props.configsLoaded(config);
  }

  render() {
    return null;
  }
}

const ConnectedConfigSink = connect(
  null,
  {
    loadConfigs,
    configsLoaded
  }
)(ConfigSink);

const Wrapper = props => (
  <ConfigLoader {...props}>
    {state => <ConnectedConfigSink config={state.config} />}
  </ConfigLoader>
);

export default Wrapper;
