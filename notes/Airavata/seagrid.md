
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

# Upgrading Airavata

See http://airavata.readthedocs.io/en/latest/Airavata-Upgrades/.  General procedure:

1. Log into Airavata dev deployment. Go to `~/dev-airavata-source`
2. `git pull`
3. `mvn clean install -Dmaven.test.skip=true`
4. Copy the distribution to the server directory that you want to upgrade. For example, for the registry server

        cp modules/distribution/target/apache-airavata-server-0.17-SNAPSHOT-bin.tar.gz ~/dev-deployment/registry/
5. Stop the old server

       cd ~/dev-deployment/registry/
       cd apache-airavata-server-0.17-SNAPSHOT/bin/
       # -f parameter is only needed if having trouble stopping server
       ./airavata-server-stop.sh -f
6. Backup the old code

       cd ../..
       tmp=`mktemp -d`
       mv apache-airavata-server-0.17-SNAPSHOTbk/ $tmp/
       mv apache-airavata-server-0.17-SNAPSHOT apache-airavata-server-0.17-SNAPSHOTbk

7. Untar the new code and copy over config files

       tar -xvf apache-airavata-server-0.17-SNAPSHOT-bin.tar.gz
       cd apache-airavata-server-0.17-SNAPSHOT/bin
       cp ../../apache-airavata-server-0.17-SNAPSHOTbk/bin/airavata-server.properties .
       cp ../../apache-airavata-server-0.17-SNAPSHOTbk/bin/gfac-config.yaml .
       cp ../../apache-airavata-server-0.17-SNAPSHOTbk/bin/grouper.hibernate.properties .
       cp ../../apache-airavata-server-0.17-SNAPSHOTbk/bin/sources.xml .

8. Copy mysql jar

       cp ../../apache-airavata-server-0.17-SNAPSHOTbk/lib/mysql-connector-java-5.1.36-bin.jar ../lib/

9. Start the server in daemon mode

    For registry

       ./airavata-server-start.sh -d regserver

    For api-orch

       ./airavata-server-start.sh -d api-orch
