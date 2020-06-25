import AmplienceImage from './image.interface';
import Author from './author.interface';
import { AmplienceContent } from './content.type';
import { DefaultContentBody } from 'dc-delivery-sdk-js';

export default interface BlogPost extends DefaultContentBody {
  id: string;
  title: string;
  date: string;
  description: string;
  authors: Author[];
  image: AmplienceImage;
  tags: string[];
  readTime: number;
  content: AmplienceContent[];
}
