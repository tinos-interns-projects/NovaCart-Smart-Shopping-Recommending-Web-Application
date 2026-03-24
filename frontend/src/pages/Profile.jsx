function Profile({user,cart}){

return(

<div>

<h2>User Profile</h2>

<p>Username : {user}</p>

<h3>Your Cart Items</h3>

{cart.map(item=>(
<p key={item.product_id}>{item.product_name}</p>
))}

</div>

)

}

export default Profile