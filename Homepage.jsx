import { useNavigate } from "react-router-dom"
import './Homepage.css';
export default function Homepage(){
    const nav=useNavigate()
    const x=localStorage.getItem("username");
    return(
        <>
        <div className="xxxcontainer">
            <div className="xxxnavbar">
        <button onClick={()=>{nav('/create')}}>create employee</button>
        <button  onClick={()=>{nav('/view')}}>view list</button>
        <p>user-{x}</p>
        <button onClick={()=>{nav("/")}}>logout</button>
        </div>
        </div>
        </>
    )
}