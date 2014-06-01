
<!--Git client setup-->

These are some settings and configuration I've found useful so far while working
with Git.

## Git global configuration

    :::bash
    git config --global user.name "Marcus Christie"
    git config --global user.email marc.christie@gmail.com

Can also set an editor to use for commit messages

    :::bash
    git config --global core.editor gvim

Or [with MacVim on OS X][1]

    :::bash
    git config --global core.editor 'mvim -f'

However, I think I prefer to edit commit messages in the terminal.

You can also use gvimdiff as a merge tool, but I haven't tried this yet.

## Excludes file

Set up a global excludes file in `~/.config/git/ignore`. My entries so far:

    *.swp
    .DS_Store
    Session.vim

## Whitespace

On Windows you want

    :::bash
    git config --global core.autoclrf true

I think this is the default on Windows also, so this may be unnecessary.

## Credential helper

This tip is mainly for when you are working with a repo over HTTPS, for example,
with GitHub, and you authenticate with a username and password. You don't want
to have to type passwords over and over. For this you can specify a credential
helper that will securely store your password.  On OS X:

    :::bash
    git config --global credential.helper osxkeychain

On Windows, download [git-credential-store][2].  Then start up *Git Bash*, go to
the directory where you downloaded the executable and then run it from the
command line

    :::bash
    $ git-credential-winstore.exe


## Aliases

Shortcuts so you can run `git ci -m "fixed bug"` instead of typing out `commit`

    :::bash
    git config --global alias.ci commit
    git config --global alias.st status
    git config --global alias.co checkout

## Bash completions

On Windows, *Git Bash* comes with these already configured. On OS X, I
downloaded [git-completion.bash][3], dropped it in `~/bin` and in
`.bash_profile` I have

    :::bash
    ## Git completions
    source ~/bin/git-completion.bash

## Web viewer

On OS X:

    :::bash
    git config --global instaweb.httpd webrick

Now you can start up a web viewer with

    :::bash
    git instaweb

As a Mercurial refugee, I got used to `hg serve` so I like to have a web view.

Haven't tried doing this on Windows yet.

## push.default

Set `push.default` to simple:

    :::bash
    git config --global push.default simple

This setting affects what happens when you do a `git push` without specifing a
remote or branch to push.  With *simple* git will push the current branch to the
upstream tracked branch.  This mode also is the new default in Git 2.0.

Make sure that when you first push a branch to a remote server that you also set
it as the upstream tracked branch. You can do that with the `-u` option:

    :::bash
    git push -u origin mybranch

From then on every push can be done simply with

    :::bash
    git push

## merge.defaultToUpstream

Set `merge.defaultToUpstream` to true

    :::bash
    git config --global merge.defaultToUpstream true

This setting affects what happens when you do a `git merge` without specifying a
branch to merge from. With this set to true, git will merge in changes from the
upstream remote tracking branch, which is generally what you want.

## Anything else?

Are there any other things you do to configure Git on a new machine? Let me know
in the comments or on [Twitter][4].


[1]: http://stackoverflow.com/questions/4737381/git-editor-not-working-with-macvim
[2]: http://gitcredentialstore.codeplex.com/
[3]: https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
[4]: https://twitter.com/marcus_christie
