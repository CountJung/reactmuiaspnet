import { Box, Container, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';
import faker from 'faker';
import { Budget } from './budget';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 25)',
            borderWidth: 2,
            fill: true,
            pointRadius: 0,
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'white',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(53, 162, 235)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        },
    ],
};

export const option =
{
    plugins: {  // 'legend' now within object 'plugins {}'
        legend: {
            labels: {
                color: "#3f50b5",  // not 'fontColor:' anymore
                // fontSize: 18  // not 'fontSize:' anymore
                font: {
                    size: 18 // 'size' now within object 'font {}'
                }
            }
        }
    },
    scales: {
        y: {  // not 'yAxes: [{' anymore (not an array anymore)
            ticks: {
                color: "#757ce8", // not 'fontColor:' anymore
                // fontSize: 18,
                font: {
                    size: 18, // 'size' now within object 'font {}'
                },
                stepSize: 1,
                beginAtZero: true
            }
        },
        x: {  // not 'xAxes: [{' anymore (not an array anymore)
            ticks: {
                color: "#ff7961",  // not 'fontColor:' anymore
                //fontSize: 14,
                font: {
                    size: 14 // 'size' now within object 'font {}'
                },
                stepSize: 1,
                beginAtZero: true
            }
        }
    }
};

export const pieOption =
{
    plugins: {  // 'legend' now within object 'plugins {}'
        legend: {
            labels: {
                color: "#3f50b5",  // not 'fontColor:' anymore
                // fontSize: 18  // not 'fontSize:' anymore
                font: {
                    size: 18 // 'size' now within object 'font {}'
                }
            }
        }
    }
};

export const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function ChartJSTestPage() {
    return (
        <>
            <Grid container spacing={5} direction="column">
                <Grid item lg={'auto'} sm={'auto'} xl={'auto'} xs={'auto'}>
                    <Chart type='bar' data={data} options={option} />
                </Grid>
                <Grid item lg={'auto'} sm={'auto'} xl={'auto'} xs={'auto'}>
                    <Pie data={pieData} options={pieOption} />
                </Grid>
            </Grid>
        </>
    );
}
