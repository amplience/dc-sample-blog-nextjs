# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.2](https://github.com/amplience/dc-sample-blog-nextjs/compare/v2.1.1...v2.1.2) (2021-01-28)

### [2.1.1](https://github.com/amplience/dc-sample-blog-nextjs/compare/v2.1.0...v2.1.1) (2020-12-02)


### Features

* add sitemap url to robots.txt ([#93](https://github.com/amplience/dc-sample-blog-nextjs/issues/93)) ([9f9f7ff](https://github.com/amplience/dc-sample-blog-nextjs/commit/9f9f7ff89c18856b2e4a4e2726b4f61a337a942a))


### Bug Fixes

* add trailling slashes to sitemap.xml ([#92](https://github.com/amplience/dc-sample-blog-nextjs/issues/92)) ([918998d](https://github.com/amplience/dc-sample-blog-nextjs/commit/918998d73ae29c93241f4a3831d754d619a2bd72))
* only append / to urls that dont end in / (external lib change) ([#95](https://github.com/amplience/dc-sample-blog-nextjs/issues/95)) ([de49cd0](https://github.com/amplience/dc-sample-blog-nextjs/commit/de49cd036dbca94768249b718b7a4ab116557f83))

## [2.1.0](https://github.com/amplience/dc-sample-blog-nextjs/compare/v2.0.1...v2.1.0) (2020-11-03)


### Features

* **click analytics:** adding algolia click tracking to blog list links ([#88](https://github.com/amplience/dc-sample-blog-nextjs/issues/88)) ([4f4044c](https://github.com/amplience/dc-sample-blog-nextjs/commit/4f4044cc2f0d1475b13880a0c31c90afe89d9fe8))
* **content:** removing lazy loading for blog post text content ([#84](https://github.com/amplience/dc-sample-blog-nextjs/issues/84)) ([8d6236d](https://github.com/amplience/dc-sample-blog-nextjs/commit/8d6236de17feb60b8a85d96c356346162ede28cf))
* **header:** switch to single h1 per page ([#83](https://github.com/amplience/dc-sample-blog-nextjs/issues/83)) ([2718934](https://github.com/amplience/dc-sample-blog-nextjs/commit/2718934b5a8992ced8c4c0497e4dbf6b91f946be))
* **index page:** updated pagingated pages to include a page number for titles and descriptions ([#86](https://github.com/amplience/dc-sample-blog-nextjs/issues/86)) ([a5f1758](https://github.com/amplience/dc-sample-blog-nextjs/commit/a5f1758f658318d1f90ae8fa40892248c2b7f716))
* **sitemap:** generating sitemap.xml on export ([#85](https://github.com/amplience/dc-sample-blog-nextjs/issues/85)) ([58f41df](https://github.com/amplience/dc-sample-blog-nextjs/commit/58f41dfa19378982b707d12dadd1189fe9bbfb24))


### Bug Fixes

* **manifest json:** changed the link location for the manifest file ([#87](https://github.com/amplience/dc-sample-blog-nextjs/issues/87)) ([fd6d90c](https://github.com/amplience/dc-sample-blog-nextjs/commit/fd6d90cea6910cb55151ec832f049ace2027b11a))
* **microdata:** updated to use article type and added extra required information ([#91](https://github.com/amplience/dc-sample-blog-nextjs/issues/91)) ([b99f500](https://github.com/amplience/dc-sample-blog-nextjs/commit/b99f500e8f3be1cdefa110afaebdbe9dacb8042c))
* **share post:** removing linkedin placeholder script from helmet ([#89](https://github.com/amplience/dc-sample-blog-nextjs/issues/89)) ([ff165bd](https://github.com/amplience/dc-sample-blog-nextjs/commit/ff165bd6e7ef80eafe11e6f423ec7809f3bafb41))
* **track click:** setting track click component to display flex ([#90](https://github.com/amplience/dc-sample-blog-nextjs/issues/90)) ([d056e72](https://github.com/amplience/dc-sample-blog-nextjs/commit/d056e725bcd9e8e31db2c7885a61a429e1962d11))

### [2.0.1](https://github.com/amplience/dc-sample-blog-nextjs/compare/v2.0.0...v2.0.1) (2020-10-19)


### Bug Fixes

* **blog card links:** updated so that deliveryKey is not lowercase and added tests ([#81](https://github.com/amplience/dc-sample-blog-nextjs/issues/81)) ([a8926db](https://github.com/amplience/dc-sample-blog-nextjs/commit/a8926db59b09b7cac4f53795bfdb3072b83c1ed5))
* author and tags to display 25 items ([#76](https://github.com/amplience/dc-sample-blog-nextjs/issues/76)) ([78823c3](https://github.com/amplience/dc-sample-blog-nextjs/commit/78823c37effa5ba60c03a0ef7753d735238eb0b9))
* header link when previewing via a vse ([#77](https://github.com/amplience/dc-sample-blog-nextjs/issues/77)) ([5550703](https://github.com/amplience/dc-sample-blog-nextjs/commit/5550703284d7b74910e3ae54514be7d2e1cb1283))
* removed the duplicate and corrected the remaining viewport meta header ([#78](https://github.com/amplience/dc-sample-blog-nextjs/issues/78)) ([8d2c1df](https://github.com/amplience/dc-sample-blog-nextjs/commit/8d2c1df4bee93423020a7483aa85398d499f41a7))
* **share buttons:** wrapped in a helmet component to display the vanilla js ([#79](https://github.com/amplience/dc-sample-blog-nextjs/issues/79)) ([c011cef](https://github.com/amplience/dc-sample-blog-nextjs/commit/c011cef896ecf0fd2610871b1638a59b3f989286))

## [2.0.0](https://github.com/amplience/dc-sample-blog-nextjs/compare/v1.2.0...v2.0.0) (2020-07-22)


### ⚠ BREAKING CHANGES

* **search results:** moved the declaration of the number of search results into a environment variable

Co-authored-by: paulgturner <61312164+paulgturner@users.noreply.github.com>
* **keyword search:** added search box into the header (#31)
* content delivery 2 support (#25)

### Features

* **blog page:** loading linked blog pages dynamically ([#30](https://github.com/amplience/dc-sample-blog-nextjs/issues/30)) ([59430d0](https://github.com/amplience/dc-sample-blog-nextjs/commit/59430d0df384d01f6b8f6ff9d364f571012d3cf1))
* **index page:** using instant search to populate the index blog list ([#26](https://github.com/amplience/dc-sample-blog-nextjs/issues/26)) ([d84ac4e](https://github.com/amplience/dc-sample-blog-nextjs/commit/d84ac4ee23ea31b2c85e962c007b6e71ee87015d))
* **index search:** algolia sort by dropdown ([#33](https://github.com/amplience/dc-sample-blog-nextjs/issues/33)) ([3d23ec1](https://github.com/amplience/dc-sample-blog-nextjs/commit/3d23ec196950f65796bc4ac1caf1b0e28d737398))
* **keyword search:** added search box into the header ([#31](https://github.com/amplience/dc-sample-blog-nextjs/issues/31)) ([8a7d060](https://github.com/amplience/dc-sample-blog-nextjs/commit/8a7d060dedc4e19e98aecc111b019b84f88efafb))
* **pages/index.tsx:** load the algolia index client side on load ([#29](https://github.com/amplience/dc-sample-blog-nextjs/issues/29)) ([27fc551](https://github.com/amplience/dc-sample-blog-nextjs/commit/27fc55107016cf69ca7f7e0aba8a25f3d1300ef6))
* **preview/visualization:** updated to use a staging index data and restructured components ([#32](https://github.com/amplience/dc-sample-blog-nextjs/issues/32)) ([e7cc19e](https://github.com/amplience/dc-sample-blog-nextjs/commit/e7cc19e7dea30b00f450cd411cc4ec7e1aafc985))
* **schemas:** add delivery key to the content form to enable validation ([#54](https://github.com/amplience/dc-sample-blog-nextjs/issues/54)) ([bec6552](https://github.com/amplience/dc-sample-blog-nextjs/commit/bec65527956df424bd8a641ceb95d170637551aa))
* **search faceting:** added facet selection to the header bar ([#46](https://github.com/amplience/dc-sample-blog-nextjs/issues/46)) ([f113642](https://github.com/amplience/dc-sample-blog-nextjs/commit/f11364245decf4ba9351d328bac6cf1d536c7f66))
* **search list:** hero card no longer shown on search results ([#49](https://github.com/amplience/dc-sample-blog-nextjs/issues/49)) ([d843650](https://github.com/amplience/dc-sample-blog-nextjs/commit/d843650ad1de23efd5ff58814147a4eae9a1535e))
* **search list pagination:** adding index page pagination to the search list ([#34](https://github.com/amplience/dc-sample-blog-nextjs/issues/34)) ([47f44c0](https://github.com/amplience/dc-sample-blog-nextjs/commit/47f44c01240b15d1835142c1b40785a79fe5f5c4))
* **search urls:** adding search state to url query string ([#44](https://github.com/amplience/dc-sample-blog-nextjs/issues/44)) ([96f3ddf](https://github.com/amplience/dc-sample-blog-nextjs/commit/96f3ddf3da85cf0388a7dffbe582e590c4cc321f))
* **tag facets:** added chip style facetable tags to blog posts and cards ([#59](https://github.com/amplience/dc-sample-blog-nextjs/issues/59)) ([067924d](https://github.com/amplience/dc-sample-blog-nextjs/commit/067924da471f881c1db36b54f9f6c329fdd3a8e8))
* content delivery 2 support ([#25](https://github.com/amplience/dc-sample-blog-nextjs/issues/25)) ([15ad88f](https://github.com/amplience/dc-sample-blog-nextjs/commit/15ad88f23323890861dc92da0761f32f0b62785b))
* content-delivery-2 - part 2, clean up ([#28](https://github.com/amplience/dc-sample-blog-nextjs/issues/28)) ([c0c3a73](https://github.com/amplience/dc-sample-blog-nextjs/commit/c0c3a73a6d1d0c148a79608d8df97c1ea558ea06))


### Bug Fixes

* **hero banner:** adding additional spacing to elements in the hero banner ([#71](https://github.com/amplience/dc-sample-blog-nextjs/issues/71)) ([2112e50](https://github.com/amplience/dc-sample-blog-nextjs/commit/2112e502bc3ee2d7428f05aae596b105ef061dca))
* custom payload limit has been reduced to support large blog posts ([#70](https://github.com/amplience/dc-sample-blog-nextjs/issues/70)) ([fef2061](https://github.com/amplience/dc-sample-blog-nextjs/commit/fef206120c9729d31358e82921fa878388351435))
* **blog card:** fixing the width of blog card tags ([#67](https://github.com/amplience/dc-sample-blog-nextjs/issues/67)) ([353c922](https://github.com/amplience/dc-sample-blog-nextjs/commit/353c922fd2089547e102a8fc8f5c5cc80d5930ba))
* **blog post:** updating build process and blog links to fallback to object id on missing key ([#52](https://github.com/amplience/dc-sample-blog-nextjs/issues/52)) ([492575d](https://github.com/amplience/dc-sample-blog-nextjs/commit/492575d538701431ca6ca5fa3d69b8be009ae44f))
* **default layout:** moving font import into the document header to avoid 404 ([#50](https://github.com/amplience/dc-sample-blog-nextjs/issues/50)) ([bc3f4f1](https://github.com/amplience/dc-sample-blog-nextjs/commit/bc3f4f174b9bab4029989461dd63ab7656a2b22e))
* **header facet bar:** adding media query styles to facet bar for smaller devices ([#60](https://github.com/amplience/dc-sample-blog-nextjs/issues/60)) ([b59cd66](https://github.com/amplience/dc-sample-blog-nextjs/commit/b59cd66b535f7eb3e4f7672f9c50877c3e895023))
* **header search:** adding media query smaller device styles for search box and sort by ([#42](https://github.com/amplience/dc-sample-blog-nextjs/issues/42)) ([fe62206](https://github.com/amplience/dc-sample-blog-nextjs/commit/fe6220652fe10bcf6625a45a8efe274e5f06b1e5))
* **header search box:** removing search input box shadow to resolve chrome bug ([#45](https://github.com/amplience/dc-sample-blog-nextjs/issues/45)) ([51cfde3](https://github.com/amplience/dc-sample-blog-nextjs/commit/51cfde349b8f3386338cbce28e1b76adf31f0ab2))
* **index:** preventing flicker by only using build time data server-side ([#66](https://github.com/amplience/dc-sample-blog-nextjs/issues/66)) ([40ae891](https://github.com/amplience/dc-sample-blog-nextjs/commit/40ae8914e2b0a0549702fde495731a0a1d490a13))
* **index:** scrolling to page top when tag chips are clicked ([#68](https://github.com/amplience/dc-sample-blog-nextjs/issues/68)) ([5769308](https://github.com/amplience/dc-sample-blog-nextjs/commit/57693086ffaa2f05859429a0762f1c1359714434))
* **keyword search:** added the default refinement to the sortby ([#38](https://github.com/amplience/dc-sample-blog-nextjs/issues/38)) ([a9d70cc](https://github.com/amplience/dc-sample-blog-nextjs/commit/a9d70ccf61552aa3581b9d9ae2b7119ddb4a1e7c))
* **menu select component:** updated the styling to match across browsers ([#53](https://github.com/amplience/dc-sample-blog-nextjs/issues/53)) ([acf7ae3](https://github.com/amplience/dc-sample-blog-nextjs/commit/acf7ae3963491511ab166b08015544c2df40e5a3))
* **pagination:** scroll to top of page when pagination link clicked ([#43](https://github.com/amplience/dc-sample-blog-nextjs/issues/43)) ([adf1615](https://github.com/amplience/dc-sample-blog-nextjs/commit/adf1615d80eb91a1dd46bd66ad7d01e8a888af51))
* **pagination:** set correct number of blog articles to show on listing page and when searching ([#58](https://github.com/amplience/dc-sample-blog-nextjs/issues/58)) ([70bd898](https://github.com/amplience/dc-sample-blog-nextjs/commit/70bd898e3dae61a9cf102369a1efdef93d55e3f6))
* **preview:** checking for vse via router aspath to construct next links for preview ([#48](https://github.com/amplience/dc-sample-blog-nextjs/issues/48)) ([6ee2521](https://github.com/amplience/dc-sample-blog-nextjs/commit/6ee2521f5f1ff0c862b1a599c3c290133935f14f))
* **search box:** fixed input/button styles in chrome, safari & ie ([#37](https://github.com/amplience/dc-sample-blog-nextjs/issues/37)) ([c8fced1](https://github.com/amplience/dc-sample-blog-nextjs/commit/c8fced1b1c7134392d3da0817147f5cd033e8b5e))
* **search-list:** filters out any non blog-post items ([#35](https://github.com/amplience/dc-sample-blog-nextjs/issues/35)) ([63f3aaa](https://github.com/amplience/dc-sample-blog-nextjs/commit/63f3aaa03113651b3231e67f2fc4c48ff644f2fd))
* **sort by:** fixed alignment in chrome & safari ([#39](https://github.com/amplience/dc-sample-blog-nextjs/issues/39)) ([478047d](https://github.com/amplience/dc-sample-blog-nextjs/commit/478047db965804e5aad360c8246c28e7c529af6b))
* **sort by:** set date desc as default sort by ([#41](https://github.com/amplience/dc-sample-blog-nextjs/issues/41)) ([3c04c25](https://github.com/amplience/dc-sample-blog-nextjs/commit/3c04c25fe44746bc5e81e155abe13011dbedbc1c))
* **sort by:** updated the sort by to show the main index by default ([#63](https://github.com/amplience/dc-sample-blog-nextjs/issues/63)) ([b6bfe8a](https://github.com/amplience/dc-sample-blog-nextjs/commit/b6bfe8af274ea6d648b740ede4aab9cd38122eda))
* **sortby menu:** updates default sort options and labels ([#57](https://github.com/amplience/dc-sample-blog-nextjs/issues/57)) ([a716b6c](https://github.com/amplience/dc-sample-blog-nextjs/commit/a716b6c2c2149918674af2e0060aa249ded3148a))
* **tag chips:** adding overflow ellipsis and setting a max width for tag chips ([#61](https://github.com/amplience/dc-sample-blog-nextjs/issues/61)) ([937c2e2](https://github.com/amplience/dc-sample-blog-nextjs/commit/937c2e25f88e5eb75bc412a24345e276ced1f86a))
* **tag chips:** corrected the cursor property value to be a pointer ([#64](https://github.com/amplience/dc-sample-blog-nextjs/issues/64)) ([cef8837](https://github.com/amplience/dc-sample-blog-nextjs/commit/cef88379c2672a29e8c9156d12cf4afde363b51e))


* **search results:** removed hero card component and added hits per page as configurable ([#62](https://github.com/amplience/dc-sample-blog-nextjs/issues/62)) ([a80d53b](https://github.com/amplience/dc-sample-blog-nextjs/commit/a80d53b963b655e6d45455113da5f062a97136cd))

## [1.2.0](https://github.com/amplience/dc-sample-blog-nextjs/compare/v1.1.1...v1.2.0) (2020-02-12)


### Bug Fixes

* **header on mobile:** removed min-height on header ([50e7a91](https://github.com/amplience/dc-sample-blog-nextjs/commit/50e7a91))


### Features

* **logo:** new Amplience logo ([bc3f642](https://github.com/amplience/dc-sample-blog-nextjs/commit/bc3f642))

### [1.1.1](https://github.com/amplience/dc-sample-blog-nextjs/compare/v1.1.0...v1.1.1) (2019-10-23)


### Bug Fixes

* **blog list visualisation:** delay in update of visualisation of linked content in blog lists ([c1e3480](https://github.com/amplience/dc-sample-blog-nextjs/commit/c1e3480))

## [1.1.0](https://github.com/amplience/dc-sample-blog-nextjs/compare/v1.0.0...v1.1.0) (2019-10-09)


### Bug Fixes

* **blog card:** moving lazy load component inside the anchor tag so links are always available ([75f9e4e](https://github.com/amplience/dc-sample-blog-nextjs/commit/75f9e4e))
* **service worker:** added some config to fix safari video issues ([cba34f4](https://github.com/amplience/dc-sample-blog-nextjs/commit/cba34f4))


### Features

* **dynamic content config:** media host env vars to override dynamic content client default host ([e6b3d6d](https://github.com/amplience/dc-sample-blog-nextjs/commit/e6b3d6d))

## 1.0.0 (2019-09-25)


### Bug Fixes

* **author avatar:** added more px to the image being loaded ([b149a40](https://github.com/amplience/dc-sample-blog-nextjs/commit/b149a40))
* **author avatar:** changed the size of the image to suit the css ([105362b](https://github.com/amplience/dc-sample-blog-nextjs/commit/105362b))
* **author avatar:** fixed the bug where the avatar is not supplied ([fc0b8f9](https://github.com/amplience/dc-sample-blog-nextjs/commit/fc0b8f9))
* **big blog image:** added a default size to help with scalability ([6cdc7b1](https://github.com/amplience/dc-sample-blog-nextjs/commit/6cdc7b1))
* **blockquote:** adding margins and paddings to blockquote component ([f15b7dd](https://github.com/amplience/dc-sample-blog-nextjs/commit/f15b7dd))
* **blog:** display more than one author info ([5a1f8e5](https://github.com/amplience/dc-sample-blog-nextjs/commit/5a1f8e5))
* **blog article:** modified mobile styles for social links and blockqoutes ([aabc705](https://github.com/amplience/dc-sample-blog-nextjs/commit/aabc705))
* **blog article:** modifying style  sizing ([793a357](https://github.com/amplience/dc-sample-blog-nextjs/commit/793a357))
* **blog card:** cards fill full width in mobile ([bc7ad64](https://github.com/amplience/dc-sample-blog-nextjs/commit/bc7ad64))
* **blog cards:** applying correct font weight to cards ([5642c46](https://github.com/amplience/dc-sample-blog-nextjs/commit/5642c46))
* **blog cards:** no blog click event on margin between cards ([3949863](https://github.com/amplience/dc-sample-blog-nextjs/commit/3949863))
* **blog image:** adding a smaller height ([6ff3b46](https://github.com/amplience/dc-sample-blog-nextjs/commit/6ff3b46))
* **blog list:** reducing style sizings ([3e22c7f](https://github.com/amplience/dc-sample-blog-nextjs/commit/3e22c7f))
* **blog list:** settling all blog requests and disgarding rejected requests ([4d65fe4](https://github.com/amplience/dc-sample-blog-nextjs/commit/4d65fe4))
* **blog page lead image:** added a height for better rendering of images ([4cad06c](https://github.com/amplience/dc-sample-blog-nextjs/commit/4cad06c))
* **blog paragraph:** make sure we dont apply a margin for first instance of content paragraph ([563046e](https://github.com/amplience/dc-sample-blog-nextjs/commit/563046e))
* **blog post:** reducing blog article header fonts and giving a top padding for better spacing ([407917f](https://github.com/amplience/dc-sample-blog-nextjs/commit/407917f))
* **blog post:** removing the need for a uuid in the blog post urls ([7015b43](https://github.com/amplience/dc-sample-blog-nextjs/commit/7015b43))
* **blog posts:** throw error on duplicate url slugs ([08b98f5](https://github.com/amplience/dc-sample-blog-nextjs/commit/08b98f5))
* **blog url:** changed to blog from blogs ([5d879fc](https://github.com/amplience/dc-sample-blog-nextjs/commit/5d879fc))
* **card images:** added a new set of sizes for the card images ([9e1b935](https://github.com/amplience/dc-sample-blog-nextjs/commit/9e1b935))
* **card images:** updated hero card image width and added height to all card images to be responsive ([3dd662b](https://github.com/amplience/dc-sample-blog-nextjs/commit/3dd662b))
* **console warnings:** changed style names and added keys to multi-items ([0508694](https://github.com/amplience/dc-sample-blog-nextjs/commit/0508694))
* **console warnings:** linkedin and twitter share buttons are now loaded via dangerouslySetInnerHTML ([fe20ead](https://github.com/amplience/dc-sample-blog-nextjs/commit/fe20ead))
* **content:** prevent content images from bursting out container ([fdc965e](https://github.com/amplience/dc-sample-blog-nextjs/commit/fdc965e))
* **cookie:** fix previuos commit errors ([31afb0f](https://github.com/amplience/dc-sample-blog-nextjs/commit/31afb0f))
* **cookie:** privacy policy opens in new window ([27e97f1](https://github.com/amplience/dc-sample-blog-nextjs/commit/27e97f1))
* **cookie:** removed unnecessary object being passed in ([99ddc9c](https://github.com/amplience/dc-sample-blog-nextjs/commit/99ddc9c))
* **cookie banner:** added extra styling to make it float ([48ed287](https://github.com/amplience/dc-sample-blog-nextjs/commit/48ed287))
* **cookie banner:** added z-index so the drop shadow would be above other things ([e10872e](https://github.com/amplience/dc-sample-blog-nextjs/commit/e10872e))
* **cookie banner:** changed the styles for mobile to make the button wrap ([1785469](https://github.com/amplience/dc-sample-blog-nextjs/commit/1785469))
* **cookie banner:** made the button below at all times ([fe1cdc9](https://github.com/amplience/dc-sample-blog-nextjs/commit/fe1cdc9))
* **copy public files:** changed the output dir for public files ([7614009](https://github.com/amplience/dc-sample-blog-nextjs/commit/7614009))
* **date regex:** updated regex to eliminate 00 as a day ([b9e614c](https://github.com/amplience/dc-sample-blog-nextjs/commit/b9e614c))
* **dayjs:** removing library as it does not work ([b0a2afe](https://github.com/amplience/dc-sample-blog-nextjs/commit/b0a2afe))
* **displayed date:** fixing the date displayed ([ad70991](https://github.com/amplience/dc-sample-blog-nextjs/commit/ad70991))
* **env vars:** moving env vars out of exportPathMap to fix ssr mode issue ([b7e2074](https://github.com/amplience/dc-sample-blog-nextjs/commit/b7e2074))
* **error component:** change default error state to be 404 ([d35331e](https://github.com/amplience/dc-sample-blog-nextjs/commit/d35331e))
* **error page:** moved the title and description into the nextseo component ([aae5217](https://github.com/amplience/dc-sample-blog-nextjs/commit/aae5217))
* **external link:** removing superfluous external link interface property ([7738823](https://github.com/amplience/dc-sample-blog-nextjs/commit/7738823))
* **footer:** adding flex overflow so the height auto scales ([7c0fa05](https://github.com/amplience/dc-sample-blog-nextjs/commit/7c0fa05))
* **footer:** adding key to links to stop console error ([4415d4d](https://github.com/amplience/dc-sample-blog-nextjs/commit/4415d4d))
* **footer:** displaying social icons in mobile view ([d55740c](https://github.com/amplience/dc-sample-blog-nextjs/commit/d55740c))
* **footer:** setting correct margins for mobile ([2906aad](https://github.com/amplience/dc-sample-blog-nextjs/commit/2906aad))
* **header:** fixing safari height issue ([d53c176](https://github.com/amplience/dc-sample-blog-nextjs/commit/d53c176))
* **header:** reducing sizing for mobile ([ccacc08](https://github.com/amplience/dc-sample-blog-nextjs/commit/ccacc08))
* **header component:** aligned logo with content and fixed issue with displaying in safari ([a51d05b](https://github.com/amplience/dc-sample-blog-nextjs/commit/a51d05b))
* **header title:** updated the title to reflect the designs ([03b17b9](https://github.com/amplience/dc-sample-blog-nextjs/commit/03b17b9))
* **hero card:** added the correct height from the design ([a48914e](https://github.com/amplience/dc-sample-blog-nextjs/commit/a48914e))
* **hero card:** changed the link on the hero card to be /blog/slug/id ([4329c6b](https://github.com/amplience/dc-sample-blog-nextjs/commit/4329c6b))
* **hero card:** correct blog link url ([8bcdd04](https://github.com/amplience/dc-sample-blog-nextjs/commit/8bcdd04))
* **hero card content:** added styling for mobile to stop the content wrapping too much ([3715278](https://github.com/amplience/dc-sample-blog-nextjs/commit/3715278))
* **hero card image:** added a width to the content so it won't squash the image ([9abc349](https://github.com/amplience/dc-sample-blog-nextjs/commit/9abc349))
* **hero card image:** added sizes as an option to the image to help scaling ([63e6ab6](https://github.com/amplience/dc-sample-blog-nextjs/commit/63e6ab6))
* **hero card shadow animation:** added an animation to the shadow and text ([b1eb630](https://github.com/amplience/dc-sample-blog-nextjs/commit/b1eb630))
* **hero card text:** added styling fixes for mobile ([62ffa0e](https://github.com/amplience/dc-sample-blog-nextjs/commit/62ffa0e))
* **image dimensions:** added tighter image dimensions ([debdf6c](https://github.com/amplience/dc-sample-blog-nextjs/commit/debdf6c))
* **image poi:** added functionality to the image component to include poi params ([e326401](https://github.com/amplience/dc-sample-blog-nextjs/commit/e326401))
* **image sizes:** added a calculation for image sizes to add a src in the right order ([c800077](https://github.com/amplience/dc-sample-blog-nextjs/commit/c800077))
* **image src:** adding url component encoding for image names when making a src ([f68ef86](https://github.com/amplience/dc-sample-blog-nextjs/commit/f68ef86))
* **image styling:** changing heights and image rendering so that they are scalable ([17b20b9](https://github.com/amplience/dc-sample-blog-nextjs/commit/17b20b9))
* **images:** added more options to the image tag to be passed to dynamic media ([305c2b7](https://github.com/amplience/dc-sample-blog-nextjs/commit/305c2b7))
* **index:** changed the url in the blog list ([00523ad](https://github.com/amplience/dc-sample-blog-nextjs/commit/00523ad))
* **index:** only display no blog message when no blogs ([7762177](https://github.com/amplience/dc-sample-blog-nextjs/commit/7762177))
* **index page:** updated snapshot ([a500c08](https://github.com/amplience/dc-sample-blog-nextjs/commit/a500c08))
* **layout:** restoring header and cookie banner stickyness ([cc10b72](https://github.com/amplience/dc-sample-blog-nextjs/commit/cc10b72))
* **link preload:** use https instead of http for i1.adis.ws ([700d51b](https://github.com/amplience/dc-sample-blog-nextjs/commit/700d51b))
* **markdown:** going back to previous blockwoute and share link styles ([8b80a18](https://github.com/amplience/dc-sample-blog-nextjs/commit/8b80a18))
* **markdown codeblock:** empty string causing the markdown renderer to fail ([8f6a44f](https://github.com/amplience/dc-sample-blog-nextjs/commit/8f6a44f))
* **markdown codeblock:** empty string causing the markdown renderer to fail ([ba61d07](https://github.com/amplience/dc-sample-blog-nextjs/commit/ba61d07))
* **markdown paragraph:** removing margin from last child ([0a006e3](https://github.com/amplience/dc-sample-blog-nextjs/commit/0a006e3))
* **merge:** fixing conflict ([7871944](https://github.com/amplience/dc-sample-blog-nextjs/commit/7871944))
* **merge:** resolving conflict ([e1c93b0](https://github.com/amplience/dc-sample-blog-nextjs/commit/e1c93b0))
* **merge:** resolving conflict ([4f61c7e](https://github.com/amplience/dc-sample-blog-nextjs/commit/4f61c7e))
* **merge:** resolving conflict ([7fd5d12](https://github.com/amplience/dc-sample-blog-nextjs/commit/7fd5d12))
* **merge:** resolving conflict ([11e5766](https://github.com/amplience/dc-sample-blog-nextjs/commit/11e5766))
* **merge:** resolving conflicts ([97b3def](https://github.com/amplience/dc-sample-blog-nextjs/commit/97b3def))
* **merge conflict:** fixing merge conflict ([3081ba5](https://github.com/amplience/dc-sample-blog-nextjs/commit/3081ba5))
* **merge conlfict:** fixing merge issues ([c3ae133](https://github.com/amplience/dc-sample-blog-nextjs/commit/c3ae133))
* **mobile scroll and hover:** changed scroll to be smooth and hover to none existent ([7e8dfba](https://github.com/amplience/dc-sample-blog-nextjs/commit/7e8dfba))
* **next config:** returning last processed urlSlug when duplicate is found ([756fc6b](https://github.com/amplience/dc-sample-blog-nextjs/commit/756fc6b))
* **next config:** updating manifest name ([ff8435d](https://github.com/amplience/dc-sample-blog-nextjs/commit/ff8435d))
* **nextjs config:** initialised the blogPosts to an empty array if the property is not returned ([aa653cf](https://github.com/amplience/dc-sample-blog-nextjs/commit/aa653cf))
* **opengraph:** removed the protocol from the opengraph image prop ([4bf674b](https://github.com/amplience/dc-sample-blog-nextjs/commit/4bf674b))
* **picture:** reqorking source mapping to avoid missing key console errors ([8783268](https://github.com/amplience/dc-sample-blog-nextjs/commit/8783268))
* **poi:** removed the encoding around the query string params ([b82470c](https://github.com/amplience/dc-sample-blog-nextjs/commit/b82470c))
* **poi:** removed the encoding around the query string params ([347eaee](https://github.com/amplience/dc-sample-blog-nextjs/commit/347eaee))
* **robots env var:** added to the config to be available in the app ([b3c8d60](https://github.com/amplience/dc-sample-blog-nextjs/commit/b3c8d60))
* **robots.txt:** moved the robots.txt and added functionality to render it when built ([6e9db36](https://github.com/amplience/dc-sample-blog-nextjs/commit/6e9db36))
* **robots.txt:** moved to the static folder ([601783d](https://github.com/amplience/dc-sample-blog-nextjs/commit/601783d))
* **schema:** changed date description to correct format ([52595c0](https://github.com/amplience/dc-sample-blog-nextjs/commit/52595c0))
* **scroll top:** renderless component to make sure we never lose header content in safari mobile ([fa843d0](https://github.com/amplience/dc-sample-blog-nextjs/commit/fa843d0))
* **social links:** only apply top padding in mobile view ([4d853d2](https://github.com/amplience/dc-sample-blog-nextjs/commit/4d853d2))
* **staticlink component:** always returned the anchor tag ([1f34d07](https://github.com/amplience/dc-sample-blog-nextjs/commit/1f34d07))
* **styles:** fixing card element margins and bolding text ([9f9fd84](https://github.com/amplience/dc-sample-blog-nextjs/commit/9f9fd84))
* **styling:** reducing line heights and increasing font size for mobile ([bbfb421](https://github.com/amplience/dc-sample-blog-nextjs/commit/bbfb421))
* **styling issues:** fixing general styling issues ([9b8f9c1](https://github.com/amplience/dc-sample-blog-nextjs/commit/9b8f9c1))
* **validating blog reference list:** removed requirement for subtitle in blog reference validation ([19b23fc](https://github.com/amplience/dc-sample-blog-nextjs/commit/19b23fc))
* **video:** all videos are now requested and served via https ([92bc09b](https://github.com/amplience/dc-sample-blog-nextjs/commit/92bc09b))
* **video:** fixing video typings ([cfd08a7](https://github.com/amplience/dc-sample-blog-nextjs/commit/cfd08a7))


### Features

* **article lead image:** removed the image height and some styles to match ([5613a19](https://github.com/amplience/dc-sample-blog-nextjs/commit/5613a19))
* **blog:** fix merge conflicts ([e3d7de4](https://github.com/amplience/dc-sample-blog-nextjs/commit/e3d7de4))
* **blog:** fix merge conflicts ([5ef5fa0](https://github.com/amplience/dc-sample-blog-nextjs/commit/5ef5fa0))
* **blog:** fix merge conflicts ([91a17c7](https://github.com/amplience/dc-sample-blog-nextjs/commit/91a17c7))
* **blog:** switching blog article main image to use picture component ([ee81176](https://github.com/amplience/dc-sample-blog-nextjs/commit/ee81176))
* **blog card:** linking blog cards to blog page ([4e09360](https://github.com/amplience/dc-sample-blog-nextjs/commit/4e09360))
* **blog card:** updating card spacings ([6bd1053](https://github.com/amplience/dc-sample-blog-nextjs/commit/6bd1053))
* **blog header:** adding background image and adding 2 col grid for smaller displays ([08d18ea](https://github.com/amplience/dc-sample-blog-nextjs/commit/08d18ea))
* **blog hero banner:** updating blog hero banner and author styles ([0eabaca](https://github.com/amplience/dc-sample-blog-nextjs/commit/0eabaca))
* **blog list:** adding proper wire styles for blog cards ([7af54dc](https://github.com/amplience/dc-sample-blog-nextjs/commit/7af54dc))
* **blog list:** converting blog list to use css grid ([957d289](https://github.com/amplience/dc-sample-blog-nextjs/commit/957d289))
* **blog list:** mobile styles for blog list and headings ([1bdc8c5](https://github.com/amplience/dc-sample-blog-nextjs/commit/1bdc8c5))
* **blog list:** provide a message when no blogs are published ([065945c](https://github.com/amplience/dc-sample-blog-nextjs/commit/065945c))
* **blog list:** pulling down blog data and building out blog list wires ([c05ce76](https://github.com/amplience/dc-sample-blog-nextjs/commit/c05ce76))
* **blog list:** styling blog list and cards ([f6ad3ca](https://github.com/amplience/dc-sample-blog-nextjs/commit/f6ad3ca))
* **blog list:** wiring up the blog list to link to the correct blog route ([ea0a07d](https://github.com/amplience/dc-sample-blog-nextjs/commit/ea0a07d))
* **blog list visualization:** updated the visualization to include rendering for the blog list ([1e38e75](https://github.com/amplience/dc-sample-blog-nextjs/commit/1e38e75))
* **blog list visualizations:** added in the title, subtitle and better testing around content types ([04676d5](https://github.com/amplience/dc-sample-blog-nextjs/commit/04676d5))
* **blog post page:** added new components and refactored ([f44dcb3](https://github.com/amplience/dc-sample-blog-nextjs/commit/f44dcb3))
* **blog post page:** added the intial rendering of the blog post page ([0546216](https://github.com/amplience/dc-sample-blog-nextjs/commit/0546216))
* **blog post page:** added video component ([b498095](https://github.com/amplience/dc-sample-blog-nextjs/commit/b498095))
* **blog post page:** more components and styling ([5b9b242](https://github.com/amplience/dc-sample-blog-nextjs/commit/5b9b242))
* **blog post page:** moving styling in components and updating tests ([f5b637e](https://github.com/amplience/dc-sample-blog-nextjs/commit/f5b637e))
* **blog post preview:** allow unpublished blog posts to be previewed ([ce41f0a](https://github.com/amplience/dc-sample-blog-nextjs/commit/ce41f0a))
* **common interfaces:** added some common and blog specific interfaces ([b1820ed](https://github.com/amplience/dc-sample-blog-nextjs/commit/b1820ed))
* **common resources:** moving shared resources into a common directory ([e7ecc6a](https://github.com/amplience/dc-sample-blog-nextjs/commit/e7ecc6a))
* **content:** implementing lazy loading for content sections ([71223dc](https://github.com/amplience/dc-sample-blog-nextjs/commit/71223dc))
* **content and code blocks:** created components and tests ([35735bc](https://github.com/amplience/dc-sample-blog-nextjs/commit/35735bc))
* **content schemas:** updating minlength and required fields ([1fc5db8](https://github.com/amplience/dc-sample-blog-nextjs/commit/1fc5db8))
* **content schemas:** updating minlength and required fields ([ebe9f06](https://github.com/amplience/dc-sample-blog-nextjs/commit/ebe9f06))
* **cookie:** cookie consent banner ([fe78012](https://github.com/amplience/dc-sample-blog-nextjs/commit/fe78012))
* **cookie:** cookie consent banner test ([4aa278e](https://github.com/amplience/dc-sample-blog-nextjs/commit/4aa278e))
* **env var:** BASE_URL --> URL as Netlify passes in URL env when it build & deploys ([a60e84e](https://github.com/amplience/dc-sample-blog-nextjs/commit/a60e84e))
* **env variables:** added some documentation around the new env variable ([7005780](https://github.com/amplience/dc-sample-blog-nextjs/commit/7005780))
* **error page:** wrapping the next error in our layout ([dfd942a](https://github.com/amplience/dc-sample-blog-nextjs/commit/dfd942a))
* **footer:** adding footer component and some additional shared components ([3468b0e](https://github.com/amplience/dc-sample-blog-nextjs/commit/3468b0e))
* **footer:** mobile styles for footer ([48b47e1](https://github.com/amplience/dc-sample-blog-nextjs/commit/48b47e1))
* **google analytics:** added a component for pageviews ([5ef0461](https://github.com/amplience/dc-sample-blog-nextjs/commit/5ef0461))
* **google analytics:** added a component for pageviews ([ab66137](https://github.com/amplience/dc-sample-blog-nextjs/commit/ab66137))
* **header:** added header to blog ([4e98e35](https://github.com/amplience/dc-sample-blog-nextjs/commit/4e98e35))
* **header:** additional work to implement header including tests ([9ec93bd](https://github.com/amplience/dc-sample-blog-nextjs/commit/9ec93bd))
* **header:** updating header styles and renaming header files ([095e3fe](https://github.com/amplience/dc-sample-blog-nextjs/commit/095e3fe))
* **header:** updating header with styles and fixing header bar properly ([8596bf1](https://github.com/amplience/dc-sample-blog-nextjs/commit/8596bf1))
* **hero banner:** adding hero banner component and some resuable styles ([0b47209](https://github.com/amplience/dc-sample-blog-nextjs/commit/0b47209))
* **hero banner:** updated hero banner styles ([7a2c393](https://github.com/amplience/dc-sample-blog-nextjs/commit/7a2c393))
* **hero card:** added hero card with responsive rendering on mobile/desktop ([3b4fecf](https://github.com/amplience/dc-sample-blog-nextjs/commit/3b4fecf))
* **hero card:** first pass at the picture card component ([8a362dd](https://github.com/amplience/dc-sample-blog-nextjs/commit/8a362dd))
* **hero-card:** handle case when there are no blogs ([4ddd9d4](https://github.com/amplience/dc-sample-blog-nextjs/commit/4ddd9d4))
* **hero-card:** merged responsive-images branch ([4d5f3f4](https://github.com/amplience/dc-sample-blog-nextjs/commit/4d5f3f4))
* **image component:** generating srcsets and sizes for optimization ([b4da9fe](https://github.com/amplience/dc-sample-blog-nextjs/commit/b4da9fe))
* **image component:** implement image lazy loading ([c0f81d8](https://github.com/amplience/dc-sample-blog-nextjs/commit/c0f81d8))
* **index page:** loading content from Dynamic Content delivery sdk ([b9f2c12](https://github.com/amplience/dc-sample-blog-nextjs/commit/b9f2c12))
* **layout:** centering and fixing main width on default layout ([f3d6159](https://github.com/amplience/dc-sample-blog-nextjs/commit/f3d6159))
* **layout:** introducing a default layout using material-ui ([f57fe01](https://github.com/amplience/dc-sample-blog-nextjs/commit/f57fe01))
* **layout:** switching to a single root font and some minor style tweaks ([af46cf1](https://github.com/amplience/dc-sample-blog-nextjs/commit/af46cf1))
* **lazy loading:** switching all images to picture and implementing lazy loading for cards ([8e02469](https://github.com/amplience/dc-sample-blog-nextjs/commit/8e02469))
* **markdown:** introducing markdown renderers to give more control over html output ([82c8fb4](https://github.com/amplience/dc-sample-blog-nextjs/commit/82c8fb4))
* **markdown headings:** custom markdown renderer for heading component ([3e4f11c](https://github.com/amplience/dc-sample-blog-nextjs/commit/3e4f11c))
* **masthead:** improving masthead styles for mobile ([4e3f7ce](https://github.com/amplience/dc-sample-blog-nextjs/commit/4e3f7ce))
* **media and images:** added a new interface and component with tests ([f1cb929](https://github.com/amplience/dc-sample-blog-nextjs/commit/f1cb929))
* **microdata:** microdata component for better google integration ([e850cab](https://github.com/amplience/dc-sample-blog-nextjs/commit/e850cab))
* **noindex robots meta tag:** added a configurable tag to blog pages and set others to be noindex ([b4a3d1b](https://github.com/amplience/dc-sample-blog-nextjs/commit/b4a3d1b))
* **picture:** implementing pixel density and webp sources ([898f688](https://github.com/amplience/dc-sample-blog-nextjs/commit/898f688))
* **preview:** adding page loader to prevent page interaction while preview content is loaded ([6370427](https://github.com/amplience/dc-sample-blog-nextjs/commit/6370427))
* **preview:** allow base url to be passed as a url query param to load preview content ([7c21f1a](https://github.com/amplience/dc-sample-blog-nextjs/commit/7c21f1a))
* **pwa:** setup manifest and offline mode for PWA ([19378bc](https://github.com/amplience/dc-sample-blog-nextjs/commit/19378bc))
* **schemas:** added schemas for content types ([473eb98](https://github.com/amplience/dc-sample-blog-nextjs/commit/473eb98))
* **seo:** adding default seo information to the head ([b643916](https://github.com/amplience/dc-sample-blog-nextjs/commit/b643916))
* **share buttons:** added linkedin and twitter share buttons ([eb1f4d6](https://github.com/amplience/dc-sample-blog-nextjs/commit/eb1f4d6))
* **share buttons:** added linkedin and twitter share buttons ([249109b](https://github.com/amplience/dc-sample-blog-nextjs/commit/249109b))
* **static link:** implementing a static link component to avoid unwanted client api calls ([16e1308](https://github.com/amplience/dc-sample-blog-nextjs/commit/16e1308))
* **styling:** adding basic css-loader setup with sass ([1c5ae66](https://github.com/amplience/dc-sample-blog-nextjs/commit/1c5ae66))
* **styling:** correcting more styles to match deesign ([23c141b](https://github.com/amplience/dc-sample-blog-nextjs/commit/23c141b))
* **support other envs:** support additional dc environments ([ec10abb](https://github.com/amplience/dc-sample-blog-nextjs/commit/ec10abb))
* **video component:** added multiple sources to the video component ([cfd8746](https://github.com/amplience/dc-sample-blog-nextjs/commit/cfd8746))
* **visualization:** visualization support (image, text, video blog content types) ([b84fe1a](https://github.com/amplience/dc-sample-blog-nextjs/commit/b84fe1a))
* **visualization:** visualization support for blog post ([0fa4ffb](https://github.com/amplience/dc-sample-blog-nextjs/commit/0fa4ffb))
