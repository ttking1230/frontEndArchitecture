let ifError = (function () {
  // 这个函数没用 就是怕while循环万一卡死了可以退出
  let _name = ''
  let _time = 0
  return function (name, time) {
    _name = _name !== name ? name : _name
    _time++
    if (_time >= time) {
      throw `${name}函数的执行次数超过了${time}次`
    }
  }
})()

var oDiv = {
  type: 'div',
  child: oH1,
  return: null,
  sibling: null
}
Object.defineProperty(oDiv, 'child', { get: () => (oH1) })

var oH1 = {
  type: 'h1',
  child: h1Text,
  return: oDiv,
  sibling: oH2
}
Object.defineProperty(oH1, 'child', { get: () => (h1Text) })
Object.defineProperty(oH1, 'return', { get: () => (oDiv) })
Object.defineProperty(oH1, 'sibling', { get: () => (oH2) })

var oH2 = {
  type: 'h2',
  child: h2Text,
  sibling: oH3,
  return: oDiv
}
Object.defineProperty(oH2, 'child', { get: () => (h2Text) })
Object.defineProperty(oH2, 'return', { get: () => (oDiv) })
Object.defineProperty(oH2, 'sibling', { get: () => (oH3) })

var oH3 = {
  type: 'h3',
  child: oSpan,
  sibling: null,
  return: oDiv
}
Object.defineProperty(oH3, 'child', { get: () => (oSpan) })
Object.defineProperty(oH3, 'return', { get: () => (oDiv) })

var h1Text = {
  type: 'abc',
  return: oH1,
  child: null,
  sibling: null
}
Object.defineProperty(h1Text, 'return', { get: () => (oH1) })

var h2Text = {
  type: '123',
  child: null,
  sibling: oP,
  return: oH2
}
Object.defineProperty(h2Text, 'return', { get: () => (oH2) })
Object.defineProperty(h2Text, 'sibling', { get: () => (oP) })

var oP = {
  type: 'p',
  child: null,
  sibling: null,
  return: oH2
}
Object.defineProperty(oP, 'return', { get: () => (oH2) })

var oSpan = {
  type: 'span',
  child: null,
  sibling: null,
  return: oH3
}
Object.defineProperty(oSpan, 'return', { get: () => (oH3) })





let test_nextUnitOfWork = oDiv

function test_beginWork(a) {
  return a.child
}

function test_completeUnitOfWork(test_nextUnitOfWork) {
  while(true) {
    ifError('test_completeUnitOfWork',50)
    let sibling = test_nextUnitOfWork.sibling
    let returnFiber = test_nextUnitOfWork.return

    console.log(test_nextUnitOfWork.type)

    if (!!sibling) return sibling
    if (!!returnFiber) {
      test_nextUnitOfWork = returnFiber
      continue
    }
    return null
  }
}

function test_performUnitOfWork(test_nextUnitOfWork) {
  let next = test_beginWork(test_nextUnitOfWork)
  if (!next) {
    next = test_completeUnitOfWork(test_nextUnitOfWork)
  }
  return next
}

function test_workLoop() {
  while (!!test_nextUnitOfWork) {
    ifError('test_workLoop',50)
    test_nextUnitOfWork = test_performUnitOfWork(test_nextUnitOfWork)
  }
}

test_workLoop()