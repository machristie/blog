
# Installation

## Installing libevent on macOS

Got this error


    ...
    libtool: compile:  gcc -DHAVE_CONFIG_H -I. -I./compat -I./include -I./include -g -O2 -Wall -fno-strict-aliasing -Wno-deprecated-declarations -D_THREAD_SAFE -MT bufferevent_openssl.lo -MD -MP -MF .deps/bufferevent_openssl.Tpo -c bufferevent_openssl.c  -fno-common -DPIC -o .libs/bufferevent_openssl.o
    bufferevent_openssl.c:60:10: fatal error: 'openssl/bio.h' file not found
    #include <openssl/bio.h>
             ^
    1 error generated.
    make[2]: *** [bufferevent_openssl.lo] Error 1
    make[1]: *** [all-recursive] Error 1
    make: *** [all] Error 2



See also http://stackoverflow.com/questions/33165174/fatal-error-openssl-bio-h-file-not-found

Solution
* I have openssl installed via brew.  `brew info openssl` tells me where it is installed
* Then I did
      LDFLAGS=-L/usr/local/opt/openssl/lib \ 
      CPPFLAGS=-I/usr/local/opt/openssl/include ./configure
      make
      sudo make install

## "Bison version 2.5 or higher must be installed on the system!"

I get this error when trying to run `./configure` for thrift 0.9.3.

Solution

    brew install bison
    PATH=/usr/local/opt/bison/bin:$PATH ./configure --prefix=/usr/local/ --with-boost=/usr/local --with-libevent=/usr/local

## Error making thrift: openssl/err.h file not found

    src/thrift/transport/TSSLSocket.cpp:33:10: fatal error: 'openssl/err.h' file not found
    #include <openssl/err.h>
             ^
    1 error generated.
    make[4]: *** [src/thrift/transport/TSSLSocket.lo] Error 1
    make[3]: *** [all-recursive] Error 1
    make[2]: *** [all-recursive] Error 1
    make[1]: *** [all-recursive] Error 1
    make: *** [all] Error 2

Solution

    PATH=/usr/local/opt/bison/bin:$PATH LDFLAGS=-L/usr/local/opt/openssl/lib CPPFLAGS=-I/usr/local/opt/openssl/include ./configure --prefix=/usr/local/ --with-boost=/usr/local --with-libevent=/usr/local

## Error when running `sudo make install`


    ../.././install-sh -c -d '/usr/lib/php/Thrift/Base'
    mkdir: /usr/lib/php/Thrift: Operation not permitted
    mkdir: /usr/lib/php/Thrift: No such file or directory
    make[4]: *** [install-phpbaseDATA] Error 1
    make[3]: *** [install-am] Error 2
    make[2]: *** [install-recursive] Error 1
    make[1]: *** [install-recursive] Error 1
    make: *** [install-recursive] Error 1

I'm going to just ignore for now. I don't know what that is. I did find this
though https://github.com/Homebrew/legacy-homebrew/issues/15937