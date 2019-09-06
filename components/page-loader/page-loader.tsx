import { Component, SyntheticEvent } from 'react';
import { Router } from 'next/router';

import theme from '../../common/styles/default/theme';

export class PageLoader extends Component<{}, { isLoading: boolean }> {
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

  onClickHandler(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div className="page-loading" onClick={this.onClickHandler}>
            <div className="spinner"></div>
          </div>
        ) : (
          ''
        )}
        <style jsx>{`
          .page-loading {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .spinner {
            display: inline-block;
            width: 75px;
            height: 75px;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: ${theme.colors.mineShaft};
            animation: spin 1s ease-in-out infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
    );
  }
}

export default PageLoader;
