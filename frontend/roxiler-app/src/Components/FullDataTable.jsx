import React from 'react';
import '../App.css'; 

const FullDataTable = ({ data }) => {
    console.log(data);
    
  return (
    <div className="table-container">
      <h2>Full Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>{item.sold ? 'Sold' : 'Not Sold'}</td>
              <td>
                <img src={item.image} alt={item.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FullDataTable;
