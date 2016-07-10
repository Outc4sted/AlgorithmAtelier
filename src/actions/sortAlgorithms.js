const MAX = 100;

export const GENERATE_NUMBER_RANGE = 'GENERATE_NUMBER_RANGE';
export function generateNumberRange(max = MAX) {
  return {
    type: GENERATE_NUMBER_RANGE,
    max
  };
}

export const CHECK_SORTING = 'CHECK_SORTING';
export function checkSorting() {
  return (dispatch, getState) => {
    const {sortAlgorithm: { jumbledNumbers, sortedNumbers }} = getState();
    const isSorted = sortedNumbers.length === jumbledNumbers.length && sortedNumbers.every((n, index) => {
      if (index > sortedNumbers.length-2)
        return true;
      else return n <= sortedNumbers[index+1];
    });

    dispatch(listSorted(isSorted));
  };
}

export const LIST_SORTED = 'LIST_SORTED';
export function listSorted(isSorted) {
  return {
    type: LIST_SORTED,
    isSorted
  };
}

export const HEAP_SORT = 'HEAP_SORT';
export function heapSort() {
  return dispatch => {
    dispatch({type: HEAP_SORT});
    dispatch(checkSorting());
  };
}

export const INSERTION_SORT = 'INSERTION_SORT';
export function insertionSort() {
  return dispatch => {
    dispatch({type: INSERTION_SORT});
    dispatch(checkSorting());
  };
}

export const MERGE_SORT = 'MERGE_SORT';
export function mergeSort() {
  return dispatch => {
    dispatch({type: MERGE_SORT});
    dispatch(checkSorting());
  };
}

export const QUICK_SORT = 'QUICK_SORT';
export function quickSort() {
  return dispatch => {
    dispatch({type: QUICK_SORT});
    dispatch(checkSorting());
  };
}
