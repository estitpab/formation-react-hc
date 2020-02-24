function foo() {
  return 42;
}

foo(); // 42

const bar = function() {
  return 42;
};

// Arrow functions

const add = function(a, b) {
  return a + b;
};

const add = (a, b) => {
  return a + b;
};

const add = (a, b) => a + b;

const squares = array.map(a => a * a);
