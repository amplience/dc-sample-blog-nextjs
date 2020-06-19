import React, { ReactElement } from 'react';
import { Component, SyntheticEvent } from 'react';

import theme from '../../common/styles/default/theme';

export default class PageLoader extends Component {
  onClickHandler(e: SyntheticEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  render(): ReactElement {
    return (
      <>
        <div className="page-loading" onClick={this.onClickHandler}>
          <div className="spinner"></div>
        </div>

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
