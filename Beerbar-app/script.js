let fromBeer = 0;
let toBeer = 5;
let beerPage = 1;
let beerContainer = document.getElementById('beerContainer');
let userBeerPage = document.getElementById("beerPage");
let sortOrder = "";
let arrayOfAllBeerObjects = [];

async function fetchBeers() {
    let totalPages = 13;

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            arrayOfAllBeerObjects.push(...data); 
        }
        getBeers(arrayOfAllBeerObjects);
        console.log(arrayOfAllBeerObjects);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getBeers(data) {
    
    beerContainer.innerHTML = "";

    let startIndex = (beerPage - 1) * toBeer;
    let endIndex = Math.min(startIndex + toBeer, data.length);

    for (let i = startIndex; i < endIndex; i++) {
        if (i % 5 === 0) { 
            var row = document.createElement('div');
            row.className = 'row mx-auto';
            beerContainer.appendChild(row);
        }

        const beer = data[i];

        const col = document.createElement('div');
        col.className = 'col-2 mx-auto ';
        col.style.margin = "0 0 40px 0";

        const card = document.createElement('div');
        card.className = 'card h-100';

        const img = document.createElement('img');
        img.src = "images/beers.png";
        img.className = 'card-img-top';
        img.alt = beer.name;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = beer.name;

        const description = document.createElement('p');
        description.className = 'card-text';
        description.textContent = beer.description;

        const buttonDescription = document.createElement('a');
        buttonDescription.href = '#';
        buttonDescription.className = 'btn btn-primary more-info-btn';
        buttonDescription.textContent = 'More Info';

        buttonDescription.addEventListener('click', function(event) {
            event.preventDefault();
            let beerIndex = i;
            let randomBeerImg = document.getElementById('randomBeerImg');
            let randomBeerInfo = document.getElementById('randomBeerInfo');
            randomBeerImg.innerHTML = "";
            randomBeerInfo.innerHTML = "";
            if (!isNaN(beerIndex)) {
                const beer = arrayOfAllBeerObjects[beerIndex];
                loadClickedBeer(beer);
            }
            
            let beerSection = document.getElementById("beerInfo");
            beerSection.scrollIntoView({ behavior: 'smooth' });
        });

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(buttonDescription);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        row.appendChild(col);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const beersLink = document.getElementById('beerS');
    const beersSection = document.getElementById('beers');

    beersLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        
        beersSection.scrollIntoView({ behavior: 'smooth' });
    });
});

let randomBeerNavBtn = document.getElementById("randomBeer");
randomBeerNavBtn.addEventListener("click",function(event){
    loadRandomBeer();
    event.preventDefault();
    
    let beerSection = document.getElementById("beerInfo");
    beerSection.scrollIntoView({ behavior: 'smooth' });
})

let showFiveBeers = document.getElementById("5");
let showTenBeers = document.getElementById("10");
let showTwentyBeers = document.getElementById("20");

showFiveBeers.addEventListener("click", function() {
    beerPage = 1; 
    toBeer = 5;
    beerContainer.innerHTML = '';
    previousBtn.disabled = true; 
    nextBtn.disabled = false;
    userBeerPage.innerHTML = `Page ${beerPage}/65`
    fetchBeers();
});

showTenBeers.addEventListener("click", function() {
    beerPage = 1; 
    toBeer = 10;
    beerContainer.innerHTML = '';
    previousBtn.disabled = true; 
    nextBtn.disabled = false;
    userBeerPage.innerHTML = `Page ${beerPage}/33`;
    fetchBeers();
});

showTwentyBeers.addEventListener("click", function() {
    beerPage = 1;
    toBeer = 20;
    beerContainer.innerHTML = '';
    previousBtn.disabled = true;
    nextBtn.disabled = false;
    userBeerPage.innerHTML = `Page ${beerPage}/17`
    fetchBeers();
});

document.addEventListener('DOMContentLoaded', function() {
    previousBtn.disabled = true; 
    nextBtn.disabled = false;
    userBeerPage.innerHTML = `Page ${beerPage}/65`
    fetchBeers();
    loadRandomBeer();
    
});

let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");

previousBtn.addEventListener("click", function() {

    if (beerPage > 1) {
        beerPage -= 1;
        nextBtn.disabled = false; 
    }
    if (beerPage === 1) {
        previousBtn.disabled = true;
    }
    updatePageCount(); 
    sortingOrder();
    
});

nextBtn.addEventListener("click", function() {
    if (toBeer === 20) {
        if (beerPage < 17) { 
            beerPage += 1;
            previousBtn.disabled = false; 
        }
        if (beerPage === 17) {
            nextBtn.disabled = true;
        }
        updatePageCount(); 
        sortingOrder();
        
    }

    if (toBeer === 5) {
        if (beerPage < 65) { 
            beerPage += 1;
            previousBtn.disabled = false; 
        }
        if (beerPage === 65) {
            nextBtn.disabled = true;
        }
        updatePageCount(); 
        sortingOrder();
        
    }

    if (toBeer === 10) {
        if (beerPage < 33) { 
            beerPage += 1;
            previousBtn.disabled = false; 
        }
        if (beerPage === 33) {
            nextBtn.disabled = true;
        }
        updatePageCount(); 
        sortingOrder()
    }
});

function updatePageCount() {
    let pageCount;
    if (toBeer === 5) {
        pageCount = 65;
    } else if (toBeer === 10) {
        pageCount = 33;
    } else if (toBeer === 20) {
        pageCount = 17;
    }
    userBeerPage.innerHTML = `Page ${beerPage}/${pageCount}`; 
}

let nameASC = document.getElementById("nameASC");
let nameDESC = document.getElementById("nameDESC");
let alcoholASC = document.getElementById("alcoholASC");
let alcoholDESC = document.getElementById("alcoholDESC");
let bitternessASC = document.getElementById("bitternessASC");
let bitternessDESC = document.getElementById("bitternessDESC");

nameASC.addEventListener("click",function(){
    sortOrder = "nameAsc"
    getNameASCBeers()
    
})

async function getNameASCBeers() {
    let allData = []; 
    let totalPages = 13; 

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            allData.push(...data); 
        }
        allData.sort((a, b) => a.name.localeCompare(b.name));
        getBeers(allData);
        console.log(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

nameDESC.addEventListener("click",function(){
    sortOrder = "nameDesc"
    getNameDescBeers()
})

async function getNameDescBeers() {
    let allData = []; 
    let totalPages = 13; 

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            allData.push(...data); 
        }
        allData.sort((a, b) => b.name.localeCompare(a.name));
        getBeers(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

alcoholASC.addEventListener("click",function(){
    sortOrder = "alcoholASC"
    getAlcoholASC()
    
})

async function getAlcoholASC() {
    let allData = []; 
    let totalPages = 13; 

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            allData.push(...data); 
        }
        allData.sort((a, b) => a.abv - b.abv);
        getBeers(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

alcoholDESC.addEventListener("click",function(){
    sortOrder = "alcoholDESC"
    getAlcoholDESC()
    
})

async function getAlcoholDESC() {
    let allData = []; 
    let totalPages = 13; 

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            allData.push(...data); 
        }
        allData.sort((a, b) => b.abv - a.abv);
        getBeers(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

bitternessASC.addEventListener("click",function(){
    sortOrder = "bitternessASC"
    getBitternessASC()
    
})

async function getBitternessASC() {
    let allData = []; 
    let totalPages = 13; 

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            allData.push(...data); 
        }
        allData.sort((a, b) => a.ibu - b.ibu);
        getBeers(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


bitternessDESC.addEventListener("click",function(){
    sortOrder = "bitternessDESC"
    getBitternessDESC()
    
})

async function getBitternessDESC() {
    let allData = []; 
    let totalPages = 13; 

    try {
        for (let page = 1; page <= totalPages; page++) {
            let url = `https://api.punkapi.com/v2/beers?page=${page}`;
            let response = await fetch(url);
            let data = await response.json();
            allData.push(...data); 
        }
        allData.sort((a, b) => b.ibu - a.ibu);
        getBeers(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function sortingOrder(){
    if (sortOrder === "nameAsc") {
        getNameASCBeers();
    } else if (sortOrder === "nameDesc") {
        getNameDescBeers();
    } else if (sortOrder === "alcoholASC") {
        getAlcoholASC();
    } else if (sortOrder === "alcoholDESC") {
        getAlcoholDESC();
    } else if (sortOrder === "bitternessASC") {
        getBitternessASC(); 
    } else if (sortOrder === "bitternessDESC") {
        getBitternessDESC(); 
    } else {
        fetchBeers();
    }
}

async function loadRandomBeer() {
    try {
        let response = await fetch('https://api.punkapi.com/v2/beers/random');
        let data = await response.json();
        let beer = data[0];
        console.log(beer);
        loadClickedBeer(beer);

    } catch (error) {
        console.error('Error fetching random beer:', error);
    }
}


async function loadClickedBeer(beer) {
    try {
        let randomBeerImg = document.getElementById('randomBeerImg');
        let randomBeerInfo = document.getElementById('randomBeerInfo');

        randomBeerImg.innerHTML = '';
        randomBeerInfo.innerHTML = '';

        let table = document.createElement("table");
        table.style.border = "1px solid black";
        table.style.width = "400px";
        table.style.marginLeft = "30%";

        let tblBody = document.createElement("tbody");

        let nameRow = document.createElement("tr");
        nameRow.style.border = "1px solid black";
        nameRow.style.backgroundColor = "rgb(234, 234, 234)";

        let nameCell = document.createElement("td");
        nameCell.style.padding = "20px"
        let nameCellText = document.createElement('strong');
        nameCellText.textContent = beer.name;
        nameCell.appendChild(nameCellText);
        nameRow.appendChild(nameCell);
        tblBody.appendChild(nameRow);

        nameCell.appendChild(document.createElement('br'));

        let nameCellTagline = document.createTextNode(`${beer.tagline}`);
        nameCell.appendChild(nameCellTagline);
        nameRow.appendChild(nameCell);
        tblBody.appendChild(nameRow);


        let descriptionRow = document.createElement("tr");
        let descriptionCell = document.createElement("td");
        descriptionCell.style.padding = "20px"
        let descriptionCellText = document.createElement('span');
        descriptionCellText.textContent = `${beer.description}`;
        descriptionCell.appendChild(descriptionCellText);

        descriptionCell.appendChild(document.createElement('br'));
        descriptionCell.appendChild(document.createElement('br'));

        let brewedTextNode = document.createElement('span');
        brewedTextNode.textContent = `Brewed: ${beer.first_brewed}`;
        descriptionCell.appendChild(brewedTextNode);

        descriptionCell.appendChild(document.createElement('br'));

        let abvTextNode = document.createElement('span');
        abvTextNode.textContent = `Alcohol: ${beer.abv}%`;
        descriptionCell.appendChild(abvTextNode);

        descriptionCell.appendChild(document.createElement('br'));

        let ibuTextNode = document.createElement('span');
        ibuTextNode.textContent = `Bitterness: ${beer.ibu}`;
        descriptionCell.appendChild(ibuTextNode);
       
        descriptionCell.appendChild(document.createElement('br'));
        descriptionCell.appendChild(document.createElement('br'));

        let foodPairingText = document.createElement('strong');
        foodPairingText.textContent = `Food pairing`;
        foodPairingText.style.fontSize = "larger"
        foodPairingText.style.fontSize = "larger"
        descriptionCell.appendChild(foodPairingText);

        descriptionCell.appendChild(document.createElement('br'));

        descriptionRow.appendChild(descriptionCell);
        tblBody.appendChild(descriptionRow);

        for (let f = 0; f < beer.food_pairing.length; f++) {
            let foodPairingRow = document.createElement("tr");
            let foodPairingCell = document.createElement("td");

            let foodPairingDiv = document.createElement("div");
            foodPairingDiv.style.margin = "0px 20px 5px 20px"; 
        
            let foodPairingCellText = document.createTextNode((f + 1) + ". " +beer.food_pairing[f]);

            foodPairingDiv.appendChild(foodPairingCellText);
            foodPairingCell.appendChild(foodPairingDiv);
            foodPairingRow.appendChild(foodPairingCell);
            tblBody.appendChild(foodPairingRow);
        }

        table.appendChild(tblBody);

        randomBeerInfo.appendChild(table);

        if (beer.image_url !== null) {
            randomBeerImg.innerHTML = `<img src="${beer.image_url}" alt="${beer.name}" style="max-width: 150px;">`;
        } else {
            randomBeerImg.innerHTML = `<img src="images/notfoundImg.jpg" alt="${beer.name}" style="max-width: 150px;">`;
        }

    } catch (error) {
        console.error('Error loading clicked beer:', error);
    }
}

let userInputField = document.getElementById('inputText');
let searchButton = document.getElementById('submitBtn');
searchButton.addEventListener("click", async function(event) {
    event.preventDefault(); 
    let userInput = userInputField.value;
    await fetchBeerData(userInput);
    
});

async function fetchBeerData(beerName) {
    try {
        let response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`);
        let data = await response.json();
        if (data.length > 0) {
            let matchedBeer = data.find(beer => beer.name.toLowerCase().includes(beerName.toLowerCase()));
            if (matchedBeer) {
                loadClickedBeer(matchedBeer);
                let beerSection = document.getElementById("beerInfo");
                beerSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Beer not found');
            }
        } else {
            alert('Beer not found');
        }
    } catch (error) {
        console.error('Error fetching beer:', error);
    }
}