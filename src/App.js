import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import Todos from './components/todos';
import Footer from './components/footer';

function App() {
  const [data, setData] = useState(null)
  useEffect(() =>  {
    fetch("https://jsonplaceholder.typicode.com/todos/")
    .then(res => res.json())
    .then(result => {
      setData(result)
    },
    error => {
      console.log('Error', error)
    })
  }, [])
  
  return (
    <div>
      <Header />
      <Todos data={data}/>
      <Footer />
    </div>
  );
}

export default App;
