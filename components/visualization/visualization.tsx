import {Component, ReactElement} from 'react';
import {AmplienceContent} from '../../common/interfaces/content.type';
import getStagingContentItemById from '../../common/services/vse.service';
import Content from '../content/content';

interface VisualizationProps {
  stagingEnvironment: string;
  contentId: string;
}

interface VisualizationState {
  error?: string;
  content: AmplienceContent[]
}

export default class Visualization extends Component<VisualizationProps, VisualizationState> {
  state : VisualizationState = {
    content: []
  };

  componentDidMount(): void {
    // Do we need to load any content?
    if (this.props.stagingEnvironment.length == 0 || this.props.contentId.length == 0) {
      return;
    }
    this.loadContent();
  }

  componentDidUpdate(prevProps: Readonly<VisualizationProps>): void {
    // Has the props changed?
    if (prevProps.stagingEnvironment == this.props.stagingEnvironment && prevProps.contentId == this.props.contentId) {
      return;
    }
    this.setState({content: []});
    this.loadContent();
  }

  private async loadContent() {
    try {
      const content = await getStagingContentItemById(this.props.stagingEnvironment, this.props.contentId);
      this.setState({content});
    } catch (error) {
      this.setState({error: error.message});
    }
  }

  render(): ReactElement {
    if (this.state.error) {
      return (
        <>
          <h1>Unable to Render Visualization</h1>
          <p>Reason: {this.state.error}</p>
        </>
      );
    }
    if (this.state.content.length > 0) {
      return (<Content content={this.state.content}/>);
    }
    return (<h1>Loading Visualization...</h1>);
  }
};
