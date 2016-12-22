cssgen
====================

## cssgen is a css generator from existing markup

This tool is built with the idea of not having to write CSS selectors.



```
# Clone
$ git clone https://github.com/visualex/css-generator

# Go into the repository
$ cd css-generator

# Install dependencies and run
$ npm install && npm start
```

For the following markup:
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
```

Get this output: 
```CSS
	.parent.a{}
	.parent.a .php{}
	.parent.a .php a{}
	.parent.a .php a img{}
	.parent.a .title{}
	.parent.a .title h1{}
	.parent.a .title h1{}
	.parent.a .field{}
	.parent.a .field p{}
```

## TODO
* some tags cause errors
* form elements cleanup
* node
   * file import + watch (output change - inspector saves) (local/remote - changes)
   * url "watching"
   * save to local
   * keyboard shortcuts
   * branding
* "Inception Rule" don't go too deep
* AutoCleaner, Minimize
* reactivex









