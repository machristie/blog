
# Customizations

## last-cursor-position

To get Vim keybindings, add the following to keymap.cson

    'atom-workspace':
      'ctrl-o': 'last-cursor-position:previous'
      'ctrl-i': 'last-cursor-position:next'