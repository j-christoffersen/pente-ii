class Node {
  constructor(val) {
    this.children = {};
    this.val = val || 0;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(key, val) {
    let curNode = this.root;

    for (let i = 0; i < key.length; i++) {
      curNode.children[key[i]] = curNode.children[key[i]] !== undefined ?
        curNode.children[key[i]] :
        new Node();

      curNode = curNode.children[key[i]];
    }

    curNode.val = val;
  }

  retrieve(key) {
    let curNode = this.root;

    for (let i = 0; i < key.length; i++) {
      if (curNode.children[key[i]] !== undefined) {
        curNode = curNode.children[key[i]];
      } else {
        return undefined;
      }
    }

    return curNode.val;
  }
}

export default Trie;
