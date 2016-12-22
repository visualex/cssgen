(function( jQuery ){
   jQuery.fn.cssGenerator = function(options) {
      base = '.';
      css = [];

      var settings = jQuery.extend({
         //setting this to true will use an id embed of a class, if the element has one
         prefer_ids_over_class : false,
         callback:function(response){ console.log(response); },
         start_from_element:false
      }, options );

      Selectors={
         get_classes:function(element) {
            arr = element.attr('class').split(/\s+/);
            brr = [];
            for(a in arr){
               if(arr[a]!=''){
                  brr.push(arr[a]);
               }
            }
            return '.'+brr.join('.')+' ';
         },
         get_id:function(element){
            return '#'+element.attr('id')+' ';
         },
         get_tag:function(element){
            return element[0].tagName.toLowerCase()+' ';
         },
         get_input_type:function(element){
            // todo
         }
      };

      // todo logic
      get_selector = function(element) {
         new_base = '';
         if( (typeof element.attr('class') != 'undefined') || (typeof element.attr('id') != 'undefined')  ) {

            if( element.attr('id') && settings.prefer_ids_over_class) {
               new_base = Selectors.get_id(element);
            } else {

               if(typeof element.attr('class') != 'undefined') {
                  new_base = Selectors.get_classes(element);
               } else {
                  new_base = Selectors.get_tag(element);
               }
            }
         } else {
            if( typeof element.context == 'object' || typeof element[0].tagName != 'undefined' ) {
               new_base = Selectors.get_tag(element);
            }
         }
         return new_base;
      }

      iterator = function(base, element) {
         console.log( 'children in '+ get_selector(element) + ' ' + element.children().length )
         jQuery.each(element.children(), function(i,v) {
            current = jQuery(v);
            new_base = get_selector(current);
            last_base = base + new_base;
            css.push(last_base);
            if( typeof current.children()[0] != 'undefined' ) {
               iterator(last_base, current);
            } else {
               if( i<element.children().length ) {
                  // wat
               } else {
                  return false;
               }
            }
         });
      }

      unique = function(a) {
         return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
               return p;
         }, []);
      };

      jQuery.each(jQuery(this), function(k,v) {
         base = get_selector(jQuery(v));
         css.push(base);
         iterator(base, jQuery(v) );
      });

      //your css
      final_css =  unique(css).join("{ }\n")+'{ }';
      settings.callback(final_css);
   };
})( jQuery );