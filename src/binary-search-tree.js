const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }
  root() {
    return this.node;
  }

  add(data) {
    if (!this.node) {
      this.node = new Node(data);
    } else {
      let root = this.node;
      let newRoot = new Node(data);
      while (root) {
        if (data > root.data) {
          if (!root.right) {
            break;
          }
          root = root.right
        } else {
          if (!root.left) {
            break;
          }
          root = root.left
        }
      }
      if (data > root.data) {
        root.right = newRoot;
      } else {
        root.left = newRoot;
      }
    }

  }

  has(data, node = this.node) {
    if (node === null) {
      return false;
    }

    if (node.data === data) {
      return true;
    }

    if (node.data < data) {
      return this.has(data, node.right);
    } else {
      return this.has(data, node.left)
    }
  }

  find(data, node = this.node) {
    if (node === null) {
      return null;
    }

    if (node.data === data) {
      return node;
    }

    if (node.data < data) {
      return this.find(data, node.right);
    } else {
      return this.find(data, node.left)
    }
  }

  remove(data, node = this.node) {
    function getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
          curr = curr.left;
      }
      return curr;
    }

    if (node === null) {
      return node;
    }

    if (node.data > data) {
      node.left = this.remove(data, node.left);
    } else if (node.data < data) {
      node.right = this.remove(data, node.right);
    } else {
      if (node.left === null) 
        return node.right;

      if (node.right === null) 
        return node.left;

      let succ = getSuccessor(node);
      node.data = succ.data;
      node.right = this.remove(succ.data, node.right);
    }

    return node;
  }

  min() {
    let root = this.node;
    while (root) {
        if (!root.left) {
          break;
        }
        root = root.left
      }
      return root.data;
    }
  
  max() {
    let root = this.node;
    while (root) {
        if (!root.right) {
          break;
        }
        root = root.right
      }
      return root.data;
    }
}


module.exports = {
  BinarySearchTree
};