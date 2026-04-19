import React, { useContext } from 'react'
import {useState, useEffect } from 'react'
import "./Criminal.css"
import { GrFormView } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom"
import AppContext from '../../Context/AppContext';



const Criminals = () => {

  const [criminals,setCriminals]=useState([])
  const [message,setMessage]=useState("")
  const {searchBy}=useContext(AppContext)

  const getCriminals=async()=>{
    const fetchedData= await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/criminals`,{"method":"GET",
      "headers":{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })
    setCriminals(await fetchedData.json())
  }

  console.log(`${process.env.REACT_APP_BACKEND_URL}/api/criminals`)

  useEffect(()=>{
    getCriminals();
  },[])

  const filteredCriminals=criminals.filter(c=>
    c.name.toLowerCase().includes(searchBy.toLowerCase())
  )
  

  //funcrion to delete a criminal
  const deleteCriminal=async(id)=>{
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/criminals/${id}`,{
        "method":"DELETE",
        "headers":{
          "Content-Type":"application/json",
          "Accept":"application/json"
          }
      })

      if(response.status===204){
        setMessage("Criminal record deleted successfully.")
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }else{
        setMessage("Some thing went wrong.")
      }
  }

  
  return (
    <div className="page">
      <div className="layout">
        {/* Main Content */}
        <main className="content">
          <h2>Criminal Records</h2>
          <table className="criminal-table">
            <thead>
              <tr>
                <th>S. No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
              filteredCriminals.length===0?
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                  No criminal records available
                </td>
                </tr>
              :filteredCriminals.map((c,index) => (
                <tr key={c.id}>
                  <td>{index+1}</td>
                  <td>{c.name}</td>
                  <td>{c.age}</td>
                  <td>{c.gender}</td>
                  <td className='action-group'>
                    <Link to={`/view/criminal/${c.id}`}><GrFormView /> </Link>
                    <Link to={`/update/criminal/${c.id}`}><FaPencilAlt /></Link>
                    <MdDelete onClick={()=>{deleteCriminal(c.id)}}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {message!==""&&<p className='error'>{message}</p>}
        </main>
      </div>
    </div>
  )
}

export default Criminals



