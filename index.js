const carousalImages=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9gHxWXNMUr3lMJr4W8rWpVh6vwyjriJ6bQ&s","https://assets.mubicdn.net/images/notebook/post_images/19720/images-w1400.jpg?1445431100","https://i.pinimg.com/736x/fb/55/dc/fb55dc632b7a7ffbabf104b1208b27fc.jpg"]

let allMovies=[];
let currentSlide=0;

const carousalContainer=document.getElementById("carousal-container");

function initCarousal(){
    carousalContainer.innerHTML="";
    carousalImages.forEach((imageUrl,index)=>{
        const slide=document.createElement("div");
        slide.className="carousal-slide";
         if(index==0){
            slide.classList.add("active");
         }
        console.log(imageUrl)
         const img=document.createElement("img");
         img.className="carousal-image";
         img.src=imageUrl;
         img.alt=`${index+1}`
         slide.appendChild(img)
         carousalContainer.appendChild(slide);
    })
}

function updateCarousal(){
    const slides=document.querySelectorAll(".carousal-slide");
    slides.forEach((slide,index)=>{
        if(index===currentSlide){
            slide.classList.add("active");
        }else{
            slide.classList.remove("active");
        }
    })
}
function autoNext(){
    currentSlide=(currentSlide+1)%carousalImages.length;
    updateCarousal()
}

function changeSlide(direction){
      currentSlide=(currentSlide+direction+carousalImages.length)%carousalImages.length;
      updateCarousal()
}


const movieContainer=document.getElementById("movies-container");

async function getMoviesData(){
    try{
       const response=await fetch("http://localhost:3000/movies");
       allMovies=await response.json();
        displayMovies(allMovies);
    }catch(err){
        console.log(err)
    }
}


const searchInput=document.getElementById("search-input");
searchInput.addEventListener("input",()=>{
    const searchValue=searchInput.value;
    const filterValue=allMovies.filter(movie=>
        movie.title.toLowerCase().includes(searchValue.toLowerCase()));
   
    displayMovies(filterValue);
})

async function handleCart(movie){
    console.log(movie)
try{
     let response= await fetch("http://localhost:3000/cart",{
        method:"POST",
         headers: {
                'Content-Type': 'application/json', 
            },
         body:JSON.stringify(movie)
    });
    alert("Movie Added to Cart")
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
    <button class="nav-btn btn-cart" onclick='handleCart(${JSON.stringify(movie)})'>Cart</button>
    <button class="nav-btn btn-favourite">❤️Favourite</button>
 </div>
 </div>
`
// let cartBtn=card.querySelector(".btn-cart");
// cartBtn.addEventListener("click",()=>{
//     // handleCart(movie);
//     console.log("test click")
// })
 movieContainer.appendChild(card);
})

 }


const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));

const authSection=document.getElementById("auth-section");
if(loggedInUser){
   authSection.innerHTML=`<span class="user-name">Welcome ${loggedInUser.name}</span>
   <button class="nav-btn btn-logout" onClick="Logout()">Logout</button>` 
}

function Logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}


getMoviesData()
initCarousal();
setInterval(autoNext,4000);