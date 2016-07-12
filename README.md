css generator
====================

Tired of writing css? 
A jQuery plugin for getting a clean formatted css markup for your html.
So now you can just write the markup, use the example generator or the plugin, 
copy/paste in your css file, inspect and style!!!


example:
```html
	<div class="parent a"> 
		<div class="php">
		  <a><img/></a>
		</div>
		<div class="title"><h1>title</h1></div>
		<div class="field">
		  <p>lorem ipsum</p>
		</div>
	</div>


	<script>
	  
	  jQuery('.parent.a').cssGenerator()
	  //outputs in console
	  .parent.a{}
	  .parent.a .php{}
	  .parent.a .php a{}
	  .parent.a .php a img{}
	  .parent.a .title{}
	  .parent.a .title h1{}
	  .parent.a .title h1{}
	  .parent.a .field{}
	  .parent.a .field p{}
	  
	</script>
```
