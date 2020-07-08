import React, { Component, ReactElement } from 'react';
import { Router } from 'next/router';
import PageLoader from './page-loader';

export class RouteChangeLoader extends Component<unknown, { isLoading: boolean }> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount(): void {
    Router.events.on('routeChangeStart', prop => {
      const routeChangeLocation = new URL(prop, window.location.origin);
      const currentPathname = window?.location?.pathname;
      if (routeChangeLocation.pathname !== currentPathname) {
        this.setState({ isLoading: true });
      }
    });
    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false });
    });
    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false });
    });
  }

  render(): ReactElement {
    return <>{this.state.isLoading ? <PageLoader /> : ''}</>;
  }
}

export default RouteChangeLoader;
