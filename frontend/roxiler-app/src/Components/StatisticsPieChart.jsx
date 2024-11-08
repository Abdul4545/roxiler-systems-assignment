import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const StatisticsPieChart = ({ month }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#EA9243'];

    useEffect(() => {
        const fetchCategoryStatistics = async () => {
            if (!month) {
                setError('Please select a month');
                return;
            }

            setLoading(true);
            setError('');

            try {
                const response = await axios.get('http://localhost:5000/api/category-statistics', {
                    params: { month },
                });
                setData(response.data);
            } catch (err) {
                console.error('Error fetching category statistics:', err);
                setError('An error occurred while fetching category statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryStatistics();
    }, [month]);

    return (
        <div style={styles.container}>
            <h2>Category Statistics for Month {month}</h2>

            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {loading && <p>Loading...</p>}

            {data.length > 0 && !loading && (
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        dataKey="itemCount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            )}
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
};

export default StatisticsPieChart;