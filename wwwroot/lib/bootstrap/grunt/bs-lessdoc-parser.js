/*!
 * Bootstrap Grunt task for parsing Less docstrings
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict';

var Markdown = require('markdown-it');

function markdown2html(markdownString) ***REMOVED***
  var md = new Markdown();

  // the slice removes the <p>...</p> wrapper output by Markdown processor
  return md.render(markdownString.trim()).slice(3, -5);
***REMOVED***


/*
Mini-language:
  //== This is a normal heading, which starts a section. Sections group variables together.
  //## Optional description for the heading

  //=== This is a subheading.

  //** Optional description for the following variable. You **can** use Markdown in descriptions to discuss `<html>` stuff.
  @foo: #fff;

  //-- This is a heading for a section whose variables shouldn't be customizable

  All other lines are ignored completely.
*/


var CUSTOMIZABLE_HEADING = /^[/]***REMOVED***2***REMOVED***=***REMOVED***2***REMOVED***(.*)$/;
var UNCUSTOMIZABLE_HEADING = /^[/]***REMOVED***2***REMOVED***-***REMOVED***2***REMOVED***(.*)$/;
var SUBSECTION_HEADING = /^[/]***REMOVED***2***REMOVED***=***REMOVED***3***REMOVED***(.*)$/;
var SECTION_DOCSTRING = /^[/]***REMOVED***2***REMOVED***#***REMOVED***2***REMOVED***(.+)$/;
var VAR_ASSIGNMENT = /^(@[a-zA-Z0-9_-]+):[ ]*([^ ;][^;]*);[ ]*$/;
var VAR_DOCSTRING = /^[/]***REMOVED***2***REMOVED***[*]***REMOVED***2***REMOVED***(.+)$/;

function Section(heading, customizable) ***REMOVED***
  this.heading = heading.trim();
  this.id = this.heading.replace(/\s+/g, '-').toLowerCase();
  this.customizable = customizable;
  this.docstring = null;
  this.subsections = [];
***REMOVED***

Section.prototype.addSubSection = function (subsection) ***REMOVED***
  this.subsections.push(subsection);
***REMOVED***;

function SubSection(heading) ***REMOVED***
  this.heading = heading.trim();
  this.id = this.heading.replace(/\s+/g, '-').toLowerCase();
  this.variables = [];
***REMOVED***

SubSection.prototype.addVar = function (variable) ***REMOVED***
  this.variables.push(variable);
***REMOVED***;

function VarDocstring(markdownString) ***REMOVED***
  this.html = markdown2html(markdownString);
***REMOVED***

function SectionDocstring(markdownString) ***REMOVED***
  this.html = markdown2html(markdownString);
***REMOVED***

function Variable(name, defaultValue) ***REMOVED***
  this.name = name;
  this.defaultValue = defaultValue;
  this.docstring = null;
***REMOVED***

function Tokenizer(fileContent) ***REMOVED***
  this._lines = fileContent.split('\n');
  this._next = undefined;
***REMOVED***

Tokenizer.prototype.unshift = function (token) ***REMOVED***
  if (this._next !== undefined) ***REMOVED***
    throw new Error('Attempted to unshift twice!');
  ***REMOVED***
  this._next = token;
***REMOVED***;

Tokenizer.prototype._shift = function () ***REMOVED***
  // returning null signals EOF
  // returning undefined means the line was ignored
  if (this._next !== undefined) ***REMOVED***
    var result = this._next;
    this._next = undefined;
    return result;
  ***REMOVED***
  if (this._lines.length <= 0) ***REMOVED***
    return null;
  ***REMOVED***
  var line = this._lines.shift();
  var match = null;
  match = SUBSECTION_HEADING.exec(line);
  if (match !== null) ***REMOVED***
    return new SubSection(match[1]);
  ***REMOVED***
  match = CUSTOMIZABLE_HEADING.exec(line);
  if (match !== null) ***REMOVED***
    return new Section(match[1], true);
  ***REMOVED***
  match = UNCUSTOMIZABLE_HEADING.exec(line);
  if (match !== null) ***REMOVED***
    return new Section(match[1], false);
  ***REMOVED***
  match = SECTION_DOCSTRING.exec(line);
  if (match !== null) ***REMOVED***
    return new SectionDocstring(match[1]);
  ***REMOVED***
  match = VAR_DOCSTRING.exec(line);
  if (match !== null) ***REMOVED***
    return new VarDocstring(match[1]);
  ***REMOVED***
  var commentStart = line.lastIndexOf('//');
  var varLine = commentStart === -1 ? line : line.slice(0, commentStart);
  match = VAR_ASSIGNMENT.exec(varLine);
  if (match !== null) ***REMOVED***
    return new Variable(match[1], match[2]);
  ***REMOVED***
  return undefined;
***REMOVED***;

Tokenizer.prototype.shift = function () ***REMOVED***
  while (true) ***REMOVED***
    var result = this._shift();
    if (result === undefined) ***REMOVED***
      continue;
***REMOVED***
    return result;
  ***REMOVED***
***REMOVED***;

function Parser(fileContent) ***REMOVED***
  this._tokenizer = new Tokenizer(fileContent);
***REMOVED***

Parser.prototype.parseFile = function () ***REMOVED***
  var sections = [];
  while (true) ***REMOVED***
    var section = this.parseSection();
    if (section === null) ***REMOVED***
      if (this._tokenizer.shift() !== null) ***REMOVED***
        throw new Error('Unexpected unparsed section of file remains!');
  ***REMOVED***
      return sections;
***REMOVED***
    sections.push(section);
  ***REMOVED***
***REMOVED***;

Parser.prototype.parseSection = function () ***REMOVED***
  var section = this._tokenizer.shift();
  if (section === null) ***REMOVED***
    return null;
  ***REMOVED***
  if (!(section instanceof Section)) ***REMOVED***
    throw new Error('Expected section heading; got: ' + JSON.stringify(section));
  ***REMOVED***
  var docstring = this._tokenizer.shift();
  if (docstring instanceof SectionDocstring) ***REMOVED***
    section.docstring = docstring;
  ***REMOVED*** else ***REMOVED***
    this._tokenizer.unshift(docstring);
  ***REMOVED***
  this.parseSubSections(section);

  return section;
***REMOVED***;

Parser.prototype.parseSubSections = function (section) ***REMOVED***
  while (true) ***REMOVED***
    var subsection = this.parseSubSection();
    if (subsection === null) ***REMOVED***
      if (section.subsections.length === 0) ***REMOVED***
        // Presume an implicit initial subsection
        subsection = new SubSection('');
        this.parseVars(subsection);
  ***REMOVED*** else ***REMOVED***
        break;
  ***REMOVED***
***REMOVED***
    section.addSubSection(subsection);
  ***REMOVED***

  if (section.subsections.length === 1 && !section.subsections[0].heading && section.subsections[0].variables.length === 0) ***REMOVED***
    // Ignore lone empty implicit subsection
    section.subsections = [];
  ***REMOVED***
***REMOVED***;

Parser.prototype.parseSubSection = function () ***REMOVED***
  var subsection = this._tokenizer.shift();
  if (subsection instanceof SubSection) ***REMOVED***
    this.parseVars(subsection);
    return subsection;
  ***REMOVED***
  this._tokenizer.unshift(subsection);
  return null;
***REMOVED***;

Parser.prototype.parseVars = function (subsection) ***REMOVED***
  while (true) ***REMOVED***
    var variable = this.parseVar();
    if (variable === null) ***REMOVED***
      return;
***REMOVED***
    subsection.addVar(variable);
  ***REMOVED***
***REMOVED***;

Parser.prototype.parseVar = function () ***REMOVED***
  var docstring = this._tokenizer.shift();
  if (!(docstring instanceof VarDocstring)) ***REMOVED***
    this._tokenizer.unshift(docstring);
    docstring = null;
  ***REMOVED***
  var variable = this._tokenizer.shift();
  if (variable instanceof Variable) ***REMOVED***
    variable.docstring = docstring;
    return variable;
  ***REMOVED***
  this._tokenizer.unshift(variable);
  return null;
***REMOVED***;


module.exports = Parser;
