import  {useState} from 'react'
import './App.css';

const App = () => {
  
  const [msg, setMsg] = useState()

  const handleClick = async () => {
    console.log('clicked')
    const res = await fetch('/.netlify/functions/helloWorld')
    const res_json = await res.json()
    console.log(res_json)
    setMsg(res_json.msg)
  }

  return (
    <div className="App">
      <h1>donate me</h1>
      <h1>
        <button onClick={handleClick}>click me</button>
      </h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
