# Strikeout
A HTML5 cloud-synced task manager

## Philosophy
### Why is this better than &lt;another task manager&gt;?
* It's faster and smaller, no clutter
* No features you don't need
* Code a feature, fix a bug, it's open source
* Sync all your devices using Dropbox

### What it should do (Alpha features)
* ☑ Load fast
* ☐ Load faster on mobile
* ☑ Nice flat UI
* ☑ No fancy graphics and stuff that makes it load slowly
* ☑ Responsive, so it works on your phone too
* ☑ Wunderlist import
* ☑ Tick off items
* ☑ Delete items
* ☑ Create items
* ☑ Create lists
* ☑ Overview of all lists
* ☐ Edit text of items
* ☐ Edit text of lists
* ☐ Manual re-ordering of lists
* ☐ Manual re-ordering of items
* ☐ Re-organize items into other lists

### What it should do, sometime, in the future (Beta features)
* Automatic recognition of hyperlinks
* Offline mode when there's no internet
* Dates for items
* Inline previews of hyperlinks, like on Twitter
* Other data providers (local database?)

### What it shan't do in the near future
* Multiple user accounts
* Any user accounts at all
* Labels or tags or favorites or whatever, just organize in lists
* Search
* Fancy sharing and printing of tasks
* Audio dictation
* Heavy background images

## Installation and local development

### Requirements
* Node / NPM
* Bower
* Grunt
* [Compass](compass-style.org)

### Local development
* To do development on the SCSS files you need to run `compass watch` in the root directory to re-compile the files to CSS
* You need to run a `bower install` once in the root to install the libraries

### Make a production version
* Note that for the production version your webserver *must* serve files over https
* Configure a Dropbox datastore app and add the product key to `js/conf.js`
* Do a `npm install` in the root of the directory to get Grunt and all other dependencies
* Run 'grunt' in the root of the project to build the project
* Copy the `dist` folders to your server