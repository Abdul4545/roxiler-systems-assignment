import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullDataTable from './FullDataTable';
import Statistics from './Statistics';

const Dashboard = () => {
    const [fulldata, setFullData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10); // records per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fulldata', {
                    params: {
                        page: currentPage,
                        perPage: perPage,
                    },
                });

                // Log API response to verify data
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

    return (
        <div>
            <h1>Dashboard</h1>
            <FullDataTable data={fulldata} />
            <div>
                <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>

            <div>
                <Statistics />
            </div>
        </div>
    );
};

export default Dashboard;
