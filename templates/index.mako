<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
 "http://www.w3.org/TR/html4/strict.dtd">
 
<html lang="en">
<head>
    <title>Supervisor Dashboard</title>
    <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
    <link rel="stylesheet" href="http://static.office.pirc.co.uk/themes/pirc-theme/jquery-ui-1.8.custom.css" type="text/css">
    <script type="text/javascript" src="http://static.office.pirc.co.uk/jquery/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/jquery/jquery-ui-1.8.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/sammy-0.5.3.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/plugins/sammy.storage-0.5.3.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/plugins/sammy.haml-0.5.3.min.js"></script>
    <script src="/static/js/base.js" type="text/javascript" charset="utf-8"></script>
    <script src="/static/js/app.js" type="text/javascript" charset="utf-8"></script>
    <style type="text/css" media="screen">
        a {text-decoration: none;}
        a:focus {-moz-outline-style: none;}
        a:active {outline: none;}
        #doc3 {
            margin: 0;
            padding: 0;
        }
        #bd {
            margin: 16px auto;
            width: 950px;
            /*min-width: 950px;*/
        }
        #hd #wrapper {
            width: 950px;
            margin: auto;
        }
        #hd {
            height: 75px;
            background: url(/imgs/top_wrapper_bg.jpg);
            background-color: #2E2E2E;
            padding: 0 75px 0 75px;
        }
        #nav {
            float: right;
            height: 75px;
            line-height: 100%;
            padding: 28px 0 0 0;
        }

        #nav a {
            color: #a5a5a5;
            font: bold 12px arial;
            text-align: left;
            text-shadow: #000 0 -1px 1px;
            margin: 0 0 0 20px;
        }

        #nav a:hover {
            color:#e9e9e9;
        }

        #nav a.selected {
            color:#e9e9e9;
        }
        #title {
            float: left;
            height: 75px;
            line-height: 100%;
            padding: 20px 0 0 0;
        }
        #title p {
            color: #a5a5a5;
            font: bold 25px arial;
            text-shadow: #000 0 -1px 1px;
        }
        .host {
            -moz-border-radius: 8px;
        	-webkit-border-radius: 8px;
        	margin: 5px 0;
        	border: 2px solid #bbb;
        	height: 60px;
        	min-height: 60px;
        	width: 100%;
        	overflow: hidden;
        }
        .host .summary {
            /*width: 100%;*/
            padding: 10px 10px 10px 75px;
            position: relative;
        }
        .processes table {
            width: 100%;
        }
        .processes table th {
            padding: 5px;
            font-weight: bold;
            
        }
        .processes table td {
            padding: 5px;
        }
        .processes table tr.odd {
            background-color: #F9FAFF;
        }
        .host .summary .status {
            border: 1px solid #bbb;
            -moz-border-radius: 3px;
        	-webkit-border-radius: 3px;
        	left: 10px;
        	padding: 4px 2px;
        	margin: 0;
        	position: absolute;
        	text-align: center;
        	top: 15px;
        	width: 50px;
        	height: 20px;
        	line-height: 20px;
        }
        .status.running {background-color: #4EE271;}
        .status.stopped {background-color: #EDEC76;}
        .status.error {background-color: #FA7881;}
        .host .summary h3 {
            color: #0A7BC1;
            font-weight: bold;
            font-size: 18px;
        }
        .host .summary .expand {
            position: absolute;
            right: 10px;
            top: 15px;
        }
        .host .summary .remove {
            position: absolute;
            right: 50px;
            top: 15px;
        }
        .host .detail {
            border: 1px solid #bbb;
            -moz-border-radius: 3px;
        	-webkit-border-radius: 3px;
        	margin: 20px 5px 0 5px;
        	padding: 5px 0;
        }
        .processes .status {
            border: 1px solid #bbb;
            -moz-border-radius: 3px;
        	-webkit-border-radius: 3px;
        	margin: 0;
        	text-align: center;
        	width: 60px;
        	height: 15px;
        	line-height: 15px;
        }
        .host .detail .controls {
            border-bottom: 1px solid #bbb;
            padding: 0 5px 5px 5px;
        }
        .trafficlights {
            position: absolute;
            width: 300px;
            right: 100px;
            top: 20px;
        }
        .trafficlights span {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin: 0 5px;
            -moz-border-radius: 7px;
        	-webkit-border-radius: 7px;
        }
        .trafficlights .running {background-color: #4EE271;}
        .trafficlights .stopped {background-color: #EDEC76;}
        .trafficlights .error {background-color: #FA7881;}
    </style>
</head>

<body>
    <div id="doc3" class="yui-t7">
        <div id="hd">
            <div id="wrapper">
            <div id="title">
                <p>Supervisor Dashboard</p>
            </div>
            <div id="nav">
                <a href="#/add" id="add">Add host</a>
                <a href="#/" id="refresh">Refresh</a>
            </div>
            </div>
        </div>
        
        <div id="bd">
	        <div class="yui-g" id="main_content">
                <div id="headingley" class="host">
                    <div class="summary">
                        <div class="status stopped">Stopped</div>
                        <h3 class="address">headingley.office.pirc.co.uk</h3>
                        <p class="">5 processes, 2 stopped, 3 running</p>
                        <div class="trafficlights">
                            <span class="running">&nbsp;</span><span class="running">&nbsp;</span><span class="stopped">&nbsp;</span>
                        </div>
                        <!-- <div class="remove"><a href="#/headingley/remove">remove</a></div> -->
                        <div class="expand"><a href="#/node/headingley">detail</a></div>
                    </div>
                    
                    <div class="detail">
                        <div class="controls">
                            <a href="#/node/headingley/restart_all">Restart all</a>
                            <a href="#/node/headingley/stop_all">Stop all</a>
                        </div>
                        <div class="processes">
                            <table>
                                <tr>
                                    <th>State</th>
                                    <th>Description</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                                <tr id="proc1" class="odd">
                                    <td><div class="status running">Running</div></td>
                                    <td class="description">pid 48050, uptime 1 day, 2:42:39</td>
                                    <td class="name">publisher_http</td>
                                    <td class="actions"></td>
                                </tr>
                                <tr id="proc2" class="even">
                                    <td><div class="status running">Running</div></td>
                                    <td class="description">pid 33345, uptime 1 day, 2:42:39</td>
                                    <td class="name">publisher_node</td>
                                    <td class="actions"></td>
                                </tr>
                                <tr id="proc3" class="odd">
                                    <td><div class="status stopped">Stopped</div></td>
                                    <td class="description">pid 33345, uptime 1 day, 2:42:39</td>
                                    <td class="name">publisher_node_02</td>
                                    <td class="actions"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>
                <div id="theoval" class="host">
                    <div class="summary">
                        <div class="status running">Running</div>
                        <h3 class="address">theoval.office.pirc.co.uk</h3>
                        <p class="">2 processes, 2 running</p>
                        <!-- <div class="remove"><a href="#/theoval/remove">remove</a></div> -->
                        <div class="expand"><a href="#/node/theoval">detail</a></div>
                    </div>
                    
                    <div class="detail">
                        <div class="controls">
                            <a href="#/node/theoval/restart_all">Restart all</a>
                            <a href="#/node/theoval/stop_all">Stop all</a>
                        </div>
                        <div class="processes"></div>
                    </div>
                </div>
                <div id="belmarsh" class="host">
                    <div class="summary">
                        <div class="status error">Error</div>
                        <h3 class="address">belmarsh.office.pirc.co.uk</h3>
                        <p class="">5 processes, 4 running, 1 error</p>
                        <!-- <div class="remove"><a href="#/belmarsh/remove">remove</a></div> -->
                        <div class="expand"><a href="#/node/belmarsh">detail</a></div>
                    </div>
                    
                    <div class="detail">
                        <div class="controls">
                            <a href="#/node/belmarsh/restart_all">Restart all</a>
                            <a href="#/node/belmarsh/stop_all">Stop all</a>
                        </div>
                        <div class="processes"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="ft"></div>
    </div>
</body>

<script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        $('.expand a').button({icons: {primary: 'ui-icon-info'}, text: false});
        $('.remove a').button({icons: {primary: 'ui-icon-trash'}, text: false});
        $('.controls a').button();
        
    //     $('.expand a').live('click', function(e){
    //         var that = $(this);
    //         var container = that.parent().parent().parent();
    //         
    //         if (container.hasClass('expanded')) {
    //             var transformation = '-=400';
    //         } else {
    //             var transformation = '+=400';
    //         };
    //         
    //         container.toggleClass('expanded');
    //         container.stop().animate({height: transformation}, 'fast');
    //     })
    });
    
</script>

</html>