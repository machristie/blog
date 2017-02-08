
# Updating Thrift stubs

1. Build them in airavata

        cd airavata/thrift-interface-descriptions
        ./generate-thrift-stubs.sh php

2. Copy them into PGA

        cd target/gen-php/
        cp -rnf Airavata/API/ $HOME/Airavata/airavata-php-gateway/app/libraries/Airavata/API/
        cp -rnf Airavata/Model/ $HOME/Airavata/airavata-php-gateway/app/libraries/Airavata/Model/

3. Composer stuff

        composer dump-autoload


# Running inside Homestead

Follow these notes: https://laravel.com/docs/master/homestead

* if you change networking or anything in Homestead.yaml, you'll need to then run in the Homestead/ directory

      vagrant provision

# Installing on macOS

Install apache, php, php-mcrypt, and composer using homebrew. Note, the apache
installed through homebrew will run on port 8080 and will be completely separate
from the builtin apache server that comes with macOS.

    brew install homebrew/apache/httpd24
    brew install homebrew/php/php54 --with-httpd24
    brew install homebrew/php/php54-mcrypt
    brew install composer

In /usr/local/etc/apache2/2.4/httpd.conf make sure the following line is added

    LoadModule php5_module    /usr/local/opt/php54/libexec/apache2/libphp5.so

Then also add 

    <IfModule php5_module>
    Include /usr/local/etc/apache2/2.4/extra/httpd-php.conf
    </IfModule>

Now create the file /usr/local/etc/apache2/2.4/extra/httpd-php.conf (see [docs](http://php.net/manual/en/install.unix.apache2.php)).

    <FilesMatch \.php$>
    SetHandler application/x-httpd-php
    </FilesMatch>

Create a file in /usr/local/var/www/htdocs/test.php

    <?php
    
    phpinfo();
    
    ?>

Then restart apache

    apachectl restart

Now you should see the phpinfo test page at http://localhost:8080/test.php

Enable the rewrite module by uncommenting this line in /usr/local/etc/apache2/2.4/httpd.conf

    LoadModule rewrite_module libexec/mod_rewrite.so

Create the following file: /usr/local/etc/apache2/2.4/extra/httpd-pga.conf

    <VirtualHost *:8080>
      DocumentRoot /Users/machrist/Documents/Airavata/airavata-php-gateway/public/
      <Directory "/Users/machrist/Documents/Airavata/airavata-php-gateway/public/">
        DirectoryIndex index.php
        AllowOverride All
        Require all granted
      </Directory>
    </VirtualHost>

(Optional) NOTE: instead of `*:8080` you can specify a hostname, like `pga.local` and then
just make sure to add to your /etc/hosts file:

    127.0.0.1   pga.local

Add the following line to /usr/local/etc/apache2/2.4/httpd.conf

    Include /usr/local/etc/apache2/2.4/extra/httpd-pga.conf 

Restart apache

    apachectl restart

## Other configuration stuff

Increase the TTL of the SOAP wsdl cache. Change the default 1 day TTL value to
something much larger in /usr/local/etc/php/php.ini, for example, 10 days:

    soap.wsdl_cache_ttl=864000

Set the timezone in the php.ini file too
