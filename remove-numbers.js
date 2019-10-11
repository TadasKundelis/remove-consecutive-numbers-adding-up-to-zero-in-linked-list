const fs = require('fs')

function arrayToList(arr) {
  let head, tail
  for(const num of arr) {
    if(!head) {
      head = new Node(num)
      tail = head
    } else {
      tail.next = new Node(num)
      tail = tail.next
    }
  }
  return head
}

function listToArray(list) {
  const arr = []
  while(list) {
    arr.push(list.value)
    list = list.next
  }
  return arr
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

function removeNumbers(head) {
  let map = {}, sum = 0, currentNode = head
  while(currentNode) {
    sum += currentNode.value
    if(sum === 0) {
      map = {}
      head = currentNode.next
    } else if(map[sum]) {
      map[sum].next = currentNode.next
    } else {
      map[sum] = currentNode
    }
    currentNode = currentNode.next
  }
  return head
}

let bigArray

// performance test
fs.readFile('./list.txt', (err, data) => {
  if(err) console.log(err)
  bigArray = data.toString().split('\n').map(line => line.split(' ').map(Number))[0]// size = 399899
  const originalSum = bigArray.reduce((a, b) => a + b, 0) // 50908
  const bigList = arrayToList(bigArray)
  const beforeTime = new Date().getTime()
  const newBigList = removeNumbers(bigList)
  const afterTime = new Date().getTime()
  const newBigArray = listToArray(newBigList) // size = 49887
  const newSum = newBigArray.reduce((a, b) => a + b, 0) // 50908
  console.log(`running time: ${afterTime - beforeTime}ms`) // ~140ms
})

// smaller tests
const tests = [
  {
    inputArray: [0, 0],
    expected: []
  },
  {
    inputArray: [0, 0, 1],
    expected: [1]
  },
  {
    inputArray: [1, 2, 3, 4],
    expected: [1, 2, 3, 4]
  },
  {
    inputArray: [3, -2, -1, 1],
    expected: [1]
  },
  {
    inputArray: [-1, 3, -2, -1, 1],
    expected: []
  },
  {
    inputArray: [-10, 3, 10, -3, 5, 19, -5],
    expected: [5, 19, -5]
  },
  {
    inputArray: [5, 5, 5, 5, -20],
    expected: []
  },
  {
    inputArray: [2, 5, 5, 5, 5, -20, -9, 3, 3, 3, 3, -2],
    expected: [2, 3, -2]
  },
]

function runTest({inputArray, expected}) {
  const list = arrayToList(inputArray)
  const newList = removeNumbers(list)
  return listToArray(newList).every((item, index) => item === expected[index])
}

console.log(
  tests.map(runTest)
)





