import XCTest
import SwiftTreeSitter
import TreeSitterDenizenscript

final class TreeSitterDenizenscriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_denizenscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading DenizenScript grammar")
    }
}
