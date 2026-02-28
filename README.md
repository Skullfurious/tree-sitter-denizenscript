# Tree Sitter for DenizenScript
### What is this for?
This is a Tree Sitter repository that implements DenizenScript (.dsc). It is used for parsing DenizenScript files.

### How do I use this project?
Tree sitter is used for parsing and you can find more information at this location: https://tree-sitter.github.io/tree-sitter/index.html

### Requirements to use this library:
* Any C Compiler: ```gcc```, ```clang```, ```MSVC```, etc.
* NodeJS / NPM | 11.11.0 or later: https://nodejs.org/en/download/
* Tree Sitter | 0.26.6 or later: ```npm install tree-sitter-cli --save-dev```

### How to contribute?
The two main files that are modified by the repository are:
* `./src/scanner.c`
* `./grammar.js`

Note that in the future grammar may be broken up into a subdirectory named `./grammar/`.

### Attribution
* NodeJS/NPM: https://nodejs.org
* Tree Sitter Project: https://github.com/tree-sitter/tree-sitter
* Tree Sitter Discord Commmunity: https://discord.gg/w7nTvsVJhm
* Denizen Project: https://github.com/DenizenScript/Denizen
* Denizen Discord Commmunity: https://discord.gg/Q6pZGSR
* tree-sitter-python: https://github.com/tree-sitter/tree-sitter-python

### License
Uses the MIT license.
