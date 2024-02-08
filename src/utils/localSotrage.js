
const getItem = (key) => {
   const item = localStorage.getItem(key);
   return item;
}

const setItem = (key,value) => {
     localStorage.setItem(key,value);
 }




export  {getItem, setItem}