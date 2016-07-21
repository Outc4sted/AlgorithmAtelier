import { GENERATE_NUMBER_RANGE, LIST_SORTED, MAX_HEAP_BUILT, BUBBLE_SORT, HEAP_SORT, INSERTION_SORT, MERGE_SORT, QUICK_SORT, SELECTION_SORT } from '../actions/sortAlgorithms';

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

    case MAX_HEAP_BUILT:
      return Object.assign({}, state, {
        isMaxHeap: action.isMaxHeap
      });

    case BUBBLE_SORT:
      const bubbleSort = function(array=[]) {
        const sortedArray = array.slice();
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
        const maxHeap = [ , ...array];

        for (let currentIndex = Math.floor(maxHeap.length/2); currentIndex >= 0; currentIndex--)
          heapify(maxHeap, maxHeap.length, currentIndex);

        return hsort(maxHeap);
      };

      const heapify = function(maxHeap, maxLength, currentIndex=1) {
        const lhIndex = currentIndex * 2,
              rhIndex = currentIndex * 2 + 1,
              lhInBounds = lhIndex < maxLength,
              rhInBounds = rhIndex < maxLength;

        let greatestIndex = currentIndex;
        if (lhInBounds && maxHeap[currentIndex] < maxHeap[lhIndex])
          greatestIndex = lhIndex;
        if (rhInBounds && maxHeap[greatestIndex] < maxHeap[rhIndex])
          greatestIndex = rhIndex;

        if (greatestIndex !== currentIndex) {
          const greatestValue = maxHeap[greatestIndex];
          maxHeap[greatestIndex] = maxHeap[currentIndex];
          maxHeap[currentIndex] = greatestValue;

          heapify(maxHeap, maxLength, greatestIndex);
        }
      };

      const hsort = function(maxHeap) {
        for (let currentIndex = maxHeap.length-1; currentIndex > 0; currentIndex--) {
          const swap = maxHeap[currentIndex],
                maxLength = currentIndex;

          maxHeap[currentIndex] = maxHeap[1];
          maxHeap[1] = swap;
          heapify(maxHeap, maxLength);
        }

        maxHeap.splice(0, 1);
        return maxHeap;
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

        const mid = array.length/2,
              sliceLeft = mergeSort(array.slice(0, mid)),
              sliceRight = mergeSort(array.slice(mid));

        return msort({ sliceLeft, sliceRight });
      };

      const msort = function({ sliceLeft, sliceRight }) {
        const sortedArray = [];

        while (sliceLeft.length || sliceRight.length) {
          const lhs = sliceLeft.length  ? sliceLeft[0]  : null,
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
        const sortedArray = array.slice(),
              thirds = Math.floor(sortedArray.length/3),
              pivot = sortedArray.length > 8 ?
                medianOfThree([ medianOfThree(sortedArray.slice(0, thirds)), medianOfThree(sortedArray.slice(thirds, thirds*2)), medianOfThree(sortedArray.slice(thirds*2)) ]) :
                medianOfThree(sortedArray);

        qsort(sortedArray, pivot, 0, sortedArray.length);

        return sortedArray;
      };

      const medianOfThree = function(set) {
        if (set.length > 2) {
          const pivots = [
            set[0],
            set[Math.floor(set.length/2)],
            set[set.length-1]
          ].sort((a, b) => a > b );

          return pivots[1];
        }
        else if (set.length === 1)
          return set[0];

        const randomIndex = Math.floor(Math.random() * set.length);
        return set[randomIndex];
      };

      const qsort = function(set, pivot, startIndex, endIndex) {
      };

      return Object.assign({}, state, {
        sortedNumbers: quickSort(jumbledNumbers),
        sortType: sortTypes.quickSort
      });

    case SELECTION_SORT:
      const selectionSort = function(array=[]) {
        const sortedArray = array.slice();

        sortedArray.forEach((currentValue, currentIndex) => {
            const lowestIndex = sortedArray.reduce((lowestIndex, currentValue, index) => {
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
