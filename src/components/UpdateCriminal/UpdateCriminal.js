import  { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCriminal.css";

const UpdateCriminal = () => {
  const { id } = useParams();
  const navigate=useNavigate();

  const [criminal, setCriminal] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
  });

  const [message,setMessage]=useState("")

  const [isDisabled,setIsDisabled]=useState(true)

  const getCriminal=useCallback(async()=>{
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/criminals/${id}`)
    if(response.ok){
      setCriminal(await response.json())
    }else{
      setCriminal("Some thing went wrong.")
    }
  },[id])

    
  

  useEffect(() => {
    getCriminal();
  },[getCriminal]);

  const handleChange=(e)=>{
    setCriminal(prevCriminal=>{
        return {
            ...prevCriminal,
            [e.target.name]:e.target.value
        }
    })
    setIsDisabled(false)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/criminals/${id}`,{
        "method":"PUT",
        "headers":{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        "body":JSON.stringify({
            name:criminal.name,
            age:criminal.age,
            gender:criminal.gender,
            address:criminal.address
        })
    })
    let data=await response.text();
    if(response.ok){
        setIsDisabled(true)
        setMessage(data)
        setTimeout(() => {
            navigate("/criminals")
        }, 200);
        
    }else{
    setMessage(data)
    }
  }

  return (
    <div className="update-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update criminal</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={criminal.name}
          onChange={handleChange}
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={criminal.age}
          onChange={handleChange}
        />

        <label>Gender</label>
        <select
          name="gender"
          value={criminal.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Address</label>
        <textarea
          name="address"
          value={criminal.address}
          onChange={handleChange}
        />
        {message!==""&&<p className="error">{message}</p>}
        <button type="submit" disabled={isDisabled}>Update criminal</button>
      </form>
    </div>
  );
};

export default UpdateCriminal;