#"Last Change: 09-Feb-2014."

cp `find ./_default -type f` ./
npm install
grunt svinit
#npm install -g grunt-cli
node_modules/bower/bin/bower install
