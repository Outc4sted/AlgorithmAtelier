import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons';


const SortButtons = ({ generateNumberRange, bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort }) => (
  <div>
    <div>
      <RaisedButton label="Generate" onClick={() => generateNumberRange()} />
      <RaisedButton label="BubbleSort" onClick={() => bubbleSort()} />
      <RaisedButton label="HeapSort" onClick={() => heapSort()} />
      <RaisedButton label="InsertionSort" onClick={() => insertionSort()} />
      <RaisedButton label="MergeSort" onClick={() => mergeSort()} />
      <RaisedButton label="QuickSort" onClick={() => quickSort()} />
      <RaisedButton label="SelectionSort" onClick={() => selectionSort()} />
    </div>
  </div>
);

SortButtons.propTypes = {
  heapSort: PropTypes.func,
  insertionSort: PropTypes.func,
  mergeSort: PropTypes.func,
  quickSort: PropTypes.func
};


export {SortButtons as default};
