import { useEffect,useState } from "react";

function Home(){

const [products,setProducts] = useState([])

useEffect(()=>{

fetch("http://127.0.0.1:8000/api/products/")
.then(res=>res.json())
.then(data=>setProducts(data))

},[])

return(

<div>

<h2>Popular Products</h2>

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"}}>

{products.map(p=>(
<div key={p.product_id} style={{border:"1px solid gray",padding:"10px"}}>

<h4>{p.product_name}</h4>

</div>
))}

</div>

</div>

)

}

export default Home