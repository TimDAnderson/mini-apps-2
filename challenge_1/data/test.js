const fs = require('fs');
var data = JSON.parse(fs.readFileSync('./db.json'));
console.log(data.events.length);
var category1set = new Set();
for (var i = 0; i < data.events.length; i++) {
  category1set.add(data.events[i]['category1'])
}
console.log(category1set)