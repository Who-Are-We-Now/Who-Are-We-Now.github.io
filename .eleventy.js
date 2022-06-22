const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs')
const {parse} = require('csv-parse/sync');
const fs = require("fs");

const figures = require("./src/_data/figures.json"); //read in figures index file


function readCSV() {
  const input = fs.readFileSync("./src/_data/plots_web.csv", "utf8");
  // console.log(input);
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log(`${records.length} records found.`);
  return records;
}

const plots = readCSV();
  
// Add within your config module
const md = new markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
});
const markdownLib = md.use(markdownItAttrs);


module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.setBrowserSyncConfig({
    files: './docs/assets/css/*.css'
  });

  //markdown processing
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addFilter("markdown", (content) => {
    return md.renderInline(content); 
  });

  // custom shortcodes

  eleventyConfig.addShortcode('img', function(id) { /*main*/
    let img = figures[id];
    if(img){
      return `<figure class="main">
                <img src="/assets/figures/${img.chapter}/${img.file}" alt="${img.alt}" title="${img.alt}"/>
                <figcaption>${img.caption}</figcaption>
              </figure>`;
          }
  });

  eleventyConfig.addShortcode('plot', function(label, colors) {      
      return `<figure class="plot" id="${label}" data-colors="${colors}">
              </figure>`;
  });


  const FOOTNOTE_MAP = []

  eleventyConfig.addShortcode('ref', function(id, text) {
      const key = this.page.inputPath;
      const footnote = { id, text };
      // console.log(text);

      FOOTNOTE_MAP[key] = FOOTNOTE_MAP[key] || {};
      FOOTNOTE_MAP[key][id] = footnote;
      return `<span id="${id}-ref" aria-describedby="footnotes-label" role="doc-noteref" class="reference">
                <span class="ref-no">${id}</span><span class="caption ref-text">${text}</span>
              </span>`;
  });


  //custom collections

  eleventyConfig.addCollection("toc", collection => {
      const articles = collection.getFilteredByTag("article")
        .sort((a, b) => {
          return Number(a.data.chapter) - Number(b.data.chapter);
        });
      return articles;
    });


  eleventyConfig.addFilter(
    'footnotes', 
    // The first argument is the value the filter is applied to,
    // which is irrelevant here.
    (_, page) => Object.values(FOOTNOTE_MAP[page.inputPath] || {})
  )

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_layouts"
    }
  }
};