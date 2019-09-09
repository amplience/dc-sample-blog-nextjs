[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-static-blog-nextjs

![License - Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)
![](https://img.shields.io/badge/node-v10%2B-blue.svg)
![](https://img.shields.io/badge/nextjs-v9%2B-blue.svg)
![](https://img.shields.io/badge/amplience%20delivery%20sdk-v0.3.0%2B-blue.svg)

This is an application built using the Amplience Dynamic Content Service and the NextJS framework that generates a static blog website.

# How To Use

To use this application you will need to install the content schemas (see ./schema/*.json) in Dynamic Content and some way of running the application, either on your local machine or hosted via a static site platform (for this guide we have used [Netlify](https://www.netlify.com) but you can use [Zeit](https://zeit.co/) if you wish).

Once you have everything installed you can create new blog posts and schedule them when to go live on your blog.

![Scheduling a Blog List update in Dynamic Content](./media/create-blog-list-and-slot.gif)

# Installation

To install and use this blog first you need to create the schemas and register the Content Types in Dynamic Content.

## Content Type Schemas

| Filename       | Schema ID                                                                                        | Schema Type  |
|----------------|--------------------------------------------------------------------------------------------------|--------------|
| author.json    | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/author.json     | Content Type |
| blog-list.json | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/blog-list.json  | Content Type |
| blog-post.json | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/blog-post.json  | Content Type |
| blog-slot.json | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/blog-slot.json  | Slot         |
| image.json     | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/image.json      | Content Type |
| text.json      | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/text.json       | Content Type |
| video.json     | https://raw.githubusercontent.com/amplience/dc-static-blog-nextjs/master/schemas/video.json      | Content Type |

### Creating Schemas & Registering Content Types

In Dynamic Content and navigate to the "Content type schemas" area (Developer -> Content type schemas).

For each of the Content Types list above:-
1. Click on "Create schema"
2. Enter the Schema Id
3. Select the Schema Type  from the drop down menu
4. Click "Save & open schema"

Navigate to the "Content type" area (Developer -> Content type).

For each of the Content Types list above:-
1. Click on "Register content type"
2. Select "Internal" for the "Content type schema" option
3. Select the schema from the drop down list
4. Enter a sensible label (e.g. author.json to be "Author")
5. Associate the Content type to the correct repo (blog-slot.json should be in the repo that is marked as Slots)
6. Click "Save".

### Creating A Blog-List & Slot

Once you have installed and registered all of Content schemas, the next step is to create an blog-list Content item and a Slot.
A slot is like a placeholder/pointer to your blog-list, it is also the content entry point when the application runs.

How to create a blog-list content item for your blog:
1. Navigate to the "Production" section
2. Select the repo where you have registered "blog-list.json"
3. Click "Create content"
4. Select the "Blog List" (or whatever label to assigned to the "blog-list.json" content type)
5. Enter a title and a subtitle (these will appear on your blog)
6. Click "Save"

How to create a Blog list "slot", so you can schedule updates to your blog:
1. Navigate to the "Production" section
2. Select your Slots repository
3. Click "Create slots"
4. Select the "Blog Slot" (or whatever label to assigned to the "blog-slot.json" content type)
5. Click the "+" under "Blog list"
6. Click "Add existing"
7. Select your newly created Blog List
8. Click "Save"

Getting the content ID of a slot:-
1. Navigate to the "Production" section
2. Select your Slots repository
3. Find the slot you wish to use
4. In the "..." menu for that item, select "Get content ID"
5. Copy the Content ID, this ID will need to be assigned to the `DYNAMIC_CONTENT_REFERENCE_ID` environment variable

![Create Blog List and Slot](media/create-blog-list-and-slot.gif)

## Deploy To Netlify

Click on the button below to deploy this repository via Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/amplience/dc-static-blog-nextjs)

### Netlify Build Settings

During the Netlify setup process you will need to define the following build environment variables

| Environment Var              | Required | Description                                        | Example                              |
|------------------------------|----------|----------------------------------------------------|--------------------------------------|
| DYNAMIC_CONTENT_REFERENCE_ID | Yes      | The ID of the Blog List slot                       | 00112233-4455-6677-8899-aabbccddeeff |
| DYNAMIC_CONTENT_ACCOUNT_NAME | Yes      | Account Name also known as endpoint                | mycompanyid                          |
| DYNAMIC_CONTENT_BASE_URL     | No       | (Optional) Override the Content Delivery Base URL  | https://api.amplience.net            |


### Automate Netlify Deployments

It is possible to get Netlify to re-build and publish your blog whenever you publish a change in Dynamic Content using a [Dynamic Content Webhook](https://docs.amplience.net/integration/webhooks.html).

#### 1. Create Netlify "Build hook" 

1. Navigate to your Netlify Site settings section for you new blog.
2. Click on "Build & deploy".
3. Scroll down to the "Build hooks" section.
4. Click "Add a build hook".
5. Select the branch you wish to build "master"

#### 2. Create Dynamic Content Webhook 

1. Navigate to the "Webhooks" section in Dynamic Content
2. Click "Add webhook"
3. Enter a sensible label (e.g. "Netlify Deployment")
4. Enter the Netlify "build hook" that you created in the previous section
5. Enable the Webhook trigger "Edition - published"
6. Click "Save"

Notes:
* "Edition - published" trigger allows you to use the schedule features of Dynamic Content's, allowing you to schedule when your blog is updated.

# Publishing

Once you are ready to publish your blog within Dynamic Content just publish your new blog post directly from the "Production" side of Dynamic Content (select the context menu for the new blog post and select "Publish"). At first it won't appear on your blog, this is because the blog list needs to be updated to include it.

Remember the blog list and slot that you configured? At build time the application is requesting the slot Content Item which has a "content-link" to the blog list content item, the blog list content item contains an array of "content-references" that each point to a blog post. The content graph looks something like this:-

```
+--------+                +--------+                     +-----------+
|        |                |        |     - - - - - >     | Blog Post |
|  Slot  |    ------>     |  Blog  |                     +-----------+
|        |                |  List  |                     +-----------+
|        |                |        |     - - - - - >     | Blog Post |
+---+----+                +--------+                     +-----------+
           (content-link)             (content-reference)
```

To get the application to display your new blog post you will need to update the Blog List to include your new Blog Post. To do this open your blog list content item, add your new blog post and re-order thr list so your new blog post is at the top and click "save"
Next you will need to schedule this update using an Dynamic Content Edition.

## Scheduling

_***Note:*** This option is only available if your Webhook is configured using the ***"Edition - Published"*** trigger_

(If you have followed the previous section, so you can skip to step 4.)

1. Create your new Blog Post 
2. Publish your new Blog Post (don't worry it wont be visible on your site)
3. Update your Blog List to include your new Blog Post
4. Create a new Event & Edition in the Planner section of Dynamic Content (set when you want your Blog Post to be published on your Blog).
5. Add your Blog Slot to the Edition
6. Add your Blog List into the Blog Slot
7. Click "Schedule the Edition" 

When Dynamic Content publishes your updated slot it will also include your updated Blog List Content Item too, due to the "content-link" between the slot and the Blog List. Dynamic Content will also notify Netlify when it has been published via the webhook to you created. You can check on the status of the build by logging into your Netlify account and looking at build history.

![Scheduling a Blog List update in Dynamic Content](./media/create-blog-list-and-slot.gif)

# Local Development

Clone this repo and install the dependencies via npm:

```
npm install
```

## Running Tests

The below command will run unit tests for the project:

```
npm run test
```

## Setup

To setup the application create a `.env` file within the root of the project containing the following - replacing `Content-Id` and `Account-Name` with your values.

```
DYNAMIC_CONTENT_REFERENCE_ID=<Content-Id>
DYNAMIC_CONTENT_ACCOUNT_NAME=<Account-Name>
```

### Using Staging/Other Environments

To use the staging/other environment, the base URL can be overridden to a different value.

```
DYNAMIC_CONTENT_BASE_URL=<Base-URL>
```

## Build & Run  
First build the application using
```
npm run build
```
The application can then be started with
```
npm run start
```

## Run with Developer Mode
To start the application with Developer Mode use
```
npm run dev
```

## Export as Static Site
To generate the static site files use
```
npm run export 
```
The files will be exported to the `out` directory, these can then be served as a static site.

## Built with

- [Next.js](https://nextjs.org/)
- [Amplience Dynamic Content Delivery API SDK](https://github.com/amplience/dc-delivery-sdk-js)

## Contributing

If you would like to contribute to this project, please follow our [contributing guide](./CONTRIBUTING.md).

## License

This software is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),

Copyright 2019 Amplience

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
