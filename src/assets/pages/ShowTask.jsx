import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Axios from 'axios';

function ShowTask() {
  const [task, setTask] = useState([]);
  const [hoveredDeleteId, setHoveredDeleteId] = useState(null); 
  const [currentPage,setCurrentPage] = useState(1);
  const [perPage,setPerPage]=useState(2);
  const [totalPages,setTotalPages] = useState(0)

  useEffect(() => {
    getTask(1);
  }, []);

//   
const getTask = async (pageno) => {
    let alldata
    let alltask = await Axios.get('http://localhost:3000/task')
        .then((response) => {
            alldata=response.data
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(alldata.length)
    let totalTask =Math.ceil(alldata.length / perPage);
    setTotalPages(totalTask);
    
    let lastindex = pageno * perPage
    let firstindex = lastindex - perPage
    let currenttask = alldata.slice(firstindex,lastindex)
    setTask(currenttask)
}
// 
const Prev = ()=>{
    if(currentPage > 1)
    {
        setCurrentPage(currentPage-1);
        getTask(currentPage-1);
    }
}

const Next = ()=>{
    if(currentPage < totalPages)
    {
        setCurrentPage(currentPage+1);
        getTask(currentPage+1);
    }
}

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
    });
    getTask(1);
  };

  const onComplete = async (e, id) => {
    const status = e.target.checked ? 1 : 0;
    try {
      await Axios.patch(`http://localhost:3000/task/${id}`, { status });
      getTask(1);
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    textAlign: 'center',
  };

  const cardStyle = (status, color) => ({
    position: 'relative',
    padding: '1rem',
    margin: '1rem',
    width: '300px',
    backgroundColor: status ? 'white' : color,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
  });

  const checkboxStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    transform: 'scale(1.5)',
    cursor: 'pointer',
    accentColor: '#28a745', 
  };
  const deleteBtnStyle = (isHovered) => ({
    backgroundColor: isHovered ? '#dc3545' : '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  });

  return (
    <Container>
      <h1 style={containerStyle}>Show Task</h1><br />
      <Row className="justify-content-md-center">
        {task.map((v, i) => (
          <Col key={i} md="auto">
            <Card style={cardStyle(v.status, v.color)}>
              <Card.Body>
                <Form.Check
                  type="checkbox"
                  style={checkboxStyle}
                  checked={!!v.status}
                  onChange={(e) => onComplete(e, v.id)}
                />
                <Card.Title>{v.name}</Card.Title>
                <Card.Text><b>Date:</b> {v.date}</Card.Text>
                <Card.Text><b>Desc:</b> {v.description}</Card.Text>
                <button
                  style={deleteBtnStyle(hoveredDeleteId === v.id)}
                  onClick={() => deleteTask(v.id)}
                  onMouseEnter={() => setHoveredDeleteId(v.id)}
                  onMouseLeave={() => setHoveredDeleteId(null)}
                >
                  🗑️ Delete
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md="auto">
        <Button onClick={()=>Prev()}>previous</Button>
        </Col>
        
        <Col md="auto">
        <Button onClick={()=>Next()}>Next</Button>        
        </Col>
      </Row>
    </Container>
  );
}

export default ShowTask;
