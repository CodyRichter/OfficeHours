const prismLanguages = [
    { value: "markup", label: "Markup" },
    { value: "css", label: "CSS" },
    { value: "clike", label: "C-like" },
    { value: "javascript", label: "JavaScript" },
    { value: "abap", label: "ABAP" },
    { value: "actionscript", label: "ActionScript" },
    { value: "ada", label: "Ada" },
    { value: "apacheconf", label: "Apache Configuration" },
    { value: "apl", label: "APL" },
    { value: "applescript", label: "AppleScript" },
    { value: "arduino", label: "Arduino" },
    { value: "arff", label: "ARFF" },
    { value: "asciidoc", label: "AsciiDoc" },
    { value: "asm6502", label: "6502 Assembly" },
    { value: "aspnet", label: "ASP.NET (C#)" },
    { value: "autohotkey", label: "AutoHotkey" },
    { value: "autoit", label: "AutoIt" },
    { value: "bash", label: "Bash" },
    { value: "basic", label: "BASIC" },
    { value: "batch", label: "Batch" },
    { value: "bison", label: "Bison" },
    { value: "brainfuck", label: "Brainfuck" },
    { value: "bro", label: "Bro" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "coffeescript", label: "CoffeeScript" },
    { value: "clojure", label: "Clojure" },
    { value: "crystal", label: "Crystal" },
    { value: "csp", label: "Content-Security-Policy" },
    { value: "css-extras", label: "CSS Extras" },
    { value: "d", label: "D" },
    { value: "dart", label: "Dart" },
    { value: "diff", label: "Diff" },
    { value: "django", label: "Django/Jinja2" },
    { value: "docker", label: "Docker" },
    { value: "eiffel", label: "Eiffel" },
    { value: "elixir", label: "Elixir" },
    { value: "elm", label: "Elm" },
    { value: "erb", label: "ERB" },
    { value: "erlang", label: "Erlang" },
    { value: "fsharp", label: "F#" },
    { value: "flow", label: "Flow" },
    { value: "fortran", label: "Fortran" },
    { value: "gedcom", label: "GEDCOM" },
    { value: "gherkin", label: "Gherkin" },
    { value: "git", label: "Git" },
    { value: "glsl", label: "GLSL" },
    { value: "gml", label: "GameMaker Language" },
    { value: "go", label: "Go" },
    { value: "graphql", label: "GraphQL" },
    { value: "groovy", label: "Groovy" },
    { value: "haml", label: "Haml" },
    { value: "handlebars", label: "Handlebars" },
    { value: "haskell", label: "Haskell" },
    { value: "haxe", label: "Haxe" },
    { value: "http", label: "HTTP" },
    { value: "hpkp", label: "HTTP Public-Key-Pins" },
    { value: "hsts", label: "HTTP Strict-Transport-Security" },
    { value: "ichigojam", label: "IchigoJam" },
    { value: "icon", label: "Icon" },
    { value: "inform7", label: "Inform 7" },
    { value: "ini", label: "Ini" },
    { value: "io", label: "Io" },
    { value: "j", label: "J" },
    { value: "java", label: "Java" },
    { value: "jolie", label: "Jolie" },
    { value: "json", label: "JSON" },
    { value: "julia", label: "Julia" },
    { value: "keyman", label: "Keyman" },
    { value: "kotlin", label: "Kotlin" },
    { value: "latex", label: "LaTeX" },
    { value: "less", label: "Less" },
    { value: "liquid", label: "Liquid" },
    { value: "lisp", label: "Lisp" },
    { value: "livescript", label: "LiveScript" },
    { value: "lolcode", label: "LOLCODE" },
    { value: "lua", label: "Lua" },
    { value: "makefile", label: "Makefile" },
    { value: "markdown", label: "Markdown" },
    { value: "markup-templating", label: "Markup templating" },
    { value: "matlab", label: "MATLAB" },
    { value: "mel", label: "MEL" },
    { value: "mizar", label: "Mizar" },
    { value: "monkey", label: "Monkey" },
    { value: "n4js", label: "N4JS" },
    { value: "nasm", label: "NASM" },
    { value: "nginx", label: "nginx" },
    { value: "nim", label: "Nim" },
    { value: "nix", label: "Nix" },
    { value: "nsis", label: "NSIS" },
    { value: "objectivec", label: "Objective-C" },
    { value: "ocaml", label: "OCaml" },
    { value: "opencl", label: "OpenCL" },
    { value: "oz", label: "Oz" },
    { value: "parigp", label: "PARI/GP" },
    { value: "parser", label: "Parser" },
    { value: "pascal", label: "Pascal" },
    { value: "perl", label: "Perl" },
    { value: "php", label: "PHP" },
    { value: "php-extras", label: "PHP Extras" },
    { value: "plsql", label: "PL/SQL" },
    { value: "powershell", label: "PowerShell" },
    { value: "processing", label: "Processing" },
    { value: "prolog", label: "Prolog" },
    { value: "properties", label: ".properties" },
    { value: "protobuf", label: "Protocol Buffers" },
    { value: "pug", label: "Pug" },
    { value: "puppet", label: "Puppet" },
    { value: "pure", label: "Pure" },
    { value: "python", label: "Python" },
    { value: "q", label: "Q (kdb+ database)" },
    { value: "qore", label: "Qore" },
    { value: "r", label: "R" },
    { value: "jsx", label: "React JSX" },
    { value: "tsx", label: "React TSX" },
    { value: "renpy", label: "Ren'py" },
    { value: "reason", label: "Reason" },
    { value: "rest", label: "reST (reStructuredText)" },
    { value: "rip", label: "Rip" },
    { value: "roboconf", label: "Roboconf" },
    { value: "ruby", label: "Ruby" },
    { value: "rust", label: "Rust" },
    { value: "sas", label: "SAS" },
    { value: "sass", label: "Sass (Sass)" },
    { value: "scss", label: "Sass (Scss)" },
    { value: "scala", label: "Scala" },
    { value: "scheme", label: "Scheme" },
    { value: "smalltalk", label: "Smalltalk" },
    { value: "smarty", label: "Smarty" },
    { value: "sql", label: "SQL" },
    { value: "soy", label: "Soy (Closure Template)" },
    { value: "stylus", label: "Stylus" },
    { value: "swift", label: "Swift" },
    { value: "tap", label: "TAP" },
    { value: "tcl", label: "Tcl" },
    { value: "textile", label: "Textile" },
    { value: "tt2", label: "Template Toolkit 2" },
    { value: "twig", label: "Twig" },
    { value: "typescript", label: "TypeScript" },
    { value: "vbnet", label: "VB.Net" },
    { value: "velocity", label: "Velocity" },
    { value: "verilog", label: "Verilog" },
    { value: "vhdl", label: "VHDL" },
    { value: "vim", label: "vim" },
    { value: "visual-basic", label: "Visual Basic" },
    { value: "wasm", label: "WebAssembly" },
    { value: "wiki", label: "Wiki markup" },
    { value: "xeora", label: "Xeora" },
    { value: "xojo", label: "Xojo (REALbasic)" },
    { value: "xquery", label: "XQuery" },
    { value: "yaml", label: "YAML" },
];

export default prismLanguages;