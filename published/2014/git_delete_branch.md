
# Git: How to delete a branch

How do you create a temporary branch to do some work in (e.g, a feature branch), and then when you have merged it to *master* and are done with it, how do you delete it, both locally and remotely?

Let's create a simple repo to experiment with. We'll add just one file to it.

    :::bash
    mkdir myprj
    cd myprj
    git init
    vim README.md
    git add README.md
    git commit -m "adding a README"

Okay, this will be our "central repo". Let's clone it, create a branch and do
some work on it.

    :::bash
    git clone myprj myprj2
    cd myprj2
    git branch install_notes
    git checkout install_notes
    vim README.md
    git commit -a -m "Adding some installation notes"
    git push origin install_notes
    # Oops, forgot to set upstream
    git push --set-upstream origin install_notes

The branch *install_notes* now exists locally and in the "central repo". Let's
merge it and then delete it locally and also remotely. Before we get started
though, here are all of our local and remote branches:

    :::bash
    marcus$ git branch -avv
        * install_notes                6a5ed4c [origin/install_notes] Adding some installation notes
        master                       27c8a05 [origin/master] adding a README
        remotes/origin/HEAD          -> origin/master
        remotes/origin/install_notes 6a5ed4c Adding some installation notes
        remotes/origin/master        27c8a05 adding a README

First, let's switch back to *master* and try to delete *install_notes*:

    :::bash
    marcus$ git checkout master
        Switched to branch 'master'
        Your branch is up-to-date with 'origin/master'.
    marcus$ git branch -d install_notes
        warning: deleting branch 'install_notes' that has been merged to
                'refs/remotes/origin/install_notes', but not yet merged to HEAD.
        Deleted branch install_notes (was 6a5ed4c).

Hmm. It gave a warning, but proceeded to delete the branch anyways. Well, let's
try to check it back out.

    :::bash
    marcus$ git checkout -b install_notes origin/install_notes
        Branch install_notes set up to track remote branch install_notes from origin.
        Switched to a new branch 'install_notes'
    marcus$ git checkout master
        Switched to branch 'master'
        Your branch is up-to-date with 'origin/master'.
    marcus$ git merge install_notes
        Updating 27c8a05..6a5ed4c
        Fast-forward
        README.md | 4 ++++
        1 file changed, 4 insertions(+)

Okay, now we can delete the branch.

    :::bash
    marcus$ git branch -d -r origin/install_notes
    Deleted remote branch origin/install_notes (was 6a5ed4c).
    marcus$ git branch -d install_notes
    Deleted branch install_notes (was 6a5ed4c).

And now my branches look like this

    :::bash
    marcus$ git branch -avv
        * master                6a5ed4c [origin/master: ahead 1] Adding some installation notes
        remotes/origin/HEAD   -> origin/master
        remotes/origin/master 27c8a05 adding a README

