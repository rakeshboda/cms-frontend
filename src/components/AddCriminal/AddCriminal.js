import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./AddCriminal.css";

const  AddCriminal=()=>{
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    address:"",
    crimes:[]
  });
  const [crime,setCrime]=useState("")

  const [errMsg,setErrMsg]=useState("")

  const navigate=useNavigate()

  const onChangeFullName=(e)=>{
    setForm(prevForm=>{
      return {
        ...prevForm,
        name:e.target.value
      }
    })
  }

  const onChangeAge=(e)=>{
    setForm(prevForm=>{
      return {
        ...prevForm,
        age:e.target.value
      }
    })
  }

    const onChangeGender=(e)=>{
    setForm(prevForm=>{
      return {
        ...prevForm,
        gender:e.target.value
      }
    })
  }

  const onChangeAddress=(e)=>{
    setForm(prevForm=>{
      return {
        ...prevForm,
        address:e.target.value
      }
    })
  }

  const onChangeCrime=(e)=>{
   setCrime(e.target.value)
   setForm(prevForm=>{
      return {
        ...prevForm,
        crimes:[{crimeDetail:e.target.value}]
      }
    })
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/criminals/`,
      {"method":"POST",
        "headers":{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        "body":JSON.stringify(form)
    })
    if(response.status===201){
      setErrMsg(await response.text());
      
      setForm({
        name: "",
        age: "",
        gender: "",
        address:"",
        crimes:[]
      })
      setCrime("")
      setTimeout(() => {
        navigate("/")
      }, 200);
    }else{
      setErrMsg("Some thing went wrong.")
    }
  };


  return (
    <div className="add-container">
      <div className="add-card">
        <h2>Add Criminal Record</h2>
        <p className="subtitle">Enter the details carefully</p>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={onChangeFullName}
                value={form.name}
              />
            </div>
            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                onChange={onChangeAge}
                value={form.age}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={onChangeGender}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                name="location"
                placeholder="Last known location"
                onChange={onChangeAddress}
                value={form.address}
              />
            </div>
          </div>

          <div className="input-group full">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Crime description..."
              onChange={onChangeCrime}
              value={crime}
            />
          </div>

          <button className="submit-btn">Add Record</button>
          {errMsg!==""&&<p className="error">{errMsg}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddCriminal