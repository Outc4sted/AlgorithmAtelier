import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import NavBar from './NavBar';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';


const muiTheme = getMuiTheme();

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const style = {
      width: 800
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Grid>
          <Row center="xs">
            <Col>

              <Paper style={style} zDepth={1}>
                <NavBar />
                {this.props.children}
              </Paper>

            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
