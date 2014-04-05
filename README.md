

The blog is currently hosted at http://marcus-christie.blogspot.com/.

# Building the Python environment

First install Python 3.4. Then run the following:

    pyvenv-3.4 blogenv
    blogenv/bin/pip install Markdown
    blogenv/bin/pip install pygments

Then you can activate the environment like normal.

# Converting Markdown

I run
    
    markdown_py -x codehilite drafts/myblog.md | pbcopy

On a Mac this copies the output to the clipboard then I can paste in the blog
post into Blogger's blog editor.

# Issues

* the `markdown_py` script has DOS line endings. So I open it in Vim, run `:set
  ff=unix` and then save the file again.  (seems to be a known issue
  https://github.com/waylan/Python-Markdown/issues/289)
