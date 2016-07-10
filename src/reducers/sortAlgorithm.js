import { GENERATE_NUMBER_RANGE, LIST_SORTED, HEAP_SORT, INSERTION_SORT, MERGE_SORT, QUICK_SORT } from '../actions/sortAlgorithms';

const initialState = {
  jumbledNumbers: [],
  sortedNumbers:  [],
  isSorted: false
};

export default function sortAlgorithm(state = initialState, action) {
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
        jumbledNumbers: numberSet
      });

    case LIST_SORTED:
      return Object.assign({}, state, {
        isSorted: action.isSorted
      });

    case MERGE_SORT:
      return Object.assign({}, state, {
        sortedNumbers
      });

    case HEAP_SORT:
      return Object.assign({}, state, {
        sortedNumbers
      });

    case INSERTION_SORT:
      return Object.assign({}, state, {
        sortedNumbers
      });

    case QUICK_SORT:
      return Object.assign({}, state, {
        sortedNumbers
      });

    default:
      return state;
  }
}
