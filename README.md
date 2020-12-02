# VMware Tanzu Developer Portal

## Building the Site

The VMware Tanzu Developer Portal uses [Hugo](https://gohugo.io/) to build the site from Markdown files. You'll need to [get Hugo](https://gohugo.io/getting-started/installing/) if you want to build and run the site locally.

### Run the site locally

To install the latest version of `hugo` you can use `brew install hugo` if you are on a Mac. 

Now you're ready to build locally:

```bash
git clone https://github.com/gemfire/tanzu-gemfire-developer-website.git
cd tanzu-gemfire-developer-website
git submodule update --init --recursive
hugo server
```
---

## Contributing Content

You may contribute content by creating a branch (or fork) and submitting a pull request. Content should be written in Markdown with metadata included in the front matter (the section at the top). Here are some guidelines to get you started:

### Blogs

#### Creating a new blog

If you are an existing author, please place your blog in your respective folder.  If you are new contributor, please create a new directory with your name, and put your blog post in that directory.

There are two ways to add a new blog:

1.  You can use the [Archetypes](https://gohugo.io/content-management/archetypes/) feature of Hugo to create a new blog post:

    `hugo new blog/[yourDirectory]/[the-name-of-your-blog-post].md`

    This will create a new blog post in your directory.  

2.  You can copy and paste from a previous blog post.  Just remember to update the required information.


#### Metadata / Front Matter 

Blog posts require a title, description, date, and author(s).  This is found in the front matter, which is the top portion of every blog.  Note that if you use a future date for publishing, you will need to use the `-F` flag to see the post when running `hugo` or `hugo server` to build the site on your local machine.

```
title: "Your awesome title"
description: >
        A short description of the blog post
date: 1970-01-31
authors: 
- Your Name(s)
type: blog
featured: 
```

### Images
All images are stored under `static/images`. Images should be placed in the  `static/images/blog/...` directory. The filename should include the author name, date of the blog post, and a 1-2 word description (this allows us to easily find the correct images in the future if something goes wrong). 

* Diagram images should be placed in the `diagrams` folder.  This will give the image an added border around it for visibility. 
* If the image is not a diagram, it should be placed in `screenshots`.

#### Using the image in your blog post 
To use the img in your blog post use the following syntax


`![Some Brief Text To Describe Your Image](/images/blog/diagrams/your-file.png).`

### Code Examples
As many blog posts will use code examples, Hugo also has the ability handle syntax highlighting based on the programming language used (intelliJ offers some options to help with this).  While the syntax highlighting will not render in the IDE, it WILL render correctly on the website.

* **Java**

    Start with ` ```java ` at the top of your code block and then close the code block  with ` ``` `.

* **Gradle Build File Example**

    Start with ` ```groovy ` at the top of your code block and then close the code block with  ` ``` `.

* **Maven POM File Example**

    Start with ` ```xml ` at the top of your code block and then close the code block with ` ``` `.

### Markdown Basic Syntax 
Goldmark is the default library used for Markdown. It's fast and it is CommonMark compliant. 

This website has some useful Markdown syntax and tricks.

https://www.markdownguide.org/basic-syntax/

