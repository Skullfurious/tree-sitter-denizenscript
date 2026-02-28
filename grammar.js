/**
 * @file A tree-sitter repository that implements Denizen Script (dsc) support.
 * @author Skullfurious
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "denizenscript",
  // Copied from https://github.com/tree-sitter/tree-sitter-python/blob/master/grammar.js implements their scanner.c file.
  externals: $ => [
    $._newline,
    $._indent,
    $._dedent,
    $.string_start,
    $._string_content,
    $.escape_interpolation,
    $.string_end,

    // Mark comments as external tokens so that the external scanner is always
    // invoked, even if no external token is expected. This allows for better
    // error recovery, because the external scanner can maintain the overall
    // structure by returning dedent tokens whenever a dedent occurs, even
    // if no dedent is expected.
    $.comment,

    // Allow the external scanner to check for the validity of closing brackets
    // so that it can avoid returning dedent tokens between brackets.
    ']',
    ')',
    '}',
    'except',
  ],
  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
