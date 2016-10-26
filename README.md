css generator
====================

Tired of writing CSS?

Generate clean CSS markup for your App based on the HTML markup.


```
# Clone
$ git clone https://github.com/visualex/css-generator

# Go into the repository
$ cd css-generator

# Install dependencies and run
$ npm install && npm start
```

using the plugin directly:
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

## TODO
* some tags cause errors
* form elements cleanup
* package as node app
   * file import + watch local/remote
   * url "watching"
   * save to local
   * branding
* implement https://ace.c9.io as an editor











