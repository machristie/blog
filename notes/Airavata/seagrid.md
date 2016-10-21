
# Master Deployment

* PGA - gw75
* Airavata - gw77

## Airavata log files

Log into airavata@gw77. Log files are in

    /home/airavata/master-deployment/api-orchestrator/apache-airavata-server-0.17-SNAPSHOT/logs

# Dev Deployment

* PGA - gw54
* Airavata - gw56

## Airavata log files

Log into airavata@gw56, `su airavata`. Log files are in

    /home/airavata/dev-deployment/api-orch/apache-airavata-server-0.17-SNAPSHOT/logs

## Start server in debug mode

There are different servers: api-orch, gfac, regserver.  So figure out which
JVM you need to set a breakpoint in.

* restart the server with -xdebug. For example for regserver

      cd dev-deployment/registry/apache-airavata-server-0.17-SNAPSHOT/bin/
      ./airavata-server-stop.sh
      ./airavata-server-start.sh -xdebug regserver
* add Debug Configuration in IntelliJ for gw56.iu.xsede.org:8000
* start *Debug...* **server will wait until connected to before continuing with startup**