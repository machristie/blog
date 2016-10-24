
# Updating Thrift stubs

1. Build them in airavata

        cd airavata/thrift-interface-descriptions
        ./generate-thrift-stubs.sh php

2. Copy them into PGA

        cd target/gen-php/
        cp -r Airavata/API/ /Library/WebServer/Documents/airavata-php-gateway/app/libraries/Airavata/API/
        cp -f -r Airavata/Model/ /Library/WebServer/Documents/airavata-php-gateway/app/libraries/Airavata/Model/

3. Composer stuff

        composer dump-autoload