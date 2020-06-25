import { DefaultContentBody } from 'dc-delivery-sdk-js';

export interface Blog extends DefaultContentBody {
  title: string;
  subTitle: string;
}

export const isBlog = (blog: DefaultContentBody | Blog): blog is Blog => {
  return blog.title !== undefined && blog.subTitle !== undefined;
};
