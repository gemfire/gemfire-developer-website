# VMware Tanzu Developer Portal

## Building the Site

The VMware Tanzu Developer Portal uses [Hugo](https://gohugo.io/) to build the site from Markdown files. You'll need to [get Hugo](https://gohugo.io/getting-started/installing/) if you want to build and run the site locally.

### Run locally

To install the latest version of `hugo` you can use `brew install hugo` if you are on a Mac. 

Now you're ready to build locally:

```bash
git clone https://github.com/gemfire/tanzu-gemfire-developer-website.git
cd tanzu-gemfire-developer-website
git submodule update --init --recursive
hugo server
```



### Markdown Tricks
This website has some useful Markdown syntax and tricks.

https://www.markdownguide.org/basic-syntax/

