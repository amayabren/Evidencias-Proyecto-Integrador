import { useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get("https://dummyjson.com/products/").then((res) => {
      setProducts(res.data.products)  
    })
  },[])

  return (
      <div className="bg-pink-50 p-6 text-gray-600">
        <h1 className="font-bold text-center text-2xl mb-10 ">Lista de Productos</h1>

          <ul>
          {products.map((p)=>(
            <li key={p.id} className='bg-white mb-4 p-4 shadow'>{p.id}. {p.title} - <span className="text-indigo-600 font-semibold"> ${p.price}</span></li> 
          ))}
          </ul>

      </div>
    );
}

export default App
