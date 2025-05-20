import './App.css'
import { useEffect, useState } from 'react';
import axios from "axios";
import ProductsList from './components/ProductsList'
import Stats from './components/StatsPanel';


function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=50").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    //Filtra los productos
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    //Muestra el título del producto más caro
    const maxPrice = Math.max(...filteredProducts.map(p => p.price));
    const maxProduct = filteredProducts.find(p => p.price === maxPrice);
    const maxTitle = maxProduct?.title || "";

    //Muestra el título del producto más barato
    const minPrice = Math.min(...filteredProducts.map(p => p.price));
    const minProductObj = filteredProducts.find(p => p.price === minPrice);
    const minTitle = minProductObj?.title || "";

    //Calcula el precio total
    const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0);

    //Agarra los productos con más de 20 caracteres
    const longTitle = filteredProducts.filter(p => p.title.length > 20).length;


  return (
    <>
      <h1 className="font-bold text-center text-yellow-700 text-2xl p-10">Lista de Productos</h1>

      <input className='text-gray-600 m-7'
        type="text"
        placeholder="Buscar producto"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />      
      {filteredProducts.length == 0 && <div className='mb-10 text-gray-600'>No se encontraron productos</div>}

      <ProductsList products={filteredProducts} />
      
      <div className="fondo text-center p-10">
        <button className='bg-transparent hover:bg-cyan-500 text-cyan-700 font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded' onClick={() => setShow(!show)}>{show ? "Ocultar Estadísticas" : "Mostrar Estadísticas"}</button> 
        {/* Botón sacado de la documentación de tailwind buttons */}
      </div>

      {show && (
        <Stats
          max={maxPrice}
          min={minPrice}
          maxTitle={maxTitle}
          minTitle={minTitle}
          totalPrice={totalPrice}
          longTitle={longTitle}
        />
      )}
    
    </>
  )
}

export default App
