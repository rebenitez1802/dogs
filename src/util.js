export const replaceInPosition=(arr,index,obj)=>{
    return [...arr.slice(0,index),obj,...arr.slice(index+1)];
}

export const getBreedFromUrl  =(url)=>{
    if(url){
        const end =url.slice(url.indexOf('breeds/')+7).lastIndexOf('/');

        return url.slice(url.indexOf('breeds/')+7).slice(0,end).split('-');}
}