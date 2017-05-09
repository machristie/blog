
# Installing on CentOS 7

```
sudo yum install epel-release
sudo yum install python34
sudo yum install git httpd
sudo yum install python34-pip
sudo pip3 install -U virtualenv
virtualenv -p python3 ENV
```

Put this in a file in conf.d

**TODO**: mod_wsgi must be built with the Python you want to run with. Virtual environments cannot use a different version of Python.

```
WSGIPythonHome /home/centos/django-airavata-gateway/ENV
WSGIPythonPath /home/centos/django-airavata-gateway
<VirtualHost *:80>

        WSGIScriptAlias / /home/centos/django-airavata-gateway/django_airavata_gateway/wsgi.py

        <Directory /home/centos/django-airavata-gateway/django_airavata_gateway>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>
</VirtualHost>
```
