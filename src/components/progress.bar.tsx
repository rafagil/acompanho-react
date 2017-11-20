import * as React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import axios from 'axios';

interface ProgressBarState {
  loading: boolean;
}

export default class ProgressBar extends React.Component<{}, ProgressBarState> {

  state = {
    loading: false
  }

  startLoading(config) {
    this.setState({ loading: true });
    return config;
  }

  handleError(error) {
    this.setState({ loading: false });
    return Promise.reject(error);
  }

  finishLoading(config) {
    this.setState({loading:false});
    return config;
  }

  componentDidMount() {
    axios.interceptors.request.use(this.startLoading.bind(this), this.handleError.bind(this));
    axios.interceptors.response.use(this.finishLoading.bind(this), this.handleError.bind(this));
  }

  render() {
    if (this.state.loading) {
      return <LinearProgress className="progressBar" />;
    }
    return null;
  }
}