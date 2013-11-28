#"Last Change: 28-Nov-2013."

cp `find ./_default -type f` ./
npm install
grunt svinit
# npm install -g grunt-cli
node_modules/bower/bin/bower install
