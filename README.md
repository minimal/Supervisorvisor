# Goals

 - Provide a unified interface to multiple Supervisord instances
 - Provide a simple http interface to the XML-RPC controls provided by Supervisord
 - Implement custom groupings of processes and process groups across hosts (i.e. monitor the status of 
   two processes on host A and one on host B as a single group)

# Usage

    $ git clone git://github.com/robcowie/Supervisorvisor.git
    >>> python Supervisorvisor
    >>> ## OR, for Python <2.5
    >>> python Supervisorvisor/__main__.py
