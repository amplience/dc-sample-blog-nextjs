import Image from '../../../common/interfaces/image.interface';
import Author from '../../../common/interfaces/author.interface';
import Video from '../../../common/interfaces/video.interface';
import Text from '../../../common/interfaces/text.interface';

type Content = Image | Text | Video;

export default interface BlogPost {
  title: string;
  date: string;
  description: string;
  author: Author;
  image: Image;
  urlSlug: string;
  tags: string[];
  readTime: number;
  content: Content[];
}
