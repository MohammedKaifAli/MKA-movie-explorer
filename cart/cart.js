

let allMovies=[];

const movieContainer=document.getElementById("movies-container");

async function getCartData(){
    try{
       const response=await fetch("http://localhost:3000/cart");
       allMovies=await response.json();
        displayMovies(allMovies);
    }catch(err){
        console.log(err)
    }
}




 function displayMovies(movies=allMovies){
    if(!movieContainer){
        console.log("Movies container is missing")
    }
   if(!movies || movies.length==0){
    movieContainer.innerHTML=`<p>No movies available</p>`
   }
   movieContainer.innerHTML="";
   movies.forEach(movie=>{
   const card=document.createElement("div");
 
 card.className="movie-card";
 card.innerHTML=`
 <div class="movie-poster"> 
 <img src=${movie.poster} class="movie-poster-img"/>
 </div>
 <div class="movie-info">
 <div class="movie-title">${movie.title}</div>
 <div class="movie-year">${movie.year}</div>
  <div class="movie-genre">${movie.Category}</div>
 <div class="movie-rating">⭐${movie.rating}</div>
 <div class="movie-buttons">
   
    <button class="nav-btn btn-favourite" onclick="removeFromCart('${movie.id}')" >Remove</button>
 </div>
 </div>
`

 movieContainer.appendChild(card);
})

 }


async function removeFromCart(id) {
    console.log(id,"cart id to remove");
    await fetch(`http://localhost:3000/cart/${id}`,{
        method:"DELETE"
    })
getCartData()
}









function Logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}

getCartData()