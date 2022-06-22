const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs')
const markdownItFootnote = require("markdown-it-footnote");

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

const markdownLib = md.use(markdownItAttrs).use(markdownItFootnote);
markdownLib.renderer.rules.footnote_caption = (tokens, idx) => {
  let n = Number(tokens[idx].meta.id + 1).toString();
  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }
  return n;
};

markdownLib.renderer.rules.footnote_ref = (tokens, idx, options, env, slf )=> {
  var id      = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf );
  var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf );
  var refid  = id;

  if (tokens[idx].meta.subId > 0) {
    refid += ':' + tokens[idx].meta.subId;
  }

  return `<span id="fnref${refid}" class="reference">
            <sup class="footnote-ref">${caption}</sup>
          </span>
          <div id="fnitem${refid}" class="footnote-text"></div>
          `
}
// markdownLib.renderer.rules.footnote_block_open = () => (
//   '<h4>Footnotes Test</h4>\n' +
//   '<section class="footnotes">\n' +
//   '<ol class="footnotes-list">\n'
// );

markdownLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf )=> {
  var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }
  /* ↩ with escape code to prevent display as Apple Emoji on iOS */
  return ' <a href="#fnref' + id + '" class="footnote-backref" aria-label="back to text">\u21a9\uFE0E</a>';
}
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


  eleventyConfig.addTransform("popup_footnote", function(content) {
      // Eleventy 1.0+: use this.inputPath and this.outputPath instead
      //collect all footnotes
      let dom = new JSDOM(content);
      let document = dom.window.document;
      let notes = document.querySelectorAll(".footnote-item");

      // console.log(notes);
      notes.forEach( (el,i) =>{
        let ref = el.querySelector('.footnote-backref');
        ref.remove(); //remove footnote reference

        let key = el.id.replace('fn',''); //get footnote index

        //add footnote HTML to popup placeholder
        let placeholder = document.querySelector('#fnitem'+key);
        placeholder.innerHTML = el.innerHTML;
      });

      content = dom.serialize();

      return content;
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


  // const FOOTNOTE_MAP = []

  // eleventyConfig.addShortcode('ref', function(id, text) {
  //     const key = this.page.inputPath;
  //     const footnote = { id, text };
  //     // console.log(text);

  //     FOOTNOTE_MAP[key] = FOOTNOTE_MAP[key] || {};
  //     FOOTNOTE_MAP[key][id] = footnote;
  //     return `<span id="${id}-ref" aria-describedby="footnotes-label" role="doc-noteref" class="reference">
  //               <span class="ref-no">${id}</span><span class="caption ref-text">${text}</span>
  //             </span>`;
  // });


  //custom collections

  eleventyConfig.addCollection("toc", collection => {
      const articles = collection.getFilteredByTag("article")
        .sort((a, b) => {
          return Number(a.data.chapter) - Number(b.data.chapter);
        });
      return articles;
    });


  // eleventyConfig.addFilter(
  //   'footnotes', 
  //   // The first argument is the value the filter is applied to,
  //   // which is irrelevant here.
  //   (_, page) => Object.values(FOOTNOTE_MAP[page.inputPath] || {})
  // )

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_layouts"
    }
  }
};