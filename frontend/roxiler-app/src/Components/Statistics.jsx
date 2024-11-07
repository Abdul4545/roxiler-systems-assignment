import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

const Statistics = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const fetchStatistics = async () => {
        if (!year || !month) {
            setError('Please select both year and month');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get('http://localhost:5000/api/statistics', {
                params: {
                    year: year,
                    month: month,
                },
            });

            setStatistics(response.data);
        } catch (err) {
            console.error('Error fetching statistics:', err);
            setError('An error occurred while fetching statistics');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (year && month) {
            fetchStatistics();
        }
    }, [year, month]);

    return (
        <div className="statistics-container">
            <h1>Transaction Statistics</h1>

            {/* Year and Month Selection */}
            <div className="filter-container">
                <label htmlFor="year">Year:</label>
                <select id="year" value={year} onChange={handleYearChange}>
                    <option value="">Select Year</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>

                <label htmlFor="month">Month:</label>
                <select id="month" value={month} onChange={handleMonthChange}>
                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>

            </div>

            {/* Display Error */}
            {error && <div className="error-message">{error}</div>}

            {/* Display Statistics */}
            {loading ? (
                <p>Loading...</p>
            ) : statistics ? (
                <div>
                    <div className="statistics-summary">
                        <p><strong>Total Sale Amount:</strong> ${statistics.totalSaleAmount}</p>
                        <p><strong>Total Sold Items:</strong> {statistics.totalSoldItems}</p>
                        <p><strong>Total Not Sold Items:</strong> {statistics.totalNotSoldItems}</p>
                    </div>

                    <h3>Transactions Table</h3>
                    <table className="statistics-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Sold</th>
                                <th>Date of Sale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistics.transactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>{transaction.title}</td>
                                    <td>${transaction.price}</td>
                                    <td>{transaction.sold ? 'Sold' : 'Not Sold'}</td>
                                    <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
};

export default Statistics;
