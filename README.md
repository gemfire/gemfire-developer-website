

- [About The Project](#about-the-project)
  - [Site Built With](#site-built-with)
- [Getting Started Building a Local Deployment of the GemFire Developer Center](#getting-started-building-a-local-deployment-of-the-gemfire-developer-center)
  - [Software Installation Prerequisites](#software-installation-prerequisites)
  - [Run a Local Copy of the GemFire Developer Center](#run-a-local-copy-of-the-gemfire-developer-center)
- [Troubleshooting](#troubleshooting)
  - [Q. I'm receiving an error about cloning `themes/docsy`](#q-im-receiving-an-error-about-cloning-themesdocsy)
  - [Q. `make preview` is throwing a `fatal error: pipe failed` error](#q-make-preview-is-throwing-a-fatal-error-pipe-failed-error)
  - [Q. I am on Windows and `make preview` doesn't work](#q-i-am-on-windows-and-make-preview-doesnt-work)
- [Contributing Content](#contributing-content)
- [Code of Conduct](#code-of-conduct)



## About The Project


The VMware GemFire Developer Center is a site specifically built to be a great resource for GemFire users. 

Our guiding principle is to ensure readers have free, immediate access to all the content on the GemFire Developer Center. No purchase is ever necessary to access content on the GemFire Developer Center because it is either open source or an easily accessible trial.


## Getting Started Building a Local Deployment of the GemFire Developer Center

Before you can build a local copy of the GemFire Developer Center, there are software prerequisites that you’re going to need to install. 

_Note: The instructions below are primarily designed for Mac users. While you should be able to make things work on Windows as well, it may require a few additional steps. (For example, using `make` should work natively on a Mac with Xcode dev tools installed, but requires a [special installation](https://gnuwin32.sourceforge.net/packages/make.htm) for Windows._

### Requirements for Local Development / Build

* [Hugo](https://gohugo.io)
* [npm](https://www.npmjs.com)
* [Docker](https://docs.docker.com/get-docker/)
* [make] (https://www.gnu.org/software/make/)

### Software Installation Prerequisites

* **Install Hugo** — The VMware GemFire Developer Center uses [Hugo](https://gohugo.io/) to build the site from Markdown files. You'll need to [get Hugo](https://gohugo.io/getting-started/installing/) if you want to build and run the site locally. Make sure you install the extended version with support for SCSS/SASS. This site pins `hugo` to a specific version (currently **0.110.0**) to build so if you're using a different version, your experience may vary. To install `hugo`, follow the instructions for your specific environment as detailed in the [hugo documentation](https://gohugo.io/installation/). Ultimately, you have two main options: 

   - Download the correct *extended* binary for your OS from [gohugo GitHub releases page for 0.110.0](https://github.com/gohugoio/hugo/releases/tag/v0.110.0) and then move the `hugo` binary to an appropriate location (ie. `sudo cp hugo /usr/local/bin`) and/or add it to your `PATH`.

* **Install Node (and NPM)** — Certain features of the site require Node in order to build (PostCSS, Autoprefixer, etc.), and the Node Package Manager (npm) is also used to manage local packages. If you don’t already have Node installed, you’ll need it in order to build the site. Though it may work with different versions, you should use Node 16+ and npm 8 (the corresponding version that comes with Node 16). You may [download and install Node](https://nodejs.org/en/download/current/) or use `brew` to install it:

     ```sh
     brew install node@16
     ```

* **Install Docker** — Docker builds images for local automated tests. You can download [Docker Desktop](https://www.docker.com/products/docker-desktop/) or use `brew`:

     ```sh
     brew install docker --cask
     ```

_Note: Mac OS X requires Docker Desktop 2.4 or later_

### Run a Local Copy of the GemFire Developer Center

To get a local copy of the GemFire Developer Center up and running, follow these steps:

1. Clone the repository.

     ```sh
     git clone --recurse-submodules https://github.com/gemfire/gemfire-developer-website
     ```

2. (option 1) Build a preview of the website with the Makefile. The website will be available at [`http://localhost:1313/developer`](http://localhost:1313/developer).
    
     ```sh
     make preview
     ```

2. (option 2) Build a preview of the website using Hugo's build command. The website will be available at [`http://localhost:1313/developer`](http://localhost:1313/developer).

  ```sh
    hugo -b http://localhost:1313/
  ```


## Troubleshooting

### Q. I'm receiving an error about cloning `themes/docsy`

With the change with how the theme files are overridden, the first time you update your branch you may see the following issue when running `make preview`:

```
git submodule update --init --recursive
Submodule 'themes/docsy' (https://github.com/google/docsy.git) registered for path 'themes/docsy'
fatal: not a git repository: /private/tmp/gemfire-developer-website/themes/docsy/../../.git/modules/themes/docsy
Failed to clone 'themes/docsy'. Retry scheduled
BUG: submodule considered for cloning, doesn't need cloning any more?
fatal: could not get a repository handle for submodule 'themes/docsy'
make: *** [theme] Error 1
```

You can run the following command for a one-time fix:

```
rm -rf .git/modules && rm -rf themes/docsy && mkdir themes/docsy
```

### Q. `make preview` is throwing a `fatal error: pipe failed` error

This is due to the number of files that are opened during the process of building the site. If you're on OSX, this can be addressed with the following command:

```
sudo launchctl limit maxfiles 65535 200000
ulimit -n 65535
sudo sysctl -w kern.maxfiles=100000
sudo sysctl -w kern.maxfilesperproc=65535
```

### Q. I am on Windows and `make preview` doesn't work

On Windows, you may need to use `hugo server -D` to start the application. The site will then be available on `http://localhost:1313/`


## Contributing Content

The content contribution process is documented fully on our [Confluence Page] (https://confluence.eng.vmware.com/display/TGF/Contributing+to+gemfire.dev).

## Code of Conduct

We, the Admin team of the GemFire Developer Center adhere to a code of conduct that you can read more about here: <code>[CODE_OF_CONDUCT.md](https://github.com/gemfire/gemfire-developer-website/blob/main/CODE_OF_CONDUCT.md)</code>
