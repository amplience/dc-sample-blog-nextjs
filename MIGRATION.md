# Migration Guides

Below are instructions for migrating from one version of dc-static-blog-next-js to another.

## `1.x.x` to `2.x.x`

### Create and configuration index

Ensure that you have setup and configured a search index by following [README.md](README.md) sections `Creating a production search index for your published blog-posts`,
`Configure your index`, `Add sort options` and `Configure webhook custom payload`.

### Setup and updating existing content

- Create a new `blog` content type - see `Creating a Blog content item` in the [README.md](README.md)

- In 2.x.x, the content property `slug` is no longer used to build blog pages and had been replaced by the content items Delivery Key. To maintain existing blog pages you will need to copy the `slug` for each blog post and save it as the content items Delivery Key. This needs to be done for each content item before updating the content types.

- Sync your content types to the 2.x.x versions - see `Import using our dc-cli tool` in the [README.md](README.md)

### Updating Netlify Build Settings

New environment variables to add:

- ALGOLIA_APPLICATION_ID
- ALGOLIA_API_KEY
- ALGOLIA_PRODUCTION_INDEX_NAME
- DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY
- DYNAMIC_CONTENT_HUB_NAME
- AUTHORS_FACET_FIELD
- TAGS_FACET_FIELD
- HITS_PER_PAGE

Update environment variable:

- DYNAMIC_CONTENT_BASE_URL (to point to CDV2 endpoint)

Old environment variables to remove:

- DYNAMIC_CONTENT_REFERENCE_ID
- DYNAMIC_CONTENT_ACCOUNT_NAME

## Update Dynamic Content webhook

- Update the existing Dynamic Content (used to trigger Netlify builds) to trigger on blog post publish - see `Create a Dynamic Content Webhook` in the [README.md](README.md)
