import AmplienceImage from './image.interface';
import Author from './author.interface';
import { AmplienceContent } from './content.type';

export default interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  authors: Author[];
  image: AmplienceImage;
  urlSlug: string;
  tags: string[];
  readTime: number;
  content: AmplienceContent[];
}
