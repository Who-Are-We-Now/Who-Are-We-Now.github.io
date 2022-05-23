const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs')

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

  eleventyConfig.addShortcode('img', function(caption, path) {
      let chapter = this.page.filePathStem.split('/')[2];
      return `<figure class="periphery">
                <img src="/assets/figures/${chapter}/${path}" alt="${caption}" title="${caption}"/>
                <figcaption>${caption}</figcaption>
              </figure>`;
  });


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