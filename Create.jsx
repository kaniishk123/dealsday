import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Create(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[1-9]\d{9}$/;
    const nav=useNavigate()
const[emp,setEmp]=useState({
            full_name :"",
            email:"",
            mobile:"",
            designation:"",
            gender:"",
            course:"",
            im:"",
        });
        const peddacode = (event) => {
            const { name, type, value, checked} = event.target;
                setEmp(prevState => ({
                    ...prevState,
                    [name]: type === 'checkbox' ? (checked ? value : '') : value
                }));
            }
            const empdeets=async(e)=>{
                e.preventDefault()
            if(!emp.full_name || !emp.course||!emp.designation||!emp.email||!emp.mobile||!emp.gender||!emp.im){
                alert("please fill all the fields")

            }else{
            if(emailRegex.test(emp.email) && numberRegex.test(emp.mobile)){
            const h=JSON.stringify(emp)
            try{
              const t=await fetch('http://localhost:8000/create-employee',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:h
              })
              if(t.status==201){
                alert("details saved")
                nav("/view");
                setEmp({
                    full_name :"",
            email:"",
            mobile:"",
            designation:"",
            gender:"",
            course:"",
            im:"",

                })
              }

              else if (t.status==208){
                alert("Email already exists in our database");
              }}catch(error){
                console.error('not possible')
                alert('data send cheyyadam ey avvaledu');
              }
            }
            else if (!emailRegex.test(emp.email)){
                alert("please enter a valid email");
            }
            else if(!numberRegex.test(emp.mobile)){
                alert("please enter the mobile number with 10 digits");
            }
                
        
            }
        }
        
            return (
                <div style={styles.a1}>
                    <label style={styles.label}>Name
                        <input type="text" name="full_name" value={emp.full_name} onChange={peddacode} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>Email
                        <input type="text" name="email" value={emp.email} onChange={peddacode} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>Mobile Number
                        <input type="text" name="mobile" value={emp.mobile} onChange={peddacode} style={styles.input} />
                    </label>
                    <br />
                    <label style={styles.label}>Designation
                        <select name="designation" value={emp.designation} onChange={peddacode} style={styles.select}>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="sales">Sales</option>
                        </select>
                    </label>
                    <br />
                    <label style={styles.radioLabel}>
                        <input type="radio" name="gender" value="female" checked={emp.gender === "female"} onChange={peddacode} /> Female
                    </label>
                    <label style={styles.radioLabel}>
                        <input type="radio" name="gender" value="male" checked={emp.gender === "male"} onChange={peddacode} /> Male
                    </label>
                    <br />
                    <div style={styles.a2}>
                        <label style={styles.label}>Course</label>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" name="course" value="MCA" checked={emp.course === "MCA"} onChange={peddacode} /> MCA
                        </label>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" name="course" value="BCA" checked={emp.course === "BCA"} onChange={peddacode} /> BCA
                        </label>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" name="course" value="BSC" checked={emp.course === "BSC"} onChange={peddacode} /> BSC
                        </label>
                    </div>
                    <br />
                    <label style={styles.label}>Image URL
                        <input type="file" name="im" value={emp.im} onChange={peddacode} style={styles.input} />
                    </label>
                    <br />
                    <button onClick={empdeets} style={styles.button}>Submit</button>
                </div>
            );
        }
        
        const styles = {
            a1: {
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100vw",
                margin: "20px auto",
                marginTop:"40px",
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
            select: {
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
            },
            radioLabel: {
                marginRight: "15px",
                color: "#333",
                fontWeight: "bold",
            },
            checkboxLabel: {
                display: "block",
                marginBottom: "5px",
                color: "#333",
                fontWeight: "bold",
            },
            button: {
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
            },
            a2: {
                marginBottom: "15px",
            }
        };