import { useEffect, useState } from "react"
import './View.css';
import { useNavigate } from "react-router-dom";

export default function View(){
    const[empdata,setEmpdata]=useState([]);
    const nav=useNavigate();
    const fetchemployees=async()=>{
        try{
        const k=await fetch('http://localhost:8000/view-employees',{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(k){
            const h=await k.json();
            setEmpdata(h);
        }

    }catch(error){
        console.error("error ");
    }}
    const deleteemp=async(id)=>{
        if(window.confirm("are you sure you want to delete?")){
            try{
              const response=await fetch(`http://localhost:8000/delete-employee/${id}`,{
                method:"DELETE",
                headers:{
                   'Content-Type':'application/json'
                }
              });
              if(response.ok){
                alert("succesfully deleted the employee from database");
                fetchemployees();
              }

            }catch(error){
              console.error("could not delete in front-end")
            }
        }
    }
    const updateemp=()=>{
       nav("/update");
    }

    useEffect(()=>{
        fetchemployees();
    },[]);
    return (
        <div className="container1">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Designation</th>
              <th>gender</th>
              <th>Course</th>
              <th>Joining Date</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {empdata.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.designation}</td>
                <td>{item.gender}</td>
                <td>{item.course}</td>
                <td>{item.createdate}</td>
                <td>
                    <button id="ed" onClick={()=>updateemp()}>edit</button>
                    <button id="del" onClick={()=>deleteemp(item.id)}>delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      );
      
}
