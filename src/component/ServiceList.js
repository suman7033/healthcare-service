import React, { useEffect, useState } from 'react';
import "../component/servicelist.css";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://healthcare-services-assignment-default-rtdb.firebaseio.com/healthCare.json'); // Replace with your API endpoint
        const data = await response.json();
        console.log(data);
        if (data) {
          const servicesArray = Object.keys(data).map(key => data[key]);
          setServices(servicesArray);
        } else {
          console.log("No data found.");
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  },[]); 

  return (
    <div className='maindiv'>
      <div className="container">
        <div className="text">HealthCare Service</div>
      </div>

      <div className='div1'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.name}</td>
                <td>{service.select}</td>
                <td>{service.price}</td>
                <td>
                  <button>Edit</button> &nbsp;
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceList;
