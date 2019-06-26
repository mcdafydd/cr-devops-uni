---
title: "CLEAResult Devops University"
---

# Getting Started

This site consist of a series of exercises that teach the basics of setting up your tools and learning to work effectively at CLEAresult as a software developer, or as anyone who needs to consume services offered by CLEAResult IT.  Each level will teach a new skill and may add some new measure of new complexity.  This site will aim to document

If there's anything missing that you would like to see added to the site, please reach out to [devops@clearesult.com](mailto:devops@clearesult.com).

# How This Site is Built

This site is built with modern web technologies. It uses the following:

* Progressive web application (HTTP/2, push definitions, manifest, installable, etc.)
* Lit-Element (Polymer 3 based web components - similar to React)
* Hugo - a fast, Golang-based static site generator
* Docker - develop this site the same way on any machine
* [mermaid](https://knsv.github.io/mermaid) - generation of diagram and flowchart from text in a similar manner as markdown

This theme is a partial porting of the [Learn theme](http://learn.getgrav.org/) of [Grav](https://getgrav.org/), a modern flat-file CMS written in PHP. 

Some of the PWA configs were pulled from a [similar site concept](https://github.com/justinribeiro/blog-pwa), thanks open source!

{{% notice tip %}}Learn theme works with a _page tree structure_ to organize content : All contents are pages, which belong to other pages. [read more about this]({{%relref "level1/pages/_index.md"%}}) 
{{% /notice %}}

## Site features

* [Automatic Search]({{%relref "level0/configuration/_index.md#activate-search" %}})
* **Unlimited menu levels**
* **Automatic next/prev buttons to navigate through menu entries**
* [Image resizing, shadow...]({{%relref "level1/markdown.en.md#images" %}})
* [Customizable look and feel and themes variants]({{%relref "level0/style-customization/_index.md"%}})
* Supports [Multilingual mode]({{%relref "level1/i18n/_index.md" %}}), but we aren't using that today

![Screenshot](https://github.com/matcornic/hugo-theme-learn/raw/master/images/screenshot.png?width=40pc&classes=shadow)

## Contribute to this documentation
Feel free to update this content, just click the **Edit this page** link displayed on top right of each page, and pullrequest it

{{% notice info %}}
Your modification will be deployed automatically when merged.
{{% /notice %}}

## Documentation website
This current documentation has been statically generated with Hugo with a simple command : `hugo -t hugo-theme-learn` -- source code is [available here at GitHub](https://github.com/matcornic/hugo-theme-learn)

{{% notice note %}}
Automatically published and hosted thanks to [Netlify](https://www.netlify.com/). Read more about [Automated HUGO deployments with Netlify](https://www.netlify.com/blog/2015/07/30/hosting-hugo-on-netlifyinsanely-fast-deploys/)
{{% /notice %}}


## Other stuff

Link to CLEAResult hackathon on MS Stream
