
# Debugging tips

* SELinux permission denial logs are logged in /var/log/audit/audit.log
* use `ls -lZ` to see SELinux permissions on files
* to allow Apache to write to a directory need to do
```
sudo chcon -R -t httpd_sys_rw_content_t /path/to/folder
```

