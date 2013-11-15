
(function( jQuery ){
        jQuery.fn.cssGenerator = function(options) {
            base = '.';
            css = [];
            
            var settings = jQuery.extend({
                //setting this to true will use an id embed of a class, if the element has one
                prefer_ids_over_class : false
            }, options );

                
                iterator = function(base, element){

                    for (a in element.children()) {
                        
                        current = jQuery(element.children()[a]);

                        if( current.attr('class') || current.attr('id') ) {
                            
                            if( current.attr('id') && settings.prefer_ids_over_class) {

                                new_base = '#' + current.attr('id')+' ';

                            }else{
                                
                                new_base = '.' + current.attr('class').split(' ').join('.')+' ';

                            }

                        }else{
                            if( typeof current.context == 'object' ){
                                new_base = current[0].tagName.toLowerCase()+' ';
                            }
                        }
                        
                        last_base = base + new_base;
                        
                        css.push(last_base);

                        if(current.children().length>0){
                            iterator(last_base, current);
                        }else{
                            return false;
                        }
                        
                    };
                }   

                unique = function(a) {
                    return a.reduce(function(p, c) {
                        if (p.indexOf(c) < 0) p.push(c);
                        return p;
                    }, []);
                };

                base += jQuery(this).attr('class').split(' ').join('.')+' ';
                
                iterator(base, jQuery(this) );
                
                //your css sir||mam
                console.log( unique(css).join("{}\n")+'{}' );

        };
})( jQuery );
