<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
 "http://www.w3.org/TR/html4/strict.dtd">
 
<html lang="en">
<head>
    <title>Supervisor Dashboard</title>
    <link rel="stylesheet" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
    <link rel="stylesheet" href="http://static.office.pirc.co.uk/themes/pirc-theme/jquery-ui-1.8.custom.css" type="text/css">
    <script type="text/javascript" src="http://static.office.pirc.co.uk/jquery/jquery-1.4.2.min.js"></script>
    <link rel="stylesheet" href="/static/css/style.css" type="text/css">
    <script type="text/javascript" src="http://static.office.pirc.co.uk/jquery/jquery-ui-1.8.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/sammy-0.5.3.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/plugins/sammy.json-0.5.3.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/plugins/sammy.storage-0.5.3.min.js"></script>
    <script type="text/javascript" src="http://static.office.pirc.co.uk/sammy/plugins/sammy.haml-0.5.3.min.js"></script>
    <script src="/static/js/base.js" type="text/javascript" charset="utf-8"></script>
    <script src="/static/js/app.js" type="text/javascript" charset="utf-8"></script>
</head>

<body>
    <div id="doc3" class="yui-t7">
        <div id="hd">
            <div id="wrapper">
            <div id="title">
                <p><a href="/">Supervisor Dashboard</a></p>
            </div>
            <div id="nav">
                <a href="#/add" id="add">Add host</a>
                <a href="#/" id="refresh">Refresh</a>
            </div>
            </div>
        </div>
        
        <div id="bd">
	        <div class="yui-g" id="main_content">
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
        
        $('.expand a').live('click', function(e){
            var that = $(this);
            var container = that.parent().parent().parent().find(".detail");
            container.slideToggle();            
        })
    });
    
</script>

</html>
