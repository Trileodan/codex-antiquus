/* Content globs for the static Tailwind build that produces vendor/tailwind.css.
   Rebuild after adding utility classes the current sheet does not cover:

     npx tailwindcss@3 -c tools/tailwind.config.js -i tools/tailwind-input.css \
       -o vendor/tailwind.css --minify

   Tailwind's extractor scans raw text, so classes inside template literals
   (`${cond ? "hcg-panel" : "hcg-lockedcard"}`) are picked up as long as each
   branch is a literal string. Never build a class name by concatenation. */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: { extend: {} },
  corePlugins: { preflight: true },
};
