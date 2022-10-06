# Jetstream

## Troubleshooting

### DNS issues

Network connection slowness could be caused by domain name resolution slowness
or timeouts. Try running

    nslookup <domain.name>

on the VM to check for issues.

If the nameserver is slow, use the following in /etc/resolv.conf

    # Google's DNS server
    nameserver 8.8.8.8
