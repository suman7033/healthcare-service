import React, { useEffect, useState } from 'react';
import "../component/servicelist.css";

const ServiceList = ({refresh}) => {
  const [services, setServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editService, setEditService] = useState({name: "", select: "", price: ""});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  },[refresh]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://healthcare-services-assignment-default-rtdb.firebaseio.com/healthCare.json');
      const data = await response.json();
      if (data) {
        const servicesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setServices(servicesArray);
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const deleteUrl = `https://healthcare-services-assignment-default-rtdb.firebaseio.com/healthCare/${id}.json`;
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
        alert("Deleted successfully");
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      alert("Error deleting service");
    }
  };

  const handleEdit = (service) => {
    setEditMode(true);
    setEditService(service);
    setEditingId(service.id);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditService(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const updateUrl = `https://healthcare-services-assignment-default-rtdb.firebaseio.com/healthCare/${editingId}.json`;
    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editService),
      });
      if (response.ok) {
        setEditMode(false);
        setEditingId(null);
        fetchData();
        alert("Updated successfully");
      } else {
        alert("Failed to update");
      }
    } catch (error) {
      alert("Error updating service");
    }
  };

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
                  <button onClick={() => handleEdit(service)}>Edit</button> &nbsp;
                  <button onClick={() => deleteHandler(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMode && (
          <div className="edit-form">
            <h3>Edit Service</h3>
            <input
              type="text"
              name="name"
              value={editService.name}
              onChange={handleEditChange}
              placeholder="Service Name"
            /> &nbsp;
            <select
              name="select"
              value={editService.select}
              onChange={handleEditChange}
            >
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Dental care">Dental care</option>
              <option value="X-ray">X-ray</option>
              <option value="Preventive">Preventive</option>
            </select> &nbsp;
            <input
              type="number"
              name="price"
              value={editService.price}
              onChange={handleEditChange}
              placeholder="Price"
            /> &nbsp;
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
