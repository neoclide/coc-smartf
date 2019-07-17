# coc-smartf

Make jump to character easier.

<img alt="Git" src="https://user-images.githubusercontent.com/251450/59192006-ada21c00-8bb3-11e9-994e-027ab5de06bf.gif" height="475" width="630" />

## Install

Run command:

```vim
:CocInstall coc-smartf
```

in your vim.

## Usage

```vim
" press <esc> to cancel.
nmap f <Plug>(coc-smartf-forward)
nmap F <Plug>(coc-smartf-backward)
nmap ; <Plug>(coc-smartf-repeat)
nmap , <Plug>(coc-smartf-repeat-opposite)

augroup Smartf
  autocmd User SmartfEnter :hi Conceal ctermfg=220 guifg=#6638F0
  autocmd User SmartfLeave :hi Conceal ctermfg=239 guifg=#504945
augroup end
```

## Options

- `smartf.timeout`: timeout for jump in milliseconds, default `1000`.
- `smartf.jumpOnTrigger`: Jump to first available character on trigger, default `true`.
- `smartf.wordJump`: Consider first word character for jump only, default: `true`.
- `smartf.charactersIgnoreByNavigator`: Characters will not become a character for navigator, default: [].

## Related

- [vim-sneak](https://github.com/justinmk/vim-sneak)
- [Seek](https://github.com/goldfeld/vim-seek)
- [EasyMotion](https://github.com/Lokaltog/vim-easymotion)
- [smalls](https://github.com/t9md/vim-smalls)
- [improvedft](https://github.com/chrisbra/improvedft)
- [clever-f](https://github.com/rhysd/clever-f.vim)
- [vim-extended-ft](https://github.com/svermeulen/vim-extended-ft)
- [Fanf,ingTastic;](https://github.com/dahu/vim-fanfingtastic)

## License

MIT
