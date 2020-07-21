# Migration Guides

Below are instructions for migrating from one version of dc-static-blog-next-js to another.

## `1.x.x` to `2.x.x`

### Prerequisites

The following features need to be enabled on your hub before this migration can occur:

- Search Indexes
- Content Delivery 2

### Prevent builds during migration

- Disable the Netlify webhook to prevent the blog from being built during the migration process.

### Create and configure index

Ensure that you have setup and configured a search index by following [README.md](README.md) sections `Creating a production search index for your published blog-posts`,
`Configure your index`, `Add sort options` and `Configure webhook custom payload`.

### Setup and update content

- Create a new `blog` content type - see `Creating a Blog content item` in the [README.md](README.md)

- In 2.x.x, the content property `slug` is no longer used to build blog pages and had been replaced by the content items Delivery Key. To maintain existing blog pages you will need to copy the `slug` for each blog post and save it as the content items Delivery Key. This needs to be done for each content item before updating the content types.

- Sync your content types to the 2.x.x versions - see `Import using our dc-cli tool` in the [README.md](README.md)

- Re-publish all blog posts so that their respective Delivery Keys and Content Type changes are applied.

### Updating Netlify build settings

New environment variables to add:

- ALGOLIA_APPLICATION_ID
- SEARCH_API_KEY
- SEARCH_INDEX_NAME_PRODUCTION
- SEARCH_INDEX_NAME_STAGING (optional for Preview and Visualization)
- DYNAMIC_CONTENT_DELIVERY_KEY
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

- Update the existing Dynamic Content webhook (used to trigger Netlify builds) to trigger on blog post publish - see `Create a Dynamic Content Webhook` in the [README.md](README.md).
- Enable the Netlify webhook.
- Manually trigger a Netlify build to build to generate a build of the blog with the new changes.
