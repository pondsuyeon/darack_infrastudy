import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function App() {
  const[answer, setAnswer] = useState("Answer : ");
  const[data, setData] = useState({
    first: "",
    second: ""
  });
  const handleChange = e =>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    });
  };
  const sumValues = ()=>{
    fetch('/api/operation/sum',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),
    })
    .then(response =>response.json())
    .then(response => {
      setAnswer("Answer : "+response.answer);
      console.log(response);
    });
  };
  return (
    <div>
      <h2>
        SUM
        </h2>
        <form>
        <TextField id="standard-basic" type="number" label="First" name="first" value={data.first} onChange={handleChange}/><br></br>
        <TextField id="standard-basic" type="number" label="Second" name="second" value={data.second} onChange={handleChange}/>
        <Button color="secondary" onClick={sumValues}>SUM</Button>
        </form>
        <h2>{answer}</h2>
    </div>
  );
}

export default App;