import { GENERATE_NUMBER_RANGE, LIST_SORTED, VALIDATE_MAX_HEAP, BUBBLE_SORT, HEAP_SORT, INSERTION_SORT, MERGE_SORT, QUICK_SORT, SELECTION_SORT } from '../actions/sortAlgorithms';

const sortTypes = {
  bubbleSort:    'Bubble Sort',
  heapSort:      'Heap Sort',
  insertionSort: 'Insertion Sort',
  mergeSort:     'Merge Sort',
  quickSort:     'Quick Sort',
  selectionSort: 'Selection Sort'
};

const initialState = {
  jumbledNumbers: [],
  sortedNumbers:  [],
  isSorted: false,
  isMaxHeap: false,
  sortType: null,
  sortTypes
};

export default function sortAlgorithm(state = initialState, action) {
  const {jumbledNumbers} = state;
  let sortedNumbers = [];

  switch (action.type) {
    case GENERATE_NUMBER_RANGE:
      const numberSet = Array.apply(null, {length: action.max+1}).map(Number.call, Number).reduce((memo, currentValue, currentIndex, array) => {
        const randomIndex = Math.floor(Math.random() * array.length);

        array[currentIndex] = array[randomIndex];
        array[randomIndex]  = currentValue;
        return array;
      });

      return Object.assign({}, state, {
        jumbledNumbers: numberSet,
        sortedNumbers: [],
        sortType: null
      });

    case LIST_SORTED:
      return Object.assign({}, state, {
        isSorted: action.isSorted
      });

    case VALIDATE_MAX_HEAP:
      return Object.assign({}, state, {
        isMaxHeap: action.maxHeapValidated
      });

    case BUBBLE_SORT:
      const bubbleSort = function(array=[]) {
        let sortedArray = array.slice();
        let swaps = 0;

        do {
          swaps = 0;
          sortedArray.forEach((currentValue, currentIndex) => {
            if (sortedArray.length > 1 && currentIndex < sortedArray.length-1 && currentValue > sortedArray[currentIndex+1]) {
              sortedArray.splice(currentIndex, 1);
              sortedArray.splice(currentIndex+1, 0, currentValue);
              swaps++;
            }
          });
        }
        while (swaps > 0);

        return sortedArray;
      };

      return Object.assign({}, state, {
        sortedNumbers: bubbleSort(jumbledNumbers),
        sortType: sortTypes.bubbleSort
      });

    case HEAP_SORT:
      const heapSort = function(array=[]) {
        return [,10,9,7,8,4,6,3,5,2,1,0];
        //         10
        //     9        7
        //  8     4    6 3
        // 5 2   1 0

        // heapify(array, array.length);
        // return array;
      };

      const heapify = function(heap, position) {
        return heap;
      };

      return Object.assign({}, state, {
        sortedNumbers: heapSort(jumbledNumbers),
        sortType: sortTypes.heapSort
      });

    case INSERTION_SORT:
      const insertionSort = function(array=[]) {
        return array.reduce((sortedArray, currentValue, currentIndex) => {
          let position = currentIndex;
          while (sortedArray.length && currentValue < sortedArray[position-1])
            position--;

          sortedArray.splice(position, 0, currentValue);
          return sortedArray;
        }, []);
      };

      return Object.assign({}, state, {
        sortedNumbers: insertionSort(jumbledNumbers),
        sortType: sortTypes.insertionSort
      });

    case MERGE_SORT:
      const mergeSort = function(array=[]) {
        if (array.length < 2)
          return array;

        let mid = array.length/2,
            sliceLeft = array.slice(0, mid),
            sliceRight = array.slice(mid);

        sliceLeft = mergeSort(sliceLeft);
        sliceRight = mergeSort(sliceRight);
        return sort({sliceLeft, sliceRight});
      };

      const sort = function({sliceLeft, sliceRight}) {
        let sortedArray = [];

        while (sliceLeft.length || sliceRight.length) {
          let lhs = sliceLeft.length  ? sliceLeft[0]  : null,
              rhs = sliceRight.length ? sliceRight[0] : null,
              takingFromTheLeft = lhs !== null && lhs < rhs || rhs === null;

          takingFromTheLeft ?
            sortedArray.push(sliceLeft.shift()) :
            sortedArray.push(sliceRight.shift());
        };

        return sortedArray;
      };

      return Object.assign({}, state, {
        sortedNumbers: mergeSort(jumbledNumbers),
        sortType: sortTypes.mergeSort
      });

    case QUICK_SORT:
      const quickSort = function(array=[]) {
        return array;
      };

      return Object.assign({}, state, {
        sortedNumbers: quickSort(jumbledNumbers),
        sortType: sortTypes.quickSort
      });

    case SELECTION_SORT:
      const selectionSort = function(array=[]) {
        let sortedArray = array.slice();

        sortedArray.forEach((currentValue, currentIndex) => {
            let lowestIndex = sortedArray.reduce((lowestIndex, currentValue, index) => {
              if (index >= currentIndex && currentValue <= sortedArray[lowestIndex])
                return index;
              return lowestIndex;
            }, currentIndex);

            sortedArray.splice(currentIndex, 0, sortedArray[lowestIndex]);
            sortedArray.splice(lowestIndex+1, 1);
        });

        return sortedArray;
      };

      return Object.assign({}, state, {
        sortedNumbers: selectionSort(jumbledNumbers),
        sortType: sortTypes.selectionSort
      });

    default:
      return state;
  }
}
