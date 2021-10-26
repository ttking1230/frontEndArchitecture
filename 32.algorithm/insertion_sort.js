


// 插入排序:O(n的平方)，性能贼垃圾
// 涉及到数据量大的时候，千万不要写出O(n的平方)的复杂度的代码，切记！！！

function insertion_sort(A) {
    for (let j = 1; j < A.length; j++) {
        const key = A[j];
        let i = j - 1;
        while (i >= 0 && A[i] > key) {
            A[i + 1] = A[i];
            i--;
        }
        A[i + 1] = key;
    }

    return A;
}

let arr = insertion_sort([3, 2, 1]);
console.log(arr);



function concat_sort(A, B) {
    let key = B.shift();
    // for (let i = A.length - 1; i >= 0; i--) {
    while (key) {
        let index = A.length - 1;
        while (index >= 0 && A[index] > key) {
            A[index + 1] = A[index];
            A[index] = key;
            index--;
        }
        key = B.shift();
    }
    // }
    return A;

}
let aaaaa = concat_sort([1, 3, 5], [2, 4, 6]);
console.log(aaaaa);