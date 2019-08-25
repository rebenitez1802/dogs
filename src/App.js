import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './App.css';
import Layout from './components/layout';



function App() {
  const fetchBreads = async () => {
    const response = await axios.get(`https://dog.ceo/api/breeds/list/all`);
  
    setBreads(response.data.message);
  };
  const [breads, setBreads] = React.useState([]);
  React.useEffect(()=>  {fetchBreads(breads)},[]);

  return (
    <Container>     
      <Layout breads={breads} />
    </Container>
    );
}

export default App;
