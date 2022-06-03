const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs')

const figures = require("./src/_data/figures.json"); //read in figures index file

// Add within your config module
const md = new markdownIt({
  html: true,
  linkify: false
});

const markdownLib = md.use(markdownItAttrs)

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.setBrowserSyncConfig({
    files: './docs/assets/css/*.css'
  });

  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.addFilter("markdown", (content) => {
    return md.renderInline(content); 
  });

  eleventyConfig.addShortcode('img', function(id) { /*main*/
    let chapter = this.page.filePathStem.split('/')[2];
    let img = figures[id];
    return `<figure class="main">
              <img src="/assets/figures/${chapter}/${img.file}" alt="${img.alt}" title="${img.alt}"/>
              <figcaption>${img.caption}</figcaption>
            </figure>`;
  });

  // eleventyConfig.addShortcode('img2', function(caption, path) { /*periphery*/
  //   let chapter = this.page.filePathStem.split('/')[2];
  //   return `<figure class="periphery">
  //             <img src="/assets/figures/${chapter}/${path}" alt="${caption}" title="${caption}"/>
  //             <figcaption>${caption}</figcaption>
  //           </figure>`;
  // });

  eleventyConfig.addShortcode('plot', function(label) {      
      return `<figure class="plot" id="${label}">
                ${label}
              </figure>`;
  });
  // eleventyConfig.addFilter("markdown", (content) => {
  //   return md.render(content);
  // });


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


  // eleventy.addCollection('toc', function(config) {
  //     return collections.article
  //         .sort((a, b) => b.data.chapter - a.data.chapter);
  // });
  eleventyConfig.addCollection("toc", collection => {
      const articles = collection.getFilteredByTag("article")
        .sort((a, b) => {
          return Number(a.data.chapter) - Number(b.data.chapter);
        });
      return articles;
    });

  // eleventyConfig.addFilter('sortByChapter', values => {
  //   return values.slice().sort((a, b) => a.data.chapter.localeCompare(b.data.chapter))
  // });
  // eleventyConfig.addCollection("p1_ch", function(collection) {
  //   return collection.getFilteredByGlob("src/part-1/chapter-*/index.md");
  // });
  // eleventyConfig.addCollection("p2_ch", function(collection2) {
  //   return collection2.getFilteredByGlob("src/part-2/chapter-*/index.md");
  // });
  // eleventyConfig.addCollection("p2_in", function(collection2) {
  //   return collection2.getFilteredByGlob("src/part-2/interlude/index.md");
  // });


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