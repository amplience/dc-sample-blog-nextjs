import Image from './image.interface';
import Author from './author.interface';
import Video from './video.interface';
import Text from './text.interface';

export default interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  authors: Author[];
  image: Image;
  urlSlug: string;
  tags: string[];
  readTime: number;
  content: (Image | Text | Video)[];
}
