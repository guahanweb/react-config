import React, { Component, createContext } from "react";

const Context = createContext({
  config: null,
  loading: false
});

const { Provider, Consumer } = Context;

class ConfigLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config || null,
      loading: props.loading || false
    };
  }

  componentDidMount() {
    if (this.state.config === null) {
      this.loadConfigs();
    }
  }

  loadConfigs() {
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      if (typeof this.props.fetch === 'function') {
        this.props.fetch().then(opts => this.handleConfigsLoaded(opts)).catch(reject);
      } else if (typeof this.props.uri === 'string') {
        fetch(this.props.uri).then(opts => this.handleConfigsLoaded(opts)).catch(reject);
      } else {
        // no configuration resolver specified
        console.warn("[CONFIG] No fetch method or uri provided: empty config loaded");
        this.handleConfigLoaded({});
      };
    });
  }

  handleConfigsLoaded(config) {
    this.setState({
      loading: false,
      config
    });
  }

  render() {
    if (typeof this.props.children === 'function') {
      // callback render pattern support
      return this.props.children(this.state);
    } else if (!!this.props.children) {
      // provider pattern support
      return <Provider value={this.state}>{this.props.children}</Provider>;
    } else {
      // sink support
      return null;
    }
  }
}

const withConfig = mapStateToProps => {
  return BaseComponent => props => {
    return (
      <Consumer>{state => {
        const config = mapStateToProps(state);
        return (
          <BaseComponent {...props} {...config} />
        )
      }}</Consumer>
    );
  };
};

export { withConfig, ConfigLoader }
