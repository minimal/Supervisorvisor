/*
Store the node objects in storage or .data()?

*/



var SupervisorNode = Base.extend({
    constructor: function(name) {
        this.name = name;
    },
    
    restart_all: function() {
        console.log('Restarting all processes on node ' + this.name);
        return this;
    },
    
    stop_all: function() {
        console.log('Stopping all processes on node ' + this.name);
        return this;
    },
    
    stop_process: function(proc_id) {
        console.log('Stopping proc id ' + proc_id);
        return this;
    },
});


(function($) {

    var app = $.sammy(function(){
        
        //this.use(Sammy.Haml);
        this.element_selector = '#main_content'; 
        
        // Front content (all collapsed)
        this.get('#/', function(context) {
            // Collapse all sections NOTE: Won't be needed when the sections are recreated
            $('.host.expanded').each(function(idx, elem){collapse_host(elem)});
            
            $('.host').each(function(idx, elem){
                var elem = $(elem);
                var node = new SupervisorNode(elem.attr('id'));
                // node.update()
                elem.data('node_object', node);
            });
            // TODO: Build each section, call the ajax with update function on success. For each section display activity indicator
            // For each host configured (each .host elem), create a node object, call .update() on each
            // Attach node object as data
        });
        
        // Expand the node section
        this.get('#/node/:node_name', function(context) {
            var target = $('#'+this.params['node_name']);
            // Expand/collapse the host sections
            $('.host.expanded').each(function(idx, elem){collapse_host(elem)});
            expand_host(target);
            return false;
        });
        
        // Restart all process groups on node
        this.get('#/node/:node_name/restart_all', function(context) {
            var target = $('#'+context.params['node_name']);
            expand_host(target);
            var node = target.data('node_object');
            
            // Display confirmation
            var elem = $('<div id="confirmation" title="Restart all processes?"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Are you sure?</p></div>').dialog({
                height: 140, modal: true,
    			buttons: {
    				'Restart all': function() {
    				    $(this).dialog('close');
    				    node.restart_all(); //TODO: restart_all() should issue the request, then trigger update_all() to display "restarting" status
    				},
    				Cancel: function() {
    					$(this).dialog('close');
    				}
    			}
    		});
    		
    		context.redirect('#/node', context.params['node_name']);
    		
        });
        
    });
    
    var expand_host = function(target) {
        var target = $(target);
        if (!target.hasClass('expanded')) {
            target.stop().animate({height: '+=400'}, 'fast');
            target.addClass('expanded');
        };
    };
    
    var collapse_host = function(target) {
        var target = $(target);
        if (target.hasClass('expanded')) {
            target.stop().animate({height: '-=400'}, 'fast');
            target.removeClass('expanded');
        };
    };
    
    
    // Initialise and run the app
    $(function() {
        app.run('#/');
    });

})(jQuery);

