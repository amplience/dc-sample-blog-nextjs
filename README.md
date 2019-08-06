[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-static-site-nextjs

![License - Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)
![](https://img.shields.io/badge/node-v10%2B-blue.svg)
![](https://img.shields.io/badge/nextjs-v9%2B-blue.svg)
![](https://img.shields.io/badge/amplience%20delivery%20sdk-v0.3.0%2B-blue.svg)

This is a skeleton application built using the Amplience Dynamic Content Service and the NextJS framework and can be used as a starting point for building a static site. 

## Installation

Clone this repo and install the dependencies via npm:

```
npm install
```

## Running tests

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

### Using Staging/Other environments

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
