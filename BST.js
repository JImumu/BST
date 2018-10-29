class Node {
    constructor(data, left, right) {
        this.data = data
        this.left = left || null
        this.right = right || null
    }
}

class Tree {
    constructor (node) {
        this.root = node || null
    }

    dataCheck (data) {
        if (isNaN(data)) {
            throw '请输入合法数字！'
        }
        return +data
    }

    insert (data) {
        data = this.dataCheck(data)
        let node = new Node(data)
        if (this.root === null) {
            this.root = node
        } else {
            this.insertNode(node, this.root)
        }
        return this
    }

    insertNode (node, oldNode) {
        if (node.data === oldNode.data) {
            throw '该值已存在（' + node.data + '），请插入新值'
        } else {
            let leftOrRight = node.data > oldNode.data ? 'right' : 'left'
            if (oldNode[leftOrRight] === null) {
                oldNode[leftOrRight] = node
            } else {
                this.insertNode(node, oldNode[leftOrRight])
            }
        }
    }

    find (data, node, parent) {
        data = this.dataCheck(data)
        node = node === undefined ? this.root : node
        if (node === null) {
            return null
        } else if (data === node.data) {
            return {
                node: node,
                parent: parent
            }
        } else {
            let leftOrRight = data > node.data ? 'right' : 'left'
            return this.find(data, node[leftOrRight], node)
        }
    }

    remove (data) {
        let node = this.find(data)
        if (!node) {
            // 树中不存在该节点
        } else {
            if (node.node.left && node.node.right) {
                // 被删节点拥有两个子节点
                console.warn('该节点拥有两个字节点，暂不支持删除')
            } else {
                // 被删节点有一个子节点
                let leftOrRightCurrent = !node.node.left ? 'right' : 'left'
                if (!node.parent) {
                    // 删除父节点
                    this.root = node.node[leftOrRightCurrent]
                } else {
                    let leftOrRightParent = node.node.data > node.parent.data ? 'right' : 'left'
                    node.parent[leftOrRightParent] = node.node[leftOrRightCurrent]
                }
            }
        }
        return this
    }
}
let tree = new Tree ()
tree.insert(100)
tree.insert(50)
tree.insert(25)
tree.insert(75)
tree.insert(15)
tree.insert(10)
tree.insert(5)
tree.insert(8)
tree.insert(11)

tree.find(11)

tree.remove(11)
