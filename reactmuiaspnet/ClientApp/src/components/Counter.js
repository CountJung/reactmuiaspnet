import React, { Component } from 'react';
import { Box, Container, Grid, Pagination, Button, Link, Stack } from '@mui/material';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
        <div>
            <Box Component="main" sx={{ backgroundColor: 'primary.light', flexGrow: 1, display: 'flex', justifyContent: 'flex-end', my: 10, mx: 2 }}>
                <Container maxWidth="false"> {/*sm*/}
                    {/*<Box sx={{ pt: 2, px: 2, py: 2 }}>  */}{/*display: 'flex', justifyContent:'center',*/}
                       
                    {/*</Box>*/}

                    <h1>ML.NET Test</h1>
                    <h2>ML.NET Test Page - Training, Predict</h2>
                    <h3 aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></h3>
                    <Button sx={{ mx: 2, my: 2 }} variant="contained" className="btn btn-primary" onClick={this.incrementCounter}>Increment</Button>

                </Container>
            </Box>
      </div>
    );
  }
}
