# Who Are We Now?

This website uses the [11y](https://www.11ty.dev/) static site generator to compile source files into website files.

All source files are located within the `src` folder, and the output files are in the `docs` folder.

# File Structure

## Content
All text content is organized semantically in folders within the `src` folder. This structure will map to the URL of how the rendered HTML will be accessed.

```
preface
introduction
part-1
  └ chapter-01
  │  ├ index.md
  │  ├ plots.json
  │  └ figures
  │
  └ chapter-02
  └ chapter-03
part-2
  └ chapter-04
...
```

Each chapter has a `index.md` file containing the content for that chapter as well as some meta data in the front matter.

```yaml
---
chapter: 1
title: Whom to believe?
layout: chapter
---
```

#### Chapter

`chapter`: The numerical chapter number

#### Title
`title`: The title of the Chapter

#### Layout
`layout`: This will always be set to `chapter`
(Layouts are determined in the `_layous` folder, using the `liquid` template language.)


## Plots
`src/assets/data`
This folder contains

`plot-index.json`
- This file contains some basic meta data for each plot

#### Id
`genderhandedr`: The object keys are the `id`s inserted into the `<figure>` tags generated, and are used to associate the appropriate `json` data from the `/assets/data` folder.

They have been generated based off of the naming of the original `json` file.

```json
"genderhandedr": {
	"plot_key": 1.3,
	"title": "Sample Title",
	"file": "Ch01_Fig002_GenderHandedR.json",
	"colors": ["orange", "green", "violet", "blue"]
},
```
#### Plot Key
`plot_key`: A numerical identifier for the plot.
We will be using this identifier in the search feature, as well as to connect figures in the book to that online.
It follows the format of [`chapternumber`.`plotnumber`]
```json
"plot_key": 1.1,
```

#### Plot Title
`title`
The title for the plot. Although it may be redundant with the surrounding language, they serve as semantic and visual markers within the page.

```json
"title": "Plot Title",
```

#### File Path
`file`
The file name for the relevant `json`.

```json
"file": "Ch01_Fig001_HandedLR.json",
```

#### Colors
`colors`
An array for the colors to be used on the plot, in the order they should be applied across the series. The options available are: `"orange"` `"green"` `"blue"` `"pink"` `"red"` `"dark-blue"` `"violet"`.

The actual color values are determined by the `_sass/_colors.scss` file.

```json
"colors": ["orange", "green"]
```


## Survey Questions
`src/_data`
This folder data files to be processed at site generation and is different from the `assets/data` folder (below) which contains files to be accessible on the client-side for interactivity purposes.

The `_data` folder contains:

`questions.json`
- This is an array of survey questions, keyed by part (`I, II, III`)
- To do: use this to create a participant survey, showcasing live results on existing plots


# Local Development

### Prerequisites
You must have [node.js](https://nodejs.org/en/) installed.

### Installation

`cd /path/to/this/repo` to navigate to where you cloned this repository.

`npm install` to install the necessary dependencies to run the site. (Dependencies are managed in the `package.json` file, under the `devDependencies` key.)


### Serving and Building

`npm start` to start a local server (default is at `http://localhost:8080`) with live reload enabled.

`npm build` to simply build into the output directory (`docs`) from the source files. 

Note: 11ty will not clear the output before building. To clear a previous version after structural changes, delete the `docs` folder prior to running these commands.

# Notes

## TO DO
- JavaScript events and interactivity for plots, test use of CSS transitions for animation purposes

## D3 Resources

- [D3 Documentation](https://github.com/d3/d3/wiki)

