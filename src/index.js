console.log('%c HI', 'color: firebrick')


// write JavaScript to get images of dogs and a list of dog breeds from API's and render them to the DOM. 
// You will also add some click behavior to the list elements and implement a filter.


// This repository includes an index.html file that loads an index.js file

//ensure that your JavaScript doesn't run until after the HTML has loaded

//imgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener("DOMContentLoaded", function (){

//fetch images using url
//parses the response as JSON
// add image elements to the DOM for each image in the array

const imageArray = [];

fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.message.forEach(function (imageUrl) {
      //document.createElement('img')
      let img = new Image();
      img.onload = function () {
        imageArray.push(imageUrl); // Push the URL, not the Image object
        console.log(img);
        
      
        const container = document.getElementById("dog-image-container");
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        container.appendChild(imgElement);
      };
      img.src = imageUrl;
    });
  })
  .catch(function (error) {
    console.error("Error fetching dog images:", error);
  });

  //on page load, fetches all the dog breeds using the url
  //adds the breeds to the page in the <ul> provided in index.html

  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  const breedListElement = document.getElementById('dog-breeds');
  
  const breedArray = [];
  
  fetch(breedUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      handleDogBreeds(data.message);
    })
    .catch(function(error) {
      console.log("Error fetching dog breeds:", error);
    });
  
  function handleDogBreeds(data) {
    for (const breed in data) {
      // Create a list item for each breed
      const listItem = document.createElement('li');
      listItem.textContent = breed;

      // Add JavaScript so that, when the user clicks on any one of the <li>s, the font color of that <li> changes. 
      // This can be a color of your choosing

      listItem.addEventListener('click', function () {
        listItem.style.color = 'blue'; // Change color to your preference
      });

      
      breedListElement.appendChild(listItem);
  
      // Push the breed to the array if you need it for further processing
      breedArray.push(breed);
    }
  }

//add JavaScript so that the user can filter breeds that start with a particular letter using a drop down
//For example, if the user selects 'a' in the dropdown, only show the breeds with names that start with the letter a

document.getElementById("breed-dropdown").addEventListener("click", function () {
  const selectedLetter = this.value;
  const ul = document.getElementById('dog-breeds');
  ul.innerHTML = '';

  breedArray.forEach(function (breed) {
    // Check if the breed name starts with the selected letter
    if (breed.startsWith(selectedLetter)) {
      const listItem = document.createElement('li');
      listItem.textContent = breed;
      ul.appendChild(listItem);
    }
  });
});

    }) 

/* <label for="select-breed">Filter Breeds That Start with:</label>
    <select id="breed-dropdown" name="select-breed">
      <option value="a">a</option>
      <option value="b">b</option>
      <option value="c">c</option>
      <option value="d">d</option>
    </select> */