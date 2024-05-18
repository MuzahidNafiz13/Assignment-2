const loadallplayers =()=>{
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p')
        .then(res => res.json())
        .then((data) => {
            displayFootballPlayers(data);
            // console.log(data);
        });
    };

    const displayFootballPlayers = (data) => {
        const productcontain = document.getElementById("product-container");
    
        const players = data.player;
        players.forEach((player) => {
            const div = document.createElement("div");
            div.classList.add("card");
    
            div.innerHTML = `
            <h4>Name: ${player.strPlayer}</h4>
            <h6>Nationality: ${player.strNationality}</h6>
            <h6>Team (Current): ${player.strTeam}</h6>
            <h6>Sport: ${player.strSport}</h6>
            <h6>Position: ${player.strPosition}</h6>
            <h6>Date of Birth: ${player.dateBorn}</h6>
            <h6>Gender: ${player.strGender}</h6>
            ${player.strDescriptionEN
                ? `<p>${player.strDescriptionEN
                    .slice(0, 20)}</p>` : ''}
            <div class ="icons">
            <a  target="_blank" href="${player.facebook}"><i class="fab fa-facebook-f"></i></a>
            <a  target="_blank" href="${player.instagram}"><i class="fab fa-instagram"></i></a>
            <a  target="_blank" href="${player.twitter}"><i class="fab fa-twitter"></i></a>
            </div>
            <button class="btn btn-primary" onclick="showPlayerDetails('${player.idPlayer}')">Details</button>
            <button class="btn btn-success" onclick="AddToCart('${player.strPlayer}')">Add to Team</button>
        `;
    
            productcontain.appendChild(div);
        });
    };
    

    const AddToCart = (name) => {
        const cartcount = document.getElementById("count").innerText;
        let convertedcount = parseInt(cartcount);
        if(convertedcount < 11){
        convertedcount = convertedcount + 1;
        document.getElementById("count").innerText = convertedcount;
    
        const container = document.getElementById("cart-main-container");
    
        const div = document.createElement("div");
        div.classList.add("cart-info");
        div.innerHTML = `
        <h6>${name}</h6>
        `;
        container.appendChild(div);
        updatetotal();
        }
        else{
        alert("You can't add more than 11 products to the cart.");
        }
    };
    
    const updatetotal = () => {
        const allprices = document.getElementsByClassName("price");
        let count = 0;
        for (const element of allprices) {
            count = count + parseFloat(element.innerText);
        }
    };
    const resetCount = () => {
        document.getElementById("count").innerText = "0";
        const container = document.getElementById("cart-main-container");
        container.innerHTML = "";
    };
    const showPlayerDetails = (idPlayer) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`)
            .then(res => res.json())
            .then(data => {
                const player = data.players[0];
                const modalTitle = document.getElementById("productModalLabel");
                const modalBody = document.getElementById("productDetails");
    
                modalTitle.innerText = player.strPlayer;
                modalBody.innerHTML = `
                    <img src="${player.strThumb}" alt="" class="img-fluid mb-3">
                    <h3>Name: ${player.strPlayer}</h3>
                    <h5>Nationality: ${player.strNationality}</h5>
                    <h5>Team (Current): ${player.strTeam}</h5>
                    <h5>Position: ${player.strPosition}</h5>
                    <h5>Sport: ${player.strSport}</h5>
                    <h5>Gender: ${player.strGender}</h5>
                `;
                $('#productModal').modal('show');
            });
    };
    
    loadallplayers();

    const searchProducts = () => {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const productCards = document.querySelectorAll(".card");
    
        productCards.forEach(card => {
            const playerName = card.querySelector("h4").textContent.toLowerCase(); // Change to h4 for player name
    
            if (playerName.includes(searchInput)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    };
    
    document.getElementById("searchInput").addEventListener("input", searchProducts);