# testing the supervisor xml-rpc interface

import xmlrpclib

#server.supervisor.getState()

#server.system.listMethods()
#supervisor.readLog(0, 20)
#server.supervisor.readLog(0, 20)
#server.supervisor.readLog(0, 50)
#server.supervisor.getProcessInfo()
#server.supervisor.getAllProcessInfo()


supervisor_hosts = [
    "http://jail7:9001",
    "http://belmarsh8:9001",
    "http://admin:SysPirc098@workplanner:9001",
    "http://admin:SysPirc098@vsuse:9001",
    "http://admin:SysPirc098@alcatraz7:9001",
]

hosts = {
    "jail7": "http://jail7:9001",
    "belmarsh8": "http://belmarsh8:9001",
    "workplanner": "http://admin:SysPirc098@workplanner:9001",
    "vsuse": "http://admin:SysPirc098@vsuse:9001",
    "alcatraz7": "http://admin:SysPirc098@alcatraz7:9001",
}

# api

def get_hosts():
    """Return all known hosts as list of dicts"""
    return hosts

def get_states(host):
    """Get state for all processes for one supervisor"""
    server = xmlrpclib.Server(host)
    states = server.supervisor.getAllProcessInfo()
    
    return states

# helpers

def pretty_states(host):
    states = get_states(host)
    
    for state in states:
        print state['name'], state['statename']
    

def print_all_states(hosts=supervisor_hosts):
    map(pretty_states, hosts)


if __name__=="__main__":
    print_all_states()
