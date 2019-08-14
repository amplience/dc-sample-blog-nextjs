import Image from '../../../common/interfaces/image.interface';
import Author from '../../../common/interfaces/author.interface';
import Video from '../../../common/interfaces/video.interface';
import Text from '../../../common/interfaces/text.interface';

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
