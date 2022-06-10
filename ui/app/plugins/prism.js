import Prism from "prismjs";

// Include a theme:
import "~/assets/styles/prism-one-dark.css";

// Include the toolbar plugin: (optional)
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";

// Include the line numbers plugin: (optional)
// import "prismjs/plugins/line-numbers/prism-line-numbers";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// Include the line highlight plugin: (optional)
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";

// Include some other plugins: (optional)
//import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "~/plugins/prism-copy-to-clipboard";
import "prismjs/plugins/highlight-keywords/prism-highlight-keywords";

// Include additional languages
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-javascript.js";

// Set vue SFC to markdown
Prism.languages.vue = Prism.languages.markup;

export default Prism;
