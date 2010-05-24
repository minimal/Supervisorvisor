/*
Store the node objects in storage or .data()?

*/



var SupervisorNode = Base.extend({
    constructor: function(name) {
        this.name = name;
    },
    
    restart_all: function() {
        console.log('Restarting all processes on node ' + this.name);
        //TODO: restart_all() should issue the request, then trigger update_all() to display "restarting" status
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
        
        this.before(function(context){
            $('.host').each(function(idx, elem){
                var elem = $(elem);
                var node = new SupervisorNode(elem.attr('id'));
                // node.update()
                elem.data('node_object', node);
            });
        });
        
        // Front content (all collapsed)
        this.get('#/', function(context) {
            // Collapse all sections NOTE: Won't be needed when the sections are recreated
            $('.host.expanded').each(function(idx, elem){collapse_host(elem)});
            
            // TODO: Build each section, call the ajax with update function on success. For each section display activity indicator
            // call .update() on each node object
        });
        
        // Expand the node section
        this.get('#/node/:node_name', function(context) {
            var target = $('#'+this.params['node_name']);
            // Expand/collapse the host sections
            $('.host.expanded').each(function(idx, elem){collapse_host(elem)});
            expand_host(target);
            return false;
        });
        
        // Supervisor node controls (restart_all, stop_all)
        this.get('#/node/:node_name/:action', function(context) {
            var target = $('#'+context.params['node_name']);
            expand_host(target);
            var node = target.data('node_object');
            
            var per_action_options = {
                'restart_all': {dialog_title: 'Restart all processes?', dialog_msg: 'Are you sure?', node_action: node.restart_all},
                'stop_all': {dialog_title: 'Stop all processes?', dialog_msg: 'Are you sure?', node_action: node.stop_all},
            };
            
            var options = per_action_options[context.params['action']];
            // Display confirmation
            var elem = $('<div id="confirmation" title="'+options.dialog_title+'"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>'+options.dialog_msg+'</p></div>').dialog({
                height: 140, modal: true,
    			buttons: {
    				'Yes, Go ahead': function() {
    				    $(this).dialog('close');
    				    options.node_action();
    				},
    				'No, cancel': function() {
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

