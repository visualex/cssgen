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

            		get_selector = function(element){
            			new_base = '';
            			if( element.attr('class') || element.attr('id') ) {
                    if( element.attr('id') && settings.prefer_ids_over_class) {
                        new_base = '#' + element.attr('id')+' ';
                    }else{
                        new_base = '.' + element.attr('class').split(' ').join('.')+' ';
                    }
                  }else{
                    if( typeof element.context == 'object' || typeof element[0].tagName != 'undefined' ){
                        new_base = element[0].tagName.toLowerCase()+' ';
                    }
                  }
                  return new_base;
            		}

                iterator = function(base, element){
                		console.log( 'children in '+ get_selector(element) + ' ' + element.children().length )
                		jQuery.each(element.children(), function(i,v){

                			current = jQuery(v);
                      new_base = get_selector(current);
                      last_base = base + new_base;
                      css.push(last_base);

                      if(typeof current.children()[0] != 'undefined' ){
                          iterator(last_base, current);
                      }else{
                          if( i<element.children().length ) {

                          }else{
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


                jQuery.each(jQuery(this), function(k,v){
                	base = get_selector(jQuery(v));
                	css.push(base);
                	iterator(base, jQuery(v) );
                });


                //your css sir||mam
                final_css =  unique(css).join("{}\n")+'{}';

                settings.callback(final_css);

        };
})( jQuery );
