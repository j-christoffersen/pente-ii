// delete this file when done copying all code

/* eslint quote-props: 0 */

const patterns = {
  '210': 1,
  '010': 5 ** 1,
  '2110': 0, // TODO
  '0110': 5 ** 2,
  '21110': 5 ** 2,
  '01110': 5 ** 4,
  '211110': 5 ** 5,
  '011110': 5 ** 6,
  '11111': 5 ** 7,
};

const CAPTURES = 5 ** 3;

class Node {
  constructor(val) {
    this.children = {};
    this.val = val;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(key, val) {
    let curNode = this.root;

    for (let i = 0; i < key.length; i++) {
      curNode.children[key[i]] = curNode.children[key[i]] || new Node();
      curNode = curNode.children[key[i]];
    }

    curNode.val = val;
  }

  retrieve(key) {
    let curNode = this.root;

    for (let i = 0; i < key.length; i++) {
      if (curNode.children[key[i]]) {
        curNode = curNode.children[key[i]];
      } else {
        return undefined;
      }
    }

    return curNode.val;
  }
}

const trie = new Trie();

const keys = Object.keys(patterns);

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];

  trie.insert(key, patterns[key]);
  trie.insert(key.split('').reverse().join(), patterns[key]);
}
