import { GENERATE_NUMBER_RANGE, LIST_SORTED, BUBBLE_SORT, HEAP_SORT, INSERTION_SORT, MERGE_SORT, QUICK_SORT, SELECTION_SORT } from '../actions/sortAlgorithms';

const initialState = {
  jumbledNumbers: [],
  sortedNumbers:  [],
  isSorted: false
};

export default function sortAlgorithm(state = initialState, action) {
  const {jumbledNumbers} = state;
  let sortedNumbers = [];

  switch (action.type) {
    case GENERATE_NUMBER_RANGE:
      let numberSet = Array.apply(null, {length: action.max+1}).map(Number.call, Number).reduce((memo, currentValue, currentIndex, array) => {
        let otherIndex = Math.floor(Math.random() * (currentIndex + 1));
        let temp = array[currentIndex];
        array[currentIndex] = array[otherIndex];
        array[otherIndex] = temp;
        return array;
      });

      return Object.assign({}, state, {
        jumbledNumbers: numberSet,
        sortedNumbers: []
      });

    case LIST_SORTED:
      return Object.assign({}, state, {
        isSorted: action.isSorted
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
        sortedNumbers: bubbleSort(jumbledNumbers)
      });

    case HEAP_SORT:
      return Object.assign({}, state, {
        sortedNumbers
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
        sortedNumbers: insertionSort(jumbledNumbers)
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
        sortedNumbers: mergeSort(jumbledNumbers)
      });

    case QUICK_SORT:
      return Object.assign({}, state, {
        sortedNumbers
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
        sortedNumbers: selectionSort(jumbledNumbers)
      });

    default:
      return state;
  }
}
