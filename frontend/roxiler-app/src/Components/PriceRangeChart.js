import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriceRangeChart = ({ month }) => {
    const [priceRangeData, setPriceRangeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPriceRangeStatistics = async () => {
        if (!month) {
            setError('Please select a month');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get('http://localhost:5000/api/price-range', {
                params: { month: month },
            });
            setPriceRangeData(response.data);
        } catch (err) {
            console.error('Error fetching price range statistics:', err);
            setError('An error occurred while fetching statistics');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (month) {
            fetchPriceRangeStatistics();
        }
    }, [month]);

    const chartData = {
        labels: priceRangeData.map((range) => range.range),
        datasets: [
            {
                label: 'Transaction Count',
                data: priceRangeData.map((range) => range.count),
                backgroundColor: 'grey', 
                borderColor: 'dark-grey',       
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Transaction Count by Price Range',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div>
            <h1>Price Range Statistics</h1>

            {/* Display Error */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Display Loading */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                    <h2>Results for Selected Month</h2>
                    {priceRangeData.length > 0 ? (
                        <Bar data={chartData} options={chartOptions} />
                    ) : (
                        <p>No data available for the selected month.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PriceRangeChart;

