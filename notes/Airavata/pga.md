
# Updating Thrift stubs

1. Build them in airavata

        cd airavata/thrift-interface-descriptions
        ./generate-thrift-stubs.sh php

2. Copy them into PGA

        cd target/gen-php/
        cp -rnf Airavata/API/ /Library/WebServer/Documents/airavata-php-gateway/app/libraries/Airavata/API/
        cp -rnf Airavata/Model/ /Library/WebServer/Documents/airavata-php-gateway/app/libraries/Airavata/Model/

3. Composer stuff

        composer dump-autoload


# Running inside Homestead

Follow these notes: https://laravel.com/docs/master/homestead

* if you change networking or anything in Homestead.yaml, you'll need to then run in the Homestead/ directory

      vagrant provision