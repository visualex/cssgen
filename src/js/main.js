var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");

var tidy = require("tidy-html5").tidy_html5;
var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)


function cssSetContent(content)
{
   $('.panel_right pre').text(content);
}

function editorSetContent(content)
{
   editor.setValue(content);
   return content;
}

function editorGetContent()
{
   return editor.getValue();
}

function tidyContent(content)
{
   return tidy(content, {"indent-spaces": 4});
}

function prepTidyForCssGen(content)
{
   return content.replace(/^[\S\s]*<body[^>]*?>/i, "").replace(/<\/body[\S\s]*$/i, "");
}

function generateCss()
{
   htmlComplete = editorSetContent(tidyContent(editorGetContent()));
   html = $( '<div>' + prepTidyForCssGen(htmlComplete) + '</div>' ).children();
   $(html).cssGenerator({prefer_ids_over_class:false, callback:cssSetContent});
}

function openUrl()
{
   url = prompt('URL');
}

function prompt(message)
{
   console.log(message);
}

$(document).ready(function(){
   // UI events
   $('.toolbar button.generate').click(function(){ generateCss(); });
   $('.toolbar button.open').click(function(){ openUrl(); });

});