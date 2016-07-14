import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberSets from '../components/NumberSets';
import SortButtons from '../components/SortButtons';
import * as SortActions from '../actions/sortAlgorithms';
import { Row, Col } from 'react-flexbox-grid/lib/index';


function mapStateToProps({ sortAlgorithm }) {
  return {
    sortAlgorithm,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SortActions, dispatch);
}

class AlgorithmAtelier extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sortAlgorithm, generateNumberRange, bubbleSort, heapSort, insertionSort, mergeSort, quickSort } = this.props;

    return (
      <Row>
        <Col xs>
          <SortButtons generateNumberRange={generateNumberRange} bubbleSort={bubbleSort} heapSort={heapSort} insertionSort={insertionSort} mergeSort={mergeSort} quickSort={quickSort} />
          <NumberSets sortAlgorithm={sortAlgorithm} />
        </Col>
      </Row>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmAtelier);
