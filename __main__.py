# -*- coding: utf-8 -*-

try:
    import simplejson as json
except ImportError:
    import json

import os.path as path
from bottle import redirect, request, route, send_file
from mako.lookup import TemplateLookup


## Static routes ##
@route('/static/:filename#[0-9a-zA-Z\/\-_\.]+#')
def static_file(filename):
    basename = path.basename(filename)
    root = path.join('./static', path.dirname(filename))
    send_file(basename, root=root)


@route('/')
def index():
    tmpl = bottle.TemplateLoader.get_template('index.mako')
    return tmpl.render_unicode()


@route('/nodes/')
def list_nodes():
    """"""
    return json.dumps([])


@route('/node/:name')
@route('/node/:name/')
def node_status(name):
    """Return the status of a node"""
    return json.dumps({})


@route('/node/:name/control/')
def node_control(name, action):
    """Initiate an action on the node"""
    pass
    


if __name__ == '__main__':
    import bottle
    
    bottle.TEMPLATE_PATH = ['./templates']
    bottle.TemplateLoader = TemplateLookup(directories=bottle.TEMPLATE_PATH)
    
    debug = True
    
    if debug:
        bottle.debug(True)
        bottle.run(host='localhost', port=8080, reloader=True)
    else:
        from bottle import CherryPyServer
        bottle.run(server=CherryPyServer)
