rm -rf docs/generator
ng build generator --base-href=/simple-form/generator/
cp -r dist/generator/browser docs/generator
git commit -am 'auto docs'
git push
