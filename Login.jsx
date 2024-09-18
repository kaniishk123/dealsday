import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom";
export default function Login(){
    const nav=useNavigate();
    const [user,setUser]=useState({
        username:'',
        pwd:'',
    });
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setUser(prevData=>({
            ...prevData,
            [name]:value
        }));
    };
    const checkdeets=async(e)=>{
        e.preventDefault()
    const h=JSON.stringify(user)
    try{
      const t=await fetch('http://localhost:8000/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:h
      })
      if(t.ok){
        localStorage.setItem("username",user.username);
        alert("succecsful login")
        nav("/view");
      }
      else{
        alert('invalid login');
      }}catch(error){
        console.error('not possible')
        alert('data send cheyyadam ey avvaledu');
      }
    }  
    return (
      <>
          <div style={styles.b1}>
              <button style={styles.navButton}>About Us</button>
              <button style={styles.navButton}>Contact Us</button>
          </div>
          <div style={styles.b2}>
              <p>Welcome to the employee management system designed by <b>kaniishk</b>!</p>
              <label style={styles.label}>Username
                  <input type="text" name="username" value={user.username} onChange={handleChange} style={styles.input} />
              </label>
              <br />
              <label style={styles.label}>Password
                  <input type="password" name="pwd" value={user.pwd} onChange={handleChange} style={styles.input} />
              </label>
              <br />
              <button onClick={checkdeets} style={styles.button}>Login</button>
          </div>
      </>
  );
}

const styles = {
  b1: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 20px",
      backgroundColor: "#f1f1f1",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: "0",
      width: "100%",
  },
  b2: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "100px auto 20px auto", // Added margin-top to avoid overlap with the navbar
      textAlign: "center",
      display: "flex",
      flexDirection:"column",
      alignItems: "center",
      justifyContent: "center",
      marginLeft:"500px",
  },
  label: {
      display: "block",
      color: "#333",
      marginBottom: "10px",
      fontWeight: "bold",
  },
  input: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
  },
  button: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      margin: "5px",
  },
  navButton: {
      backgroundColor: "transparent",
      color: "#007bff",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      marginLeft: "10px",
  },
};