let kittens = []
            
const kittenImg = "tcRRB2kUirfj7odKakeYPP-1200-80.jpg"
const kittenAngy = "angrykitty.jpg"


/**
 *
 *multi use random number generator w/decimal placement adjustment
 * ie 1, 10 , 100, 1000 in the place of 'max' when the function is called
 */
function getRandomInt(max) {
    Math.floor(Math.random() * max)
}


/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event)   {
    event.preventDefault()
    let form = event.target
    
    
    let kitten ={
        id: generateId(),
        name: form.name.value,
        affection: 6,
        mood: "chillin",
        img: kittenImg
    }
    
    let n = kittens.find(k=>k.name == form.name.value)
    console.log(n)
    if (!n)
    {
        kittens.push(kitten)
        form.reset()
        saveKittens()
        drawKittens()
    }
    form.reset()
    
    
    
    
}

function removeKitten(id) {
   let kitten = findKittenById(id)
   let r = kittens.indexOf(k => k.id == id)
   kittens.splice(r)
   saveKittens()
   drawKittens()

}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens()  {
    window.localStorage.setItem("kittens", JSON.stringify(kittens))
} 

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens()  {
    let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
    if (storedKittens)  {
        kittens = storedKittens
    }
    
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens()  {
    let template = ""
   
    
    kittens.forEach((k)=>{
        template += 

       ` <div class="card p-2 text-center w-50">
        <img src="${k.img}" height="250" alt="Moody Kittens">
        <div class="mt-2">
        
        <p1 id="${k.name}">${k.name}</p1>
        <br>
        <p2 id="${k.mood}">${k.mood}</p2>
        <br>
        <p3 id="${k.affection}">${k.affection}</p3>
          <br>
          <button  onclick="pet('${k.id}')">pet</button>
          <br>
          <button onclick="feed('${k.id}')">feed</button>
          <br>
          <button onclick="removeKitten('${k.id}')">delete</button>
        </div>
      </div>
      `
    })
    document.getElementById("kittens").innerHTML = template
}




/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
    
    let found =kittens.find(k =>k.id == id)
    return found
    
}
function showMe(){
    let kitten =findKittenById(id)
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
    let kitten = findKittenById(id)
    let petAttempt= Math.random()
    
    
    if (petAttempt >= .6){
        kitten.affection +=1
    }
    else {
        kitten.affection -=1
    }

    setKittenMood(kitten)
    saveKittens()
    drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function feed(id) {
    let kitten = findKittenById(id)
    kitten.affection += 1
    setKittenMood(kitten)
    saveKittens()
    drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */ 
function setKittenMood(kitten) {
    
   
    if(kitten.affection >= 6){
        kitten.mood = "purrpurr"
    }
    if(kitten.affection <= 4){
        kitten.mood ="chillin"
        kitten.img = kittenImg
    }
    if(kitten.affection <= 2){
        kitten.mood = "unhappy"
        kitten.img = kittenAngy
    }
    if(kitten.affection <= 0){
        kitten.mood = "ferral"
        removeKitten(kitten.id)

    }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
    kittens = []
    saveKittens()
    getStarted()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  
}

function checkStarted() {
    if (kittens.length) {
      document.getElementById("welcome").firstElementChild.innerHTML += `<button class="btn-cancel" onclick="clearKittens()">Clear ${kittens.length} Kittens</button>`
    }
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()
drawKittens()
