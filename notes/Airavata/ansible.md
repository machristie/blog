
# Managing multiple environments

https://www.digitalocean.com/community/tutorials/how-to-manage-multistage-environments-with-ansible

Especially like the section called *Setting Cross-Environment Variables* which
has a strategy for having separate inventories that still share common variables.

# Misc tips

To get better error message output:

```
export ANSIBLE_STDOUT_CALLBACK=debug
```
