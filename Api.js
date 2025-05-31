fetch('http://207.244.228.247:4015/images/get')
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        console.log("Backend cannot connect");
    }
})
.then((data) => {
    let a = data.data;
    console.log(data);

    const homeBody = document.querySelector('.homeBody');

    a.forEach(element => {
        const imgTag = document.createElement('img');
        imgTag.src = element.url; 
        // imgTag.alt = element.name; // Optional: set alt text 
        homeBody.appendChild(imgTag);
    });

})
.catch((error) => {
    console.log("Fetch Error:", error);
});





fetch('http://62.72.42.72:4015/List/get')
    .then(response => response.json())
    .then(result => {
        const data = result.data;
        const listingContainer = document.querySelector('.ListingCar'); // or your main container where you want to add boxes

        data.forEach(car => {
            const carBox = document.createElement('div');
            carBox.className = 'ListingCarBox-1 ListingCarBox';
            carBox.setAttribute('ondblclick', `sendToViewPage('formInformation'), openCarDetail('scrollImg-${car.id}') , data-aos="zoom-in-down" `);

            carBox.innerHTML = `
                <div class="LeftListingCar">
                    <div class="scrollImg scrollImg-${car.id}">
                        <img src="${car.photo1}" onclick="openCarDetail('scrollImg-${car.id}')" />
                        <img src="${car.photo2}" onclick="openCarDetail('scrollImg-${car.id}')" />
                        <img src="${car.photo3}" onclick="openCarDetail('scrollImg-${car.id}')" />
                        <img src="${car.photo4}" onclick="openCarDetail('scrollImg-${car.id}')" />
                    </div>
                    <div class="CarArrows">
                        <i class="fa-solid fa-chevron-left" onclick="rightscroll${car.id}()"></i>
                        <i class="fa-solid fa-chevron-right" onclick="leftscroll${car.id}()()"></i>
                    </div>
                </div>

                <div class="rightListingCar">
                    <div class="rightHead">
                        <p>${car.carName}</p>
                        <h1><i class="fa-solid fa-dollar-sign"></i> ${car.carPrice}</h1>
                    </div>
                    <div class="rightBody">
                        <h1>${car.carModel}</h1>
                    </div>
                    <div class="rightBottom">
                        <div class="rightSpeed">
                            <i class="fa-solid fa-gauge-simple-high"></i>
                            <p>${car.carMillage}(ml)</p>
                        </div>
                        <div class="rightGasoline">
                            <i class="fa-solid fa-gas-pump"></i>
                            <p>${car.fuelType}</p>
                        </div>
                        <div class="rightCC">
                            <i class="fa-solid fa-wrench"></i>
                            <p>${car.carCC}(cc)</p>
                        </div>
                    </div>
                </div>

                <div class="formInformation" id="formInformation-${car.id}">
                    <div class="FBodyType">
                        <h3 class="carbodyType">${car.carType}</h3>
                        <h3 class="carDoor">${car.carDoor}</h3>
                        <h3 class="carSeater">${car.carSeat}</h3>
                        <h3 class="carpower">${car.carPower}</h3>
                        <h3 class="carAutomation">${car.carAutomation}</h3>
                        <h3 class="carTarget">${car.carTarget}</h3>
                        <h3 class="carColor">${car.carColor}</h3>
                        <h3 class="interColor">${car.carInterColor}</h3>
                        <h3 class="fuelType">${car.fuelType}</h3>
                        <h3 class="cylinder">${car.carCylinder}</h3>
                        <h3 class="carWarranty">${car.carWaranty}</h3>
                    </div>
                </div>
            `;

            listingContainer.appendChild(carBox);
        });
    })
    .catch(error => {
        console.error('Error fetching car listings:', error);
    });


// Listing Page Start

fetch('http://207.244.228.247:4015/BodyList/get')
    .then(response => response.json())
    .then(result => {
        let data = result.data;
        const container = document.querySelector('.rightPrice'); // Your existing container in HTML

        // container.innerHTML = ''; // Clear static blocks if any

        data.forEach((car, index) => {
            const tagClass = `rightTag-${index + 1}`;
            const imgTagClass = `rightImgTag-${index + 1}`;

            const carBox = document.createElement('div');
            carBox.className = `rightTag ${tagClass}`;
            carBox.setAttribute('onclick', `sendToViewPage2('formInformation'), openCarDetail4('${imgTagClass}')`);
            carBox.setAttribute('data-type', car.carType);

            carBox.innerHTML = `
                <div class="rightImgTag ${imgTagClass}">
                    <img class="rightFirstImg" src="${car.image1}" />
                    <img src="${car.image2}" />
                    <img src="${car.image3}" />
                    <img src="${car.image4}" />
                </div>

                <div class="righTagContent">
                    <div class="rightC">
                        <p class="CN">${car.mainName}</p>
                        <p class="rRS">AED ${car.carRate1}</p>
                    </div>
                    <div class="LeftC">
                        <p class="year"><i class="fa-solid fa-calendar"></i> ${car.carRate2}</p>
                        <p class="rKM"><i class="fa-solid fa-gauge-simple-high"></i> ${car.carKm}KM</p>
                        <p class="rMonth">${car.carMonth}/month</p>
                    </div>
                </div>

                <div class="formInformation">
                    <div class="FBodyType">
                        <h3 class="carbodyType">${car.carType}</h3>
                        <h3 class="carDoor">${car.carDoor}</h3>
                        <h3 class="carSeater">${car.carSeat}</h3>
                        <h3 class="carpower">${car.carPower}</h3>
                        <h3 class="carAutomation">${car.carAutomation}</h3>
                        <h3 class="carTarget">${car.carTarget}</h3>
                        <h3 class="carColor">${car.carColor}</h3>
                        <h3 class="interColor">${car.carInterColor}</h3>
                        <h3 class="fuelType">${car.carFuel}</h3>
                        <h3 class="cylinder">${car.carCylinder}</h3>
                        <h3 class="carWarranty">${car.carWaranty}</h3>
                    </div>
                </div>
            `;

            container.appendChild(carBox);
        });


        //  carModel click to view Option
        const filterButtons = document.querySelectorAll('.filter-btn');
        const noDataImg = document.querySelector('.FourNotFour');
    
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedType = button.getAttribute('data-filter').toLowerCase(); // 🔽 make lowercase
                const allCars = document.querySelectorAll('.rightTag');
                let visibleCount = 0;
    
                allCars.forEach(car => {
                    const carType = car.getAttribute('data-type').toLowerCase(); // 🔽 make lowercase
                    if (carType === selectedType) {
                        car.style.display = 'flex';
                        document.querySelector('.rightPrice').style.cssText = "justify-content:start;align-items:start;";
                        visibleCount++;
                    } else {
                        car.style.display = 'none';
                    }
                });
    
                if (visibleCount === 0) {
                    noDataImg.style.display = 'flex';
                    document.querySelector('.rightPrice').style.cssText = "justify-content: center;align-items: center;";
                } else {
                    noDataImg.style.display = 'none';
                }
            });
        });
     

    })
    .catch(error => {
        console.error('Error fetching car listings:', error);
    });

// Listing page clouses