
# Jetstream API docs

https://iujetstream.atlassian.net/wiki/display/JWT/Using+the+Jetstream+API

# Creating a Jetstream instance

Note:
* The Airavata security group was already created
* I had already added my SSH key as `machrist`
* Wouldn't allow me to log in as `root`. Login message was to login as `centos`.

```
source openrc.sh 
source ENV/bin/activate
nova list
nova secgroup-list
echo $OS_PROJECT_NAME 
neutron net-create airavata-testing-0.17-net
neutron net-list
neutron subnet-create airavata-testing-0.17-net 10.0.0.0/24 --name airavata-testing-0.17-subnet1
neutron net-list
export PROJECT_NAME=airavata-testing-0.17
neutron router-create ${PROJECT_NAME}-router
neutron router-interface-add ${PROJECT_NAME}-router ${PROJECT_NAME}-subnet1
neutron router-gateway-set ${PROJECT_NAME}-router public
neutron router-show ${PROJECT_NAME}-router
neutron net-list
neutron router-list
nova flavor-list
nova image-list
# Image 736e206d... is the JS-API-Featured-Centos7-Feb-7-2017 image
nova boot ${PROJECT_NAME}-instance1 --flavor m1.small --image 736e206d-9c2c-4369-88db-8c3293bd2ad7 --key-name machrist --security-groups Airavata --nic net-name=${PROJECT_NAME}-net
nova floating-ip-create public
nova floating-ip-associate ${PROJECT_NAME}-instance1 149.165.168.5
ssh root@149.165.168.5
# Got login message that I should login as user centos instead
ssh centos@149.165.168.5
```
