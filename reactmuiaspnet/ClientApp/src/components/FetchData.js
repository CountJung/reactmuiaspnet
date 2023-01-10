import React, { useState, useEffect, Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, makeStyles, Stack, TextField, Box } from '@mui/material';
import { FormControl, FormHelperText, Input, InputLabel, OutlinedInput } from '@mui/material';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = { forecasts: [], loading: true, temperatureC: 23, summary: '매우큰삽질' };
      this.populateWeatherData = this.populateWeatherData.bind(this); //리액트 특성 setState시 바인딩 필요
      this.addForeCastData = this.addForeCastData.bind(this);
      this.setTemperatureC = this.setTemperatureC.bind(this);
      this.setSummaryText = this.setSummaryText.bind(this);
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
        <TableContainer component={Paper}>
            <Table aria-labelledby="tabelLabel">
                <TableHead style={{ backgroundColor: 'darkgreen' }}>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Temp. (C)</TableCell>
                        <TableCell>Temp. (F)</TableCell>
                        <TableCell>Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {forecasts.map(forecast =>
                        <TableRow key={forecast.date}>
                            <TableCell >{forecast.date}</TableCell >
                            <TableCell align="left">{forecast.temperatureC}</TableCell >
                            <TableCell align="left">{forecast.temperatureF}</TableCell >
                            <TableCell align="left">{forecast.summary}</TableCell >
                        </TableRow >
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        try {
            this.setState({ forecasts: data, loading: false });
        }
        catch (e) {
            console.log(e);
        }
    }

    async addForeCastData() {
        // 자바스크립트 이름 문제로 다음을 생각해 볼 필요 있음
        var temperatureC = this.state.temperatureC;
        var summary = this.state.summary;
        var weatherString = { temperatureC, summary,};
        var weatherDataStr = JSON.stringify(weatherString);
        weatherDataStr = weatherDataStr.replace(/"([^"]+)":/g, '$1:');
        weatherDataStr = "\"" + weatherDataStr.replace(/"/g, '\'') + "\"";

        try {
            const response = await fetch('weatherforecast/data', {
                method: 'POST',
                headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json', },
                body: weatherDataStr
            }).then(resp => resp.json()
            ).then(res => {
                if (res) {
                    console.log(res);

                    this.setState({ forecasts: res });
                    FetchData.renderForecastsTable(this.state.forecasts);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    resetForeCastsData() {
        this.state = { forecast: [] }
        this.populateWeatherData();
    }

    setTemperatureC(s) {
        console.log(s);
        this.setState({ temperatureC: s.target.value });
    }

    setSummaryText(s) {
        console.log(s)
        this.setState({ summary: s.target.value });
    }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <h2 style={{ color: 'red' }}> Warning : This is Random Data!! </h2>
            <p>This component demonstrates fetching data from the server.</p>
            <Box
                component="form" noValidate autoComplete="off"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
            >
                <TextField label="TemperatureC" color="secondary" focused defaultValue={this.props.temperatureC} onChange={this.setTemperatureC} />
                <TextField label="Summary" variant="standard" color="success" focused defaultValue={this.props.summary} onChange={this.setSummaryText} />
            </Box>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={this.populateWeatherData}> Initialize </Button>
                <Button variant="contained" color="primary" onClick={this.addForeCastData}>
                    ADD 1 Sample Data
                </Button>
                <Button variant="contained" color="secondary" onClick={this.resetForeCastsData}>
                    Reset Data
                </Button>
            </Stack>
        {contents}
      </div>
    );
  }
}

//function replacer(key, value) {
//    if (typeof value === "string") {
//        return undefined;
//    }
//    return value;
//}

//const useStyles = makeStyles((theme) => ({
//    root: {
//        '& > *': {
//            margin: theme.spacing(1),
//        },
//    },
//}));

//export function FetchData() {
//    const [loading, setLoading] = useState(true);
//    const [forecasts, setForecasts] = useState([]);
//    const classes = useStyles();

//    const initWeatherDatas = async () => {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();

//        setForecasts(data);
//        setLoading(false);
//    };

//    useEffect(() => { initWeatherDatas() }, {});

//    const resetForeCastsData = () => {
//        setForecasts([]);
//        renderForecastsTable(forecasts);
//    }

//    var weatherString = { TemperatureC: 23, Summary: '매우큰삽질', };

//    const addForeCastData = async () => {
//        var weatherDataStr = JSON.stringify(weatherString);
//        weatherDataStr = weatherDataStr.replace(/"([^"]+)":/g, '$1:');
//        weatherDataStr = "\"" + weatherDataStr.replace(/"/g, '\'') + "\"";

//        try {
//            const response = await fetch('weatherforecast/data', {
//                method: 'POST',
//                headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json', },
//                body: weatherDataStr
//            }).then(resp => resp.json()
//            ).then(res => {
//                if (res) {
//                    console.log(res);

//                    setForecasts(res);
//                    renderForecastsTable(forecasts);
//                }
//            });
//        }
//        catch (err) {
//            console.log(err);
//        }
//    }

//    const renderForecastsTable = (forecastsData) => {
//        return (
//            <TableContainer component={Paper}>
//                <Table aria-labelledby="tabelLabel">
//                    <TableHead style={{ backgroundColor: 'darkgreen' }}>
//                        <TableRow>
//                            <TableCell>Date</TableCell>
//                            <TableCell>Temp. (C)</TableCell>
//                            <TableCell>Temp. (F)</TableCell>
//                            <TableCell>Summary</TableCell>
//                        </TableRow>
//                    </TableHead>
//                    <TableBody>
//                        {forecastsData.map(forecast =>
//                            <TableRow key={forecast.date}>
//                                <TableCell >{forecast.date}</TableCell >
//                                <TableCell align="left">{forecast.temperatureC}</TableCell >
//                                <TableCell align="left">{forecast.temperatureF}</TableCell >
//                                <TableCell align="left">{forecast.summary}</TableCell >
//                            </TableRow >
//                        )}
//                    </TableBody>
//                </Table>
//            </TableContainer>
//        );
//    }

//    const contents = loading ? <p><em>Loading...</em></p> : renderForecastsTable(forecasts);

//    return (
//        <div>
//            <h1 id="tabelLabel" >Weather forecast</h1>
//            <h2 style={{ color: 'red' }}> Warning : This is Random Data!! </h2>
//            <p>This component demonstrates fetching data from the server.</p>
//            <div className={classes.root}>
//                <Button variant="contained" onClick={initWeatherDatas}> Initialize </Button>
//                <Button variant="contained" color="primary" onClick={addForeCastData}>
//                    ADD 1 Sample Data
//                </Button>
//                <Button variant="contained" color="secondary" onClick={resetForeCastsData}>
//                    Reset Data
//                </Button>
//                <Button variant="contained" disabled>
//                    Reserved
//                </Button>
//                <Button variant="contained" color="primary" href="https://localhost:7087/swagger/">
//                    Swagger
//                </Button>
//            </div>
//            {contents}
//        </div>
//    );
//}
