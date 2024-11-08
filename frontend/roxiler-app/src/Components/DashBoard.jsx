import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullDataTable from './FullDataTable';
import Statistics from './Statistics';
import PriceRangeChart from './PriceRangeChart';
import StatisticsPieChart from './StatisticsPieChart';

const Dashboard = () => {
    const [fulldata, setFullData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10);
    
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fulldata', {
                    params: {
                        page: currentPage,
                        perPage: perPage,
                    },
                });
                console.log('API Response:', response.data);
                setFullData(response.data.transactions);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [currentPage, perPage]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleYearChange = (e) => setSelectedYear(e.target.value);
    const handleMonthChange = (e) => setSelectedMonth(e.target.value);

    return (
        <div>
            <h1>Dashboard</h1>

            <div style={{ margin: '20px 0' }}>
                <label>
                    Select Year : 
                    <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">Year</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </label>
                <span style={{ padding: '20px' }}></span>
                <label>
                    Select Month :  
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        <option value="">Month</option>
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
                </label>
            </div>

            <FullDataTable data={fulldata} />
            <div>
                <span>Page no: {currentPage}</span>
                <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <span>-</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                <span>Per Page : {perPage}</span>
            </div>

            <div>
                <Statistics year={selectedYear} month={selectedMonth} />
            </div>

            <div>
                <PriceRangeChart month={selectedMonth} />
            </div>

            <div>
                <StatisticsPieChart month={selectedMonth} />
            </div>
        </div>
    );
};

export default Dashboard;