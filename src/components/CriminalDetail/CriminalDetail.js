import React, { useCallback, useEffect, useState } from "react";
import "./CriminalDetail.css"
import {useParams} from "react-router-dom"
import { MdDelete } from "react-icons/md";

const CriminalDetails=()=> {
  const [criminal,setCriminal]=useState("")
  const [newCrime, setNewCrime] = useState("");
  const [message,SetMessage]=useState("")

  const params=useParams()

  const getCriminal=useCallback(async()=>{
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/criminals/${params.id}`)
    if(response.ok){
      setCriminal(await response.json())
    }
  },[params.id])

  const deleteCrime=async(id)=>{
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crimes/${id}`,{
      "method":"DELETE",
      "headers":{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })
        if(response.status===204){
          SetMessage("Crime record deleted successfully.")
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          SetMessage("Some thing went wrong.")
        }
  }

  useEffect(()=>{
    getCriminal();
  },[getCriminal])

  

  const onChangeNewCrime=(e)=>{
    setNewCrime(e.target.value);
  }

  const submitCrime=async(e)=>{
      e.preventDefault();
      
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crimes/${params.id}`,
        {
          "method":"POST",
          "headers":{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          "body":JSON.stringify({crimeDetail:newCrime})
        }
      )
      if(response.status===201){
        SetMessage(await response.text());
        setNewCrime("")
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      }else{
        SetMessage("Some thing went wrong.")
      }
  }

  return (
    <div className="container">
      <div className="profile-card">
        {criminal!==""&&
        <div>
          <h2>Name : {criminal.name}</h2>
          <p>Age : {criminal.age}</p>
          <p>Gender : {criminal.gender}</p>
          <p>Address : {criminal.address}</p>
          <p>No of crimes committed : {criminal.crimes.length}</p>
        </div>}
      </div>
       {message!==""&&<p className="error">{message}</p>}

      <div className="main-section">
        <div className="crime-list">
          <h3>Crimes</h3>
          {criminal!==""&&
          criminal.crimes.map((crime, index) => (
            <div key={index} className="crime-card">
             <p>Crime : {crime.crimeDetail}</p>
             <MdDelete className="del-icon" onClick={()=>{deleteCrime(crime.id)}}/>
            </div>
          ))}
        </div>

        <div className="add-crime">
          <h3>Add Crime</h3>
          <textarea name="description" value={newCrime}  placeholder="Description" onChange={onChangeNewCrime}/>
          <button onClick={submitCrime}>Add Crime</button>
        </div>
      </div>
    </div>
  );
}

export default CriminalDetails