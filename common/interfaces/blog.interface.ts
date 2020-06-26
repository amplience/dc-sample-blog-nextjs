import { DefaultContentBody } from 'dc-delivery-sdk-js';

export interface Blog extends DefaultContentBody {
  title: string;
  heading: string;
  searchPlaceHolder: string;
}

export const isBlog = (blog: DefaultContentBody | Blog): blog is Blog => {
  return blog.title !== undefined && blog.heading !== undefined;
};
