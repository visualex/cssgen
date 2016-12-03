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
   url = prompt('URL', receiveUrl);
}

function receiveUrl(url)
{
   $.get( url, function( data ) {
      editorSetContent(data);
      generateCss();
   });
}

function prompt(message, callback)
{
   $('.prompt').show();
   $('.prompt .title').text(message);
   $('.prompt button').text('ok');
   $('.prompt button').click(function(){
      callback($('.prompt .input input').val());
      $('.prompt').hide();
      $('.prompt .title').text('');
      $('.prompt button').text('');
   });
}

$(document).ready(function(){
   // UI events
   $('.toolbar button.generate').click(function(){ generateCss(); });
   $('.toolbar button.open').click(function(){ openUrl(); });

});