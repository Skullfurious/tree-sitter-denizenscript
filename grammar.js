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
      $.comment,
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
    $.comment,
    // Allow the external scanner to check for the validity of closing brackets
    // so that it can avoid returning dedent tokens between brackets.
    ']',
    ')',
    '}',
    'except',
  ],

  rules: {
    source_file: $ => repeat($._definition),
    
    // General Rules
    comment: $ => token(seq('#', /.*/)), // Detects comments
    _identifier: $ => /[a-zA-Z0-9_]+/,
    
    // Entrypoint Rule
    _definition: $ => choice(
      $.script_container_block,
    ),
    
    // Block Rules
    script_container_block: $ => seq(
      $.script_name,
      $._indent,
      repeat1(choice($.key_value_block, $.key_list_block, $.key_map_block)),
      $._dedent,
    ),
    
    // Block just means it is a parsed group in this context.
    key_value_block: $ => prec(1, seq(
      $.key_component,
      $.value_component,
      $._newline,
    )),
    
    // Checks if it's a key that begins a list.
    key_list_block: $ => seq(
      $.key_component,
      $._newline,
      $._indent,
      repeat1($.list_item),
      $._dedent,
    ),
    
    // Checks if it's a key map that begins a list that contains more key/value blocks.
    key_map_block: $ => seq(
      $.key_component,
      $._newline,
      $._indent,
      repeat1($.key_value_block),  // ← key/value pairs instead of list items
      $._dedent,
    ),
    
    // Script Components Rules
    // Note that some rules may be identical but they are context sensitive and used for component identification.
    script_name: $ => seq(
      $._identifier,
      ':',
      $._newline
    ),
    
    key_component: $ => seq(
      $._identifier,
      ':',
    ),
    
    // This just consumes the rest of the data on the current line. It's very greedy and can cause issues.
    value_component: $ => /[^\n]+/,
    
    list_item: $ => seq(
      '-',
      $.command_body,
      $._newline,
    ),
    
    // Greedy Catchall, can be expanded for proper tag detection.
    command_body: $ => /[^\n]+/,
    
    // THESE ARE NOT USED YET, PLACEHOLDERS..
    // Tags are recursive so this is a little hard to follow. The gist of it is we check for <any.tag.like.this>
    // Tag components can be <blah> or <[blah]>.
    tag_component: $ => seq(
      '<',
      $.tag_content,
      '>'
    ),
    
    // Tag content <can.look.like.th_is> or <like.this[blah]>
    tag_content: $ => seq(
      $._tag_matcher,
      optional($.tag_object),
    ),
    
    // All the valid characters inside a tag. Might need to add quotations. I forget.
    _tag_matcher: $ => /[a-zA-Z0-9_.]+/,
    
    // Checks for tags like [this] or can recursively check for [<this>] 
    // tag object -> tag component -> tag content -> tag object
    tag_object: $ => seq(
      '[',
      choice(
        $._tag_matcher,
        $.tag_component
      ),
      ']'
    )
  }
});