/*
Store the node objects in storage or .data()?

*/



var SupervisorHost = Base.extend({
    constructor: function(name, url) {
        this.name = name;
        this.root_url = url;
        this.target_element = null;
    },
    
    update: function() {
        // Fetch data, render
        console.log('Updating section for host ' + this.name);
        var self = this;
        var host_data = null;
        this.target_element = $('.host#'+this.name);
        
        // Clear, display indicator
        this.target_element.html('<div>Loading...</div>').css({'backgroundColor':'#EAEAEA'});
        
        $.ajax({
            url: this.root_url,
            type: "GET",
            dataType: "json",
            
            success: function(data, textStatus, XMLHttpRequest) {
                self.render(data);
            },
            
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("We're flailing about in the dark and we've lost the torch");
                console.log(XMLHttpRequest, textStatus, errorThrown);
            }
        });
        
        return host_data;
    },
    
    render: function(data) {
        // Re-render the section (clear, display activity, get data, render)
        console.log(data);
        var summary_elem = $('');
        var detail_elem = $('');
        this.target_element.css({'backgroundColor':''}).html('').append(summary_elem, detail_elem);
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
    
    restart_process: function(proc_id) {
        console.log('Restarting proc id ' + proc_id);
        return this;
    }
});


(function($) {

    var app = $.sammy(function(){
        
        //this.use(Sammy.Haml);
        this.element_selector = '#main_content'; 
        
        this.before(function(context){
            // $('.host').each(function(idx, elem){
            //                 var elem = $(elem);
            //                 var node = new SupervisorHost(elem.attr('id'));
            //                 // node.update()
            //                 elem.data('node_object', node);
            //             });
        });
        
        // Front content (all collapsed)
        this.get('#/', function(context) {
            // Collapse all sections NOTE: Won't be needed when the sections are recreated
            //$('.host.expanded').each(function(idx, elem){collapse_host(elem)});
            
            // 1: Get host list         
            // 2: For each, create a SupervisorNode, create a section, call update
            $.ajax({
                url: "/nodes/",
                type: "GET",
                dataType: "json",
                
                complete: function(XMLHttpRequest, textStatus) {
                    //called when complete
                },
                
                success: function(data, textStatus, XMLHttpRequest) {
                    $.each(data, function(name, url){
                        console.log('Processing: ' + name, url);
                        var host = new SupervisorHost(name, url);
                        $('<div class="host"></div>')
                            .attr({'id':name})
                            .appendTo('#main_content')
                            .data('host_obj', host);
                        host.update();
                        //setTimeout("host.update()", 3000);
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

