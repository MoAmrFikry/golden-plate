let searchInput = document.getElementById("searchinput");
let searchBtn = document.getElementById("searchbtn");
let resBox = document.getElementById("resbox");

function clearInput() {
  searchInput.value = "";
}

searchBtn.addEventListener("click", async function () {
  let input = searchInput.value.trim();

  if (!input) {
    alert("Please enter what you want to find");
    return;
  }

  try {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${input}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    let finalApi = await response.json();
    console.log(finalApi);

    resBox.innerHTML = "";

    finalApi.recipes.forEach((item) => {
      let star = item.social_rank.toFixed(2);
      let stars = ''; 
      if (star > 80) {
        for (let i = 0; i<5; i++) {
          stars += `<i class="fa-solid fa-star fa-xl" style="color: #FFD43B;  margin-right:3px;"></i>`;
        
        }
     
      }else if(star>60){
        for (let i = 0; i< 4; i++) {
          stars += `<i class="fa-solid fa-star fa-xl" style="color: #FFD43B; margin-right:3px; "></i>`;
         
        }

      } 
      else if(star>40){
        for (let i = 0; i< 3; i++) {
          stars += `<i class="fa-solid fa-star fa-xl" style="color: #FFD43B; margin-right:3px;"></i>`;
          
        }
   
      }
      else if(star>20){
        for (let i = 0; i< 2; i++) { 
          stars += `<i class="fa-solid fa-star fa-xl" style="color: #FFD43B; margin-right:3px;"></i>`;
          
        }
    
      }
      else {
        
        for (let i = 0; i <1; i++) {
          stars += `<i class="fa-solid fa-star fa-xl star" style="color: #FFD43B; margin-right:3px;"></i>`;
          
        }
      
      }

      
      let showData = `
        <div class="col-lg-4 col-md-6 col-sm-12 gy-5">
          <div class="single-menu">
            <div class="row justify-content-center">
              <img src="${item.image_url}" alt="${item.title}" class="img-menu">
            </div>
           
            <div class="title-wrap d-flex justify-content-between">
              <div class="col-lg-12">
                <h4 class="mt-3">${item.title}</h4>
              </div>
             
            </div>
             <span class="stars">${stars}</span>
          </div>
        </div>
      `;

      resBox.innerHTML += showData;
    });

    clearInput();
  } catch (error) {
    console.log("Error:", error.message);
    alert("An error occurred while fetching data. Please try again.");
  }
});
