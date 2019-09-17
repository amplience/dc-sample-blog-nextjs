import { Component } from 'react';
import { debounce } from 'debounce';

/* ScrollTop
 * This is primarily used to fix an issue with safari when switching between minimal ui (reduced size address bar)
 * it allows us us use height 100% and a fixed header using flex without the address bar overlapping it
 */
export default class ScrollTop extends Component {
  componentDidMount(): void {
    window.addEventListener('resize', debounce(this.handleResize, 200));
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', debounce(this.handleResize, 200));
  }

  handleResize() {
    window.scrollTo(0, 0);
  }

  render(): null {
    return null;
  }
}
