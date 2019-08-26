import React from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './App.css';
import Layout from './components/layout';
import {replaceInPosition, getBreedFromUrl} from './util'

const generateState =(data)=>{
  return Object.keys(data).map((bread)=>{
    return  {bread:bread, checked:false, subreads:bread.length === 0 ?[]: data[bread].map((subread)=> {return {bread: subread, checked: false}})}
  });
}
const generateCache =(data)=>{
  return Object.keys(data).map((bread)=> ({
              bread:bread, 
              data:[], 
              isPartialyCached:true, 
              subreadsCached:[], 
              subreads:bread.length === 0 ? [] : data[bread].map((subread)=> {return {bread: subread, data: []}})
            })
  );
}
const updateCache =(cache, key, subKey, data)=>{
  const currentIndex = cache.findIndex(b => b.bread === key);
  const current =cache[currentIndex];
  if(subKey === null){
    if(current.subreads.length <= 0)
      //fill data upper level
      return replaceInPosition(cache, currentIndex, {...current, isPartialyCached:false, data:data.map((url)=> ({img: url, title:getBreedFromUrl(url)[0]}))});
    //fill data in second level by subkey
    return replaceInPosition(cache, currentIndex, {...current, subreadsCached: current.subreads.map((ub)=> ub.bread), isPartialyCached:false, subreads:current.subreads.map((subr)=> ({...subr, data:data.filter((url)=> getBreedFromUrl(url)[1] === subr.bread).map((url)=>({img:url, title: getBreedFromUrl(url).join('-')}))}))})
   
  }else{
    //fill data in single second level
    const currentSubIndex = current.subreads.findIndex(b=> b.bread === subKey);
    const currentSub = current.subreads[currentSubIndex];
    return replaceInPosition(cache, currentIndex, {...current,
                                                isPartialyCached: current.subreadsCached.length+1 === current.subreads.length? false: true,
                                                subreadsCached: [...current.subreadsCached, subKey],
                                                subreads: replaceInPosition(current.subreads, currentSubIndex, {...currentSub, data:data.map((url)=> ({img:url, title:getBreedFromUrl(url).join('-')}))}) 
                                                })
  }

}
const getDataFromCache=(bread,subread,cache)=>{
  const current = cache.find(b => b.bread===bread)
  if(subread === null){
    if(current.subreads.length <= 0){
      return current.data;
    }else
      return current.isPartialyCached?[]:current.subreads.reduce((data, subread)=> data.concat(subread.data), [])
  }else{
    return current.subreads.find((sub)=> sub.bread===subread).data
  }
}
const removeFromData=(data,bread,subread)=>{
  if(subread === null)
    return data.filter((url)=> getBreedFromUrl(url.img)[0] !== bread)
  else
    return data.filter((url)=> !(getBreedFromUrl(url.img)[0] === bread && getBreedFromUrl(url.img)[1] ===subread))
}
function App() {
  const fetchBreads = async () => {
    const response = await axios.get(`https://dog.ceo/api/breeds/list/all`);
    
    setBreads(generateState(response.data.message));
    setCache(generateCache( response.data.message));
  };
  const fetchImages = async (bread,subread) => {
    
    const response = subread? await axios.get(`https://dog.ceo/api/breed/${bread}/${subread}/images`): await axios.get(`https://dog.ceo/api/breed/${bread}/images`);
    
    setCache(updateCache(cache, bread, subread, response.data.message))
    return response.data.message.map((url)=> ({img:url, title:getBreedFromUrl(url).join('-')}))
  }

  const [breads, setBreads] = React.useState([]);
  const [cache, setCache] = React.useState([]);
  const [data, setData] = React.useState([]);
  const checkFilter =(bread, subread, checked)=>{
    const currentIndex = breads.findIndex(b => b.bread === bread);
    const current =breads[currentIndex];    
    if(subread === null)
      setBreads(replaceInPosition( breads,currentIndex ,{...current, checked:!checked, subreads: current.subreads.map(sb => ({...sb, checked:!checked}))}))  
    else{
      const currentSubreadIndex = current.subreads.findIndex(sb => sb.bread === subread);
      const currentSubread =current.subreads[currentSubreadIndex];
      setBreads(replaceInPosition(breads,currentIndex, {...current, subreads:replaceInPosition(current.subreads,currentSubreadIndex,{...currentSubread, checked: !currentSubread.checked})}));
    } 
    if(!checked){
      const newData = getDataFromCache(bread,subread,cache)
      if(newData.length > 0)
        setData([...data,...newData])
      else
        fetchImages(bread,subread).then((newData)=>{
          setData([...data,...newData])
        })
    }else{
      setData(removeFromData(data,bread,subread))
    }
    
  }
  
  React.useEffect(()=>  {fetchBreads()},[]);

  return (
    <Container>     
      <Layout breads={breads} handleBreadclick= {checkFilter} data={data}/>
    </Container>
    );
}

export default App;
