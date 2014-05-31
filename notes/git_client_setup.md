
# Git client setup

## Git global configuration

    git config --global user.name "Marcus Christie"
    git config --global user.email marc.christie@gmail.com"

Can also set an editor to use for commit messages

    git config --global core.editor gvim

Or [with MacVim on OS X][1]

    git config --global core.editor 'mvim -f'

However, I think I prefer to edit commit messages in the terminal.

You can also use gvimdiff as a merge tool, but I haven't tried this yet.

## Excludes file

Set up a global excludes file in `~/.config/git/ignore`. My entries so far

    *.swp
    .DS_Store
    Session.vim

## Whitespace

On Windows you want

    git config --global core.autoclrf true

I think this is the default on Windows also, so this may be unnecessary.

## Credential helper

You don't want to have to type passwords over and over. For this you can specify
a credential helper that will securely store your password.  On OS X:

    git config --global credential.helper osxkeychain

On Windows, download [git-credential-store][2].  Then start up *Git Bash*, go to
the directory where you downloaded the executable and then run it from the
command line

    $ git-credential-winstore.exe


## Aliases

Shortcuts so you can run `git ci -m "fixed bug"` instead of typing out `commit`

    git config --global alias.ci commit
    git config --global alias.st status
    git config --global alias.co checkout

## Bash completions

On Windows, *Git Bash* comes with these already configured. On OS X, I
downloaded [git-completion.bash][3], dropped it in `~/bin` and in
`.bash_profile` I have

    ## Git completions
    source ~/bin/git-completion.bash

## Web viewer

On OS X:

    git config --global instaweb.httpd webrick

Now you can start up a web viewer with

    git instaweb

As a Mercurial refugee, I got used to `hg serve` so I like to have a web view.

Haven't tried doing this on Windows yet.

[1]: http://stackoverflow.com/questions/4737381/git-editor-not-working-with-macvim
[2]: http://gitcredentialstore.codeplex.com/
[3]: https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
