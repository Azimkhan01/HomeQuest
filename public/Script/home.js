

const apiUrl = 'http://127.0.0.1:5000/api';

// Fetch data using the fetch API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON data
    })
    .then(data => {
        let demo = document.getElementById("demo");
        console.log(data[0][1])
        for(i=0;i<1000;i++){
        let cd = document.createElement("div")
        cd.style.cssText = 'display:flex;flex-direction:column;height:40%;width:20%;margin:20px 20px;padding:10px;border:2px solid black';
        (data[0][i]["availibility"]==true) ? cd.style.cssText='color:black;background-color:#A7F432' : cd.style.cssText='color:black;background-color:#FF2E2F';

        cd.innerHTML = `<p>name:${data[0][i]["name"]}</p><br><p>country:${data[0][i]["country"]}</p><br><p>Address:${data[0][i]["addresss"]}</p><br><p>contact:${data[0][i]["contact"]}</p><br><p>Price:${data[0][i]["price"]}</p><br><p>Sold:${data[0][i]["availibility"]}</p>`
        demo.appendChild(cd);
   } })
