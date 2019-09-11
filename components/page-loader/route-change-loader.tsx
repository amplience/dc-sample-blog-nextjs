import { Component } from 'react';
import { Router } from 'next/router';
import PageLoader from './page-loader';

export class RouteChangeLoader extends Component<{}, { isLoading: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', () => {
      this.setState({ isLoading: true });
    });
    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false });
    });
    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    return <>{this.state.isLoading ? <PageLoader /> : ''}</>;
  }
}

export default RouteChangeLoader;
