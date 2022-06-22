// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

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

  //footnote popups
  // eleventyConfig.addTransform("popup_footnote", function(content) {
  //     //collect all footnotes
  //     let dom = new JSDOM(content);
  //     let document = dom.window.document;
  //     let notes = document.querySelectorAll(".footnote-item");

  //     // console.log(notes);
  //     notes.forEach( (el,i) =>{
  //       let ref = el.querySelector('.footnote-backref');
  //       ref.remove(); //remove footnote reference

  //       let key = el.id.replace('fn',''); //get footnote index

  //       //add footnote HTML to popup placeholder
  //       let placeholder = document.querySelector('#fnitem'+key);
  //       placeholder.innerHTML = el.innerHTML;
  //     });

  //     content = dom.serialize();

  //     return content;
  //   });


  // custom shortcodes
  eleventyConfig.addPairedShortcode('img', function(content, id){
    let img = figures[id];
    if(img){
      //append to figures column
      return `<div class="cols"><div class="col">${content}</div><div class="col image"><figure class="main"><img src="/assets/figures/${img.chapter}/${img.file}" alt="${img.alt}" title="${img.alt}"/> <figcaption>${img.caption}</figcaption></figure></div></div>`; }
  });

  eleventyConfig.addShortcode('plot', function(label, colors) {      
      return `<figure class="plot" id="${label}" data-colors="${colors}">
              </figure>`;
  });


  //custom collections

  eleventyConfig.addCollection("toc", collection => {
      const articles = collection.getFilteredByTag("article")
        .sort((a, b) => {
          return Number(a.data.chapter) - Number(b.data.chapter);
        });
      return articles;
    });


  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_layouts"
    }
  }
};