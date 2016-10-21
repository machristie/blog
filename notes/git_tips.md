
# Displaying uncompleted TODOs (experimental)

    git diff develop.. -STODO

# Reverting to old version of a file

    git checkout <revision> -- path/to/file

# Aliases

    git config --global alias.ci commit
    git config --global alias.st status
    git config --global alias.co checkout
    git config --global alias.glog 'log --decorate --oneline --graph'
