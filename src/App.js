import React, { useReducer, useRef, useState } from 'react'
import ServiceList from "./component/ServiceList";
import "./App.css";

const App = () => {

    const [ShowData, setShowData]=useState([]);
    const nameRef=useRef();
    const selectRef=useRef();
    const priceRef=useRef();


  const AddHandler=async (e)=>{
    const FormData={
        name:nameRef.current.value,
        select:selectRef.current.value,
        price: priceRef.current.value
    }
    setShowData(FormData);
    e.preventDefault();
    try{
      const url="https://healthcare-services-assignment-default-rtdb.firebaseio.com/healthCare.json"

      const response=await fetch(url,{
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      if(response.ok){
         alert("Add sucessfully");
      }else{
        alert("Failed to submit Form");
      }
    }catch(error){
        alert("Error Submitting form");
    }
}
  return (
    <div>
       <ServiceList/><br/>
       <hr/>

       <div className='form-div'>
        <div>
          <img className="form-img"src='https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg'/>
        </div>
    <div className='form'>
      <lable className="lable">Name: </lable>
      <input type="text" ref={nameRef} required placeholder='Name..'/>
      <label className='lable'>Description</label>
      <select ref={selectRef} required className='select'>
        <option value="Physiotherapy">Physiotherapy</option>
        <option value="Dental care">Dental care</option>
        <option value="X-ray">X-ray</option>
        <option value="Preventive">Preventive</option>
      </select>

      <label className='lable'>Price $</label>
      <input type="Number" required ref={priceRef} placeholder='Price..'/><br/>
      <button onClick={AddHandler}>Submit</button>
    </div>
    </div>
    </div>
  )
}

export default App;
