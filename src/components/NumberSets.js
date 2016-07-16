import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid/lib';


const styles = {
  textOflow: {
    overflowWrap: 'break-word'
  }
};

const NumberSets = ({sortAlgorithm: { jumbledNumbers, sortedNumbers, isSorted, isMaxHeap, sortType }}) => (
  <Row around="xs" middle="xs">
    <Col xs={12}>
      <Paper>
        <h2>Unsorted Set</h2>
        <div style={styles.textOflow}>{jumbledNumbers.toString()}</div>
      </Paper>
    </Col>

    <Col xs={12}>
      <Paper>
        <h2>Sorted Set</h2>
        <h5>{sortType}</h5>
        {sortType == 'Heap Sort' &&
          <p>Max Heap?: <strong>{isMaxHeap.toString()}</strong></p>
        }
        <p>Sorted?: <strong>{isSorted.toString()}</strong></p>
        <div style={styles.textOflow}>{sortedNumbers.toString()}</div>
      </Paper>
    </Col>
  </Row>
);


NumberSets.propTypes = {
  jumbledNumbers: PropTypes.arrayOf(PropTypes.number),
  sortedNumbers: PropTypes.arrayOf(PropTypes.number)
};


export {NumberSets as default};
