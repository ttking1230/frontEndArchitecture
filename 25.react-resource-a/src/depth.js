
// 深度优先遍历，子节点优先
// 广度优先遍历，兄弟节点优先
let tree = {
    value: "A",
    left: {
        value: "B",
        left: {
            value: "D"
        },
        right: {
            value: "E"
        }
    },
    right: {
        value: "C",
        left: {
            value: "F"
        },
        right: {
            value: "G"
        }
    }
}

let depth = -1; //深度，也被称为层级

function traverse(node) {
    depth++;
    if (node) {
        console.log("进栈", depth, node.value);
        traverse(node.left);
        traverse(node.right);
    }
    depth--;
    console.log("出栈", depth, node ? node.value : node);
}

// 0 A
// 1 B
// 2 D
// 2 E
// 1 C
// 2 F
// 2 G


function diff() {
    traverse(tree);
    console.log(depth);
    if (depth === -1) {
        // 回到初始状态，结束
        console.log("遍历结束");
    }
}
diff();