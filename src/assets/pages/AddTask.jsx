import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  Axios  from 'axios';
import { toast,ToastContainer } from 'react-toastify';


function AddTask() {

    let [task,settask] = useState([])
    

    const getInput = (e)=>{
        settask({...task,[e.target.name]:e.target.value,status:0})
    }

    const submitData = async(e)=>{
        e.preventDefault();
        console.log(task);
        let insertTask = await Axios.post("http://localhost:3000/task",task).then((response)=>{
            console.log(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        settask  ({});
        toast.success("task add suceessfulyy!!!")

    }

  return (
    <div>
        <h2 style={{textAlign:'center'}}>ADD TASK</h2>
       
    <Form className='w-25 mx-auto' onSubmit={(e)=>submitData(e)}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Enter username</Form.Label>
      <Form.Control type="text" name='name' required value={task.name ? task.name : ""} placeholder="Enter username" onChange={(e)=>getInput(e)}/>      
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter date</Form.Label>
        <Form.Control type="date" name='date' required value={task.date ? task.date : ""} placeholder="Enter date" onChange={(e)=>getInput(e)}/>      
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" required name='description' value={task.description ? task.description : ""} rows={3} onChange={(e)=>getInput(e)} />
      </Form.Group>
    <Form.Select aria-label="Default select example" required name="color" value={task.color ? task.color : ""} className='mb-3' onChange={(e)=>getInput(e)}>
      <option>Select Your Task</option>
      <option value="Red"    >Office</option>
      <option value="Yellow"  >Personal</option>
      <option value="Green"  >Family</option>
      <option value="cyan"  >Freinds</option>
      <option value="gray"  >other</option>
    </Form.Select>
    <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer />
    </div>
  )
}

export default AddTask