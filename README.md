cssgen
====================

## cssgen is a css generator from existing markup

Don't write CSS selectors.

Generate clean CSS selector markup documents for your App based on HTML markup.

[View this readme on github.io](https://visualex.github.io/cssgen/)

### Easiest way to use CSS Generator: 

Add [this link](javascript:function cssGeninjectScript(e){return new Promise((t,n)=>{const c=document.createElement("script");c.async=!0,c.src=e,c.addEventListener("load",t),c.addEventListener("error",()=>n("Error loading script.")),c.addEventListener("abort",()=>n("Script loading aborted.")),document.head.appendChild(c)})}cssGeninjectScript("https://code.jquery.com/jquery-3.4.1.min.js").then(()=>{cssGeninjectScript("https://visualex.github.io/cssgen/src/js/cssgen.js").then(()=>{$("body").cssGenerator()}).catch(e=>{console.log("could not load cssgen")})}).catch(e=>{console.log("could not load jquery")});) 
to your bookmarks toolbar and click it while on any html page. You will see the output in the console. From there on, copy and paste it in to a css file and use the dev tools to style your app.  

### You can also use it locally

```
# Clone
$ git clone https://github.com/visualex/css-generator
```

Write some markup:
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


Having jQuery and CssGenerator loaded in your scripts, you can  get the following output by calling `$('body').cssGenerator()`:

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







