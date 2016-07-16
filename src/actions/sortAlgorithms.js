const MAX = 100;

export const GENERATE_NUMBER_RANGE = 'GENERATE_NUMBER_RANGE';
export function generateNumberRange(max = MAX) {
  return dispatch => {
    dispatch({
      type: GENERATE_NUMBER_RANGE,
      max
    });
    dispatch(checkSorting());
  };
}

export const CHECK_SORTING = 'CHECK_SORTING';
export function checkSorting() {
  return (dispatch, getState) => {
    const {sortAlgorithm: { sortedNumbers }} = getState();
    const isSorted = sortedNumbers.length === MAX+1 && sortedNumbers.every((n, index) => {
      if (index > sortedNumbers.length-2)
        return true;
      else return n <= sortedNumbers[index+1];
    });

    dispatch(listSorted(isSorted));
  };
}

export const VALIDATE_MAX_HEAP = 'VALIDATE_MAX_HEAP';
export function validateMaxHeap(maxHeap) {
  return (dispatch, getState) => {
    const maxHeapValidated = maxHeap.length === MAX+2 && maxHeap.every((parent, index) => {
      let lhLeaf = index*2,
          rhLeaf = index*2+1;

      if (lhLeaf >= maxHeap.length)
        return true;

      if (parent > maxHeap[lhLeaf]) {
        if (rhLeaf < maxHeap.length)
          return parent > maxHeap[rhLeaf]
        return true;
      }
      return false;
    });

    dispatch({
      type: VALIDATE_MAX_HEAP,
      maxHeapValidated
    });
  };
}

export const LIST_SORTED = 'LIST_SORTED';
export function listSorted(isSorted) {
  return {
    type: LIST_SORTED,
    isSorted
  };
}

export const BUBBLE_SORT = 'BUBBLE_SORT';
export function bubbleSort() {
  return dispatch => {
    dispatch({type: BUBBLE_SORT});
    dispatch(checkSorting());
  };
}

export const HEAP_SORT = 'HEAP_SORT';
export function heapSort() {
  return (dispatch, getState) => {
    dispatch({type: HEAP_SORT});
    const {sortAlgorithm: { sortedNumbers }} = getState();

    dispatch(validateMaxHeap(sortedNumbers));
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

export const SELECTION_SORT = 'SELECTION_SORT';
export function selectionSort() {
  return dispatch => {
    dispatch({type: SELECTION_SORT});
    dispatch(checkSorting());
  };
}
