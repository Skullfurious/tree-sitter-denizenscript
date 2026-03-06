/**
 * @file A tree-sitter repository that implements Denizen Script (dsc) support.
 * @author Skullfurious
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "denizenscript",
  
  extras: $ => [
      $._comment,
      /[\s\f\uFEFF\u2060\u200B]/, // Standard whitespace (tabs/spaces)
    ],
  
  // Copied from https://github.com/tree-sitter/tree-sitter-python/blob/master/grammar.js implements their scanner.c file.
  externals: $ => [
    $._newline,
    $._indent,
    $._dedent,
    $.string_start,
    $._string_content,
    $.escape_interpolation,
    $.string_end,

    // Allow the external scanner to check for the validity of closing brackets
    // so that it can avoid returning dedent tokens between brackets.
    ']',
    ')',
    '}',
    'except',
  ],

  rules: {
    source_file: $ => repeat($._definition),
    
    _definition: $ => choice(
      $.script_block,
    ),
    
    script_block: $ => seq(
      $.script_name,
      $._indent,
      repeat1($.key_value),
      $._dedent,
    ),
    
    _identifier: $ => /[a-zA-Z0-9_]+/,
    
    key_value: $ => seq(
      $._identifier,
      ':',
      $._identifier,
      $._newline,
    ),
    
    script_name: $ => seq(
      $._identifier,
      ':',
      $._newline
    ),
    
    _comment: $ => token(seq('#', /.*/))
  }
});