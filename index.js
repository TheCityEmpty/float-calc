
function isInteger (val) {
  return Math.floor(val) === val
}

function resloveDecimal (val) {
  val = Number(val)
  const ret = { times: 1, num: 0 }

  if (isInteger(val)) {
    ret.num = val
    return ret
  }

  val = String(val)
  const decimalLength = val.substr(val.indexOf('.')).length
  ret.times = Math.pow(10, decimalLength)
  ret.num = parseInt(val * ret.times + 0.5, 10)
  return ret
}

function simpleCalc (n1, n2, operation) {
  const { num: enlargeNum1, times: enlargeTimes1 } = resloveDecimal(n1)
  const { num: enlargeNum2, times: enlargeTimes2  } = resloveDecimal(n2)
  
  const maxTimes = enlargeTimes1 > enlargeTimes2 ? enlargeTimes1 : enlargeTimes2
  let res = null

  switch (operation) {
    case 'add':
      if (enlargeTimes1 === enlargeTimes2) {
        res = enlargeNum1 + enlargeNum2
      } else if (enlargeTimes1 > enlargeTimes2) {
        res = enlargeNum1 + enlargeNum2 * (enlargeTimes1 / enlargeTimes2)
      } else if (enlargeTimes1 < enlargeTimes2) {
        res = enlargeNum1 * (enlargeTimes2 / enlargeTimes1) + enlargeNum2
      }
      return res / maxTimes
    case 'subtract':
      if (enlargeTimes1 === enlargeTimes2) {
        res = enlargeNum1 - enlargeNum2
      } else if (enlargeTimes1 > enlargeTimes2) {
        res = enlargeNum1 - enlargeNum2 * (enlargeTimes1 / enlargeTimes2)
      } else if (enlargeTimes1 < enlargeTimes2) {
        res = enlargeNum1 * (enlargeTimes2 / enlargeTimes1) - enlargeNum2
      }
      return res / maxTimes
    case 'multiply':
      return (enlargeNum1 * enlargeNum2) / (enlargeTimes1 * enlargeTimes2)
    case 'divide':
      return (enlargeNum1 / enlargeNum2) * (enlargeTimes2 / enlargeTimes1)
  }
}

function add (n1, n2) {
  return simpleCalc(n1, n2, 'add')
}
function subtract (n1, n2) {
  return simpleCalc(n1, n2, 'subtract')
}
function multiply (n1, n2) {
  return simpleCalc(n1, n2, 'multiply')
}
function divide (n1, n2) {
  return simpleCalc(n1, n2, 'divide')
}


function isString(val) {
  return Object.prototype.toString.call(val) === '[object String]'
}
function reverseString (val) {
  return val.split('').reverse().join('')
}

const mapTree = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide
}
const firstExpress = ['*', '/']
const lastExpress = ['+', '-']
const reg = /(\*)|(\+)|(\-)|(\/)/g

function firstExpressCalc (tree) {
  tree.some((item, index) => {
      if (firstExpress.indexOf(item) !== -1) {
        const calcRes = mapTree[item](tree[index - 1],  tree[index + 1])
        tree.splice(index - 1, 3, calcRes)
        return true
      }
  })

  if (tree.find(item => firstExpress.find(fitem => fitem === item))) {
    return firstExpressCalc(tree)
  } else {
    return tree
  }
}

function lastExpressCalc (tree) {
  tree.some((item, index) => {
    if (lastExpress.indexOf(item) !== -1) {
      const calcRes = mapTree[item](tree[index - 1],  tree[index + 1])
      tree.splice(index - 1, 3, calcRes)
      return true
    }
  })

  if (tree.find(item => lastExpress.find(fitem => fitem === item))) {
    return lastExpressCalc(tree)
  } else {
    return tree
  }
}


function recursionCalc (tree) {
  tree = firstExpressCalc(tree)
  tree = lastExpressCalc(tree)

  return tree
}

function splitExpression (str) {
  return str.split(reg).filter(i => {
    return i !== undefined && i !== ''
  })
}

function sliceNum (val , num) {
  val = Number(val) || 0
  val = String(val)
  const handleArr = val.split('.')

  const int = handleArr[0]
  const decimal = handleArr[1]
  if (decimal) {
    return Number(`${int}.${decimal.slice(0, num || decimal.length)}`)
  } else {
    return Number(int)
  }
}

function calc (expression, keepNum, keepType = 'slice') {
  if(!isString(expression)) {
    console.error('[floatCalc]:所传入的不是个字符串表达式！')
    return
  }

  expression = expression.replace(/\s*/g, '')
  let tree = splitExpression(expression)
  let strCalcRes = String(recursionCalc(tree))

  if (keepType === 'slice') {

    return sliceNum(strCalcRes, keepNum)

  } else if (keepType === 'toFixed') {

    keepNum = keepNum || strCalcRes.substr(val.indexOf('.')).length
    strCalcRes = Number(strCalcRes)
    return strCalcRes[keepType](keepNum)

  }

   
}

export {
  add,
  subtract,
  multiply,
  divide,
  calc
}