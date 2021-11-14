const fs = require("fs");
const data = fs.readFileSync("8_harder.txt", "UTF-8");
const lines = data.split(/\r?\n/);
const L = parseInt(lines[0].split(" ")[0]);
const C = parseInt(lines[0].split(" ")[1]);
const N = parseInt(lines[0].split(" ")[2]);

var people = [];
for (let i = 1; i <= N; i++) {
  const pi = parseInt(lines[i]);
  people.push(pi);
}

let earnings = 0;
let cycle_groups = [people.toString()];
var index_group = -1;
let groups = [];

do {
  var s = 0;
  // generate a group
  for (let i = 0; i < N && s + people[0] <= L; i++) {
    let firstElt = people.shift();
    s += firstElt;
    people.push(firstElt);
  }
  // verify if a group exists to detect the start of a cycle
  index_group = cycle_groups.indexOf(people.toString());
  cycle_groups.push(people.toString());
  groups.push(s);
} while (index_group == -1 && groups.length < C);

if (groups.length == C) {
  earnings = groups.reduce((a, b) => a + b);
} else {
  // earnings before the cycle
  for (var i = 0; i < index_group; i++) {
    earnings += groups[i];
  }

  // number of cycles and the number of elts in the last uncompleted cycle
  let rest_of_cycles = (C - index_group) % (groups.length - index_group);
  let nbCycles =
    (C - index_group - rest_of_cycles) / (groups.length - index_group);

  // earnings within cycles
  for (i; i < groups.length; i++) {
    earnings += groups[i] * nbCycles;
  }

  // earnings after complete cycless
  for (i = index_group; i < index_group + rest_of_cycles; i++) {
    earnings += groups[i];
  }
}
console.log(earnings);
