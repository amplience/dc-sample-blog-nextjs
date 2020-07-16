# Migration Guides

Below are instructions for migrating from one version of dc-static-blog-next-js to another.

## `1.x.x` to `2.x.x`

### Index setup and configuration

Ensure that you have setup and configured a search index by following [README.md](README.md) sections `Creating a production search index for your published blog-posts` and
`Configure your index`

### Updating existing content

- In 2.x.x, the content property `slug` is no longer used to build blog pages and had been replaced by the content items Delivery Key. To maintain existing blog pages you will need to copy the `slug` for each blog post and save it as the content items Delivery Key.

- Update your content types to the 2.x.x versions - see `Import using our dc-cli tool` in the [README.md](README.md)

- Create a new `blog` content type - see `Creating a Blog content item` in the [README.md](README.md)

### Updating Netlify Build Settings

New environment variables to add:

- ALGOLIA_APPLICATION_ID
- ALGOLIA_API_KEY
- ALGOLIA_PRODUCTION_INDEX_NAME
- DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY
- AUTHORS_FACET_FIELD
- TAGS_FACET_FIELD
- HITS_PER_PAGE

Old environment variables to remove:

- DYNAMIC_CONTENT_REFERENCE_ID
