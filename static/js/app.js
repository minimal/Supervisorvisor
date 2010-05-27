/*
Store the node objects in storage or .data()?

*/


function html_escape(text) {
    return (text + "").
        replace(/&/g, "&amp;").
        replace(/</g, "&lt;").
        replace(/>/g, "&gt;").
        replace(/\"/g, "&quot;");
};


var SupervisorHost = Base.extend({
    constructor: function(name, url) {
        this.name = html_escape(name);
        this.root_url = url;
        this.target_element = $('.host#'+name);
    },
    
    get_data: function(callback) {
        var self = this;
        var host_data = null;
        var callback = callback || function(data){};
        
        $.ajax({
            url: this.root_url,
            type: "GET",
            dataType: "json",
            
            success: function(data, textStatus, XMLHttpRequest) {
                host_data = data;
                callback(data);
            },
            
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("We're flailing about in the dark and we've lost the torch");
                console.log(XMLHttpRequest, textStatus, errorThrown);
            }
        });
        
        return host_data;
    },
    
    summary_stats: function(data) {
	/* Calculate stats from the node data */
	var processes = data.length;
	var running = 0;
	var stopped = fatal = 0;
	for (proc in data) {
	    if (data[proc].statename === 'RUNNING') {
		running += 1;
	    }
	    else if (data[proc].statename === 'STOPPED') {
		stopped += 1;
	    }
	    else if (data[proc].statename === 'FATAL') {
		fatal += 1;
	    }
	};
	
	var worst_status = fatal && "Fatal" || stopped && 'Stopped' || running && "Running" || "n/a";
	
	return {processes: processes,
		running: running,
		stopped: stopped,
		fatal: fatal,
		worst_status: worst_status}
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
    
    restart_process: function(proc_id) {
        console.log('Restarting proc id ' + proc_id);
        return this;
    }
});


(function($) {

    var app = $.sammy(function(){
        
        this.use(Sammy.Haml);
        this.element_selector = '#main_content'; 
                
        this.get('#/', function(context) {
            // 1: Get host list         
            // 2: For each, create a SupervisorNode, create a section, call update
            
            $(this.element_selector).html('');
            
            $.ajax({
                url: "/nodes/",
                type: "GET",
                dataType: "json",
                
                success: function(data, textStatus, XMLHttpRequest) {
                    $.each(data, function(name, url){
                        var host = new SupervisorHost(name, url);
                        render_host(host, context);
                    });
                },
                
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("We're flailing about in the dark and we've lost the torch");
                    console.log(XMLHttpRequest, textStatus, errorThrown);
                }
            });
            
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
            var host = target.data('host_obj');
            
            var per_action_options = {
                'restart_all': {dialog_title: 'Restart all processes?', dialog_msg: 'Are you sure?', node_action: host.restart_all},
                'stop_all': {dialog_title: 'Stop all processes?', dialog_msg: 'Are you sure?', node_action: host.stop_all},
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
    
    var render_host = function(host, context) {
        // Given a SupervisorHost instance, render the host section //
        
        var target_element = $('<div class="host"></div>')
            .attr({'id':name})
            .appendTo('#main_content')
            .data('host_obj', host);
        
        // Clear, display indicator
        target_element.addClass('busy');
        
        // Build the render function
        var render = function(data){
            target_element.removeClass('busy');
            
            var summary_elem = $('<div class="summary"></div>')
                .append('<div class="status stopped">Stopped</div>')
                .append( $('<h3 class="address"></h3>').html(host.name) )
                .append('<p class="">x processes, y stopped, z running</p>')
                .append('<div class="trafficlights"><span class="running">&nbsp;</span><span class="running">&nbsp;</span><span class="stopped">&nbsp;</span></div>')
                .append('<div class="expand"><a href="#/node/headingley">detail</a></div>');
            
            var detail_elem = $('<div class="detail"></div>')
                .append('<div class="controls"><a href="#/node/headingley/restart_all">Restart all</a><a href="#/node/headingley/stop_all">Stop all</a></div>')
                .append('<div class="processes"></div>')
                .append('<table><tr><th>State</th><th>Description</th><th>Name</th><th>Actions</th></tr>');
            
            target_element.css({'backgroundColor':''}).html('').append(summary_elem, detail_elem);
            
            $('.expand a', target_element).button({icons: {primary: 'ui-icon-info'}, text: false});
            $('.remove a', target_element).button({icons: {primary: 'ui-icon-trash'}, text: false});
            $('.controls a', target_element).button();
        };
        
        // Get data, passing render as callback
        var data = host.get_data(render);
    };
    
    
    // Initialise and run the app
    $(function() {
        app.run('#/');
    });

})(jQuery);

