import BlogPost from '../interfaces/blog-post.interface';
import { ContentClientConfig } from 'dc-delivery-sdk-js';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { MediaType } from '../interfaces/media.interface';
import { AmplienceContent } from '../interfaces/content.type';
import { getVideoSources } from './video.service';
import AmplienceImage from '../interfaces/image.interface';
import Author from '../interfaces/author.interface';
import AmplienceVideo from '../interfaces/video.interface';
import buildMediaUrl from './media.service';

function assignMediaType(obj: AmplienceImage | AmplienceVideo): AmplienceImage | AmplienceVideo {
  if ('image' in obj) {
    obj.image.mediaType = MediaType.IMAGE;
  } else if ('video' in obj) {
    obj.video.mediaType = MediaType.VIDEO;
  }

  return obj;
}

function parseImage(image: AmplienceImage): AmplienceImage {
  image = assignMediaType(image) as AmplienceImage;
  image.src = buildMediaUrl(image.image);

  return image;
}

function assignAuthorsAvatarMediaTypes(authors: Author[]): Author[] {
  return authors.map(
    (author): Author => {
      if (author.avatar !== undefined) {
        author.avatar = parseImage(author.avatar);
      }

      return author;
    }
  );
}

export async function parseContent(content: AmplienceContent[]): Promise<AmplienceContent[]> {
  const updatedContent: AmplienceContent[] = [];

  for (let c of content) {
    if ('image' in c) {
      c = parseImage(c);
    } else if ('video' in c) {
      c = assignMediaType(c) as AmplienceVideo;
      c.srcSet = await getVideoSources(c);
    }

    updatedContent.push(c);
  }

  return updatedContent;
}

export default async function getBlogPost(blogPostId: string): Promise<BlogPost> {
  const clientConfig: ContentClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL
  };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const contentItem = (await deliveryClient.getContentItemById(blogPostId)).toJSON();
  const { title, date, description, authors, readTime, image, urlSlug, content, tags } = contentItem;
  const blogId = contentItem._meta.deliveryId;

  return {
    id: blogId,
    title,
    date,
    description,
    authors: assignAuthorsAvatarMediaTypes(authors),
    readTime,
    image: parseImage(image),
    urlSlug,
    content,
    tags
  };
}
