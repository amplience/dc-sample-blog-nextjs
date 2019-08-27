import Link from 'next/link';
import React from 'react';

export default class StaticLink extends React.PureComponent<any> {
  private isStatic = () => typeof process !== 'undefined' && process.env.NEXT_STATIC;

  private getHref = () => `${this.props.as || this.props.href}`;

  public render() {
    if (this.isStatic()) {
      return (
        <a href={this.getHref()}>
          {this.props.children}
          <style jsx>{`
            a {
              text-decoration: none;
              display: flex;
            }
          `}</style>
        </a>
      );
    }

    return <Link {...this.props} />;
  }
}
