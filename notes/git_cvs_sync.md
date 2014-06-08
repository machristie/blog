

# The first time importing from CVS

    git cvsimport -C myproject -k -r cvs myproject

Assuming that CVSROOT environment variable is set, otherwise pass the cvsroot
directory with the `-d` option.  The `-C` option specifies the name of the git
repository. `-k` is to kill keywords. `-r` specifies the somewhat fake remote
under which CVS branches will be created.

Use this Git repository for syncing with CVS. Clone this repository as a bare
repository to get a repo that other users can pull from/push to. I'll refer to
this repository as _gitroot_.

# Incrementally importing from CVS

Pull in any new commits from _gitroot_, import new CVS commits, then merge and
push back to _gitroot_.

    cd /path/to/git_repo_for_cvs_syncing
    git pull --ff-only gitroot master
    git cvsimport -k -r cvs -i myproject
    # -C isn't needed because the default is the current directory
    git merge --ff-only cvs/master
    # merge in any new commits
    git push gitroot master

# Exporting a Git commit back to CVS

After doing some work on _mybranch_, switch back to _master_. Then, rebase with
_origin/master_.

    git checkout master
    git pull --rebase

Now, you want to merge your branch to _master_, but you'll want it to not be a
fast forward commit.

    git merge --no-ff mybranch

By merging the branch with no-fast-forward, you can then export this merge
commit at once back to CVS. `git cvsexportcommit` only exports one commit at a
time. You could merge the branch as a fast-forward (if possible), but then you
would need to export each commit on that branch back to CVS.

Assuming your merge commit is the tip of master, you can do

    git cvsexportcommit -w ../path/to/cvs/checkout -u -p -c master^ master

If not, then you need to figure out the commit hash of the merge commit and its
parent commit hash on master. In which case you might instead do something like

    git cvsexportcommit -w ../path/to/cvs/checkout -u -p -c 0966c7e4 face6747

# Problems with this approach

When you export a git commit back to CVS, it will later get reimported with a
different commit hash. Git can merge this just fine, but your history now has
the same commit twice.  It looks something like this.

    *    merge commit
    |\
    | *  exported commit
    * /  commit on git master
    |/
    *

# References

* http://stackoverflow.com/a/586225/1419499

