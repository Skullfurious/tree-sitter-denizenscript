/**
 * @file A tree-sitter repository that implements Denizen Script (dsc) support.
 * @author Skullfurious
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "denizenscript",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
