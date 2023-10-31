import { calculator_backend } from "../../declarations/calculator_backend";

const container= document.getElementById("resultcontainer");
const scoreButton= document.getElementById("score");
const rankButton= document.getElementById("rank");
const normalizeButton= document.getElementById("normalize");
const independenceButton= document.getElementById("independence");
const cramersvButton= document.getElementById("cramersv");

function viewData(result) {
  const viewButton= document.getElementById("view_btn");
  viewButton.addEventListener('click', function () {
    document.getElementById('result').innerText = result
  })
}

scoreButton.addEventListener("click", async function() {
  container.innerHTML = `<div id="canvascontainer"><canvas id="myCanvas" width="602" height="352" style="border:1px solid grey;"></canvas><div id="canvasdetile"><p>Red - Harmonic</p><p>Blue - Geometric</p><p>Green - Arithmetic</p></div></div><div id="result"></div>`
  document.getElementById("type").innerText = "Rarity Score";
  document.getElementById("result").innerText = "Loading...";
  const canisterId= document.getElementById("name").value;
  const data= document.getElementById("data").value;
  const score = await calculator_backend.get_rarity_score(canisterId == "" ? data : canisterId);
  score.json()
  .then(res=>{
    const canvas= document.getElementById("myCanvas");  
    canvas.width = 602
    canvas.height = 352
    const width = canvas.width;
    const height = canvas.height;
    canvas.style.height = '352px'; 
    canvas.style.width = '602px'; 
    const ctx = canvas.getContext("2d");
    ctx.rect(10, 10, 300, 500)
    const colorArray = ['red', 'blue', 'green']
    const indexArray = [2,3,4]
    indexArray.forEach(ind=>{
       bins = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
      res[ind].map(item=>{
        bins[Math.floor(item/0.05)]+=1.0;
      })
      let max= 0.0
      let resulta = bins.map(bin=>{
        if(bin/res[ind].length > max) max = bin/res[ind].length;
        return bin/res[ind].length
      });
      console.log(resulta)
      ctx.strokeStyle = colorArray[ind-2]
      ctx.beginPath()
      resulta.forEach((item, index) => {
        console.log(ctx.offsetHeight, ctx.offsetWidth)
        if(index != 0){
          ctx.moveTo(width/20*(index-1), height - (height-10)*resulta[index-1]*2-5)
          ctx.lineTo(width/20*(index), height - (height-10)*resulta[index]*2-5)
        }
      })
      ctx.stroke();
    })
    let result = "<button id='view_btn'>View Raw Data</button>";
    document.getElementById('result').innerHTML = result
    result = "";
    result += `Harmonic Algorithm\n\n`  
    result += `[${res[2]}],\n\n`  
    result += `Geometric Algorithm\n\n`  
    result += `[${res[3]}],\n\n`  
    result += `Arithmetic Algorithm\n\n`  
    result += `[${res[4]}],\n\n`  
    viewData(result)
  })
  .catch(err=>{
    document.getElementById("result").innerText = "Error : Can't fetch canister Data or canister doesn't contain valid data";
  })
});

rankButton.addEventListener("click", async function() {
  container.innerHTML = `<div id="result"></div>`
  document.getElementById("type").innerText = "Rarity Rank";
  document.getElementById("result").innerText = "Loading...";
  const canisterId= document.getElementById("name").value;
  const data= document.getElementById("data").value;
  const rank = await calculator_backend.get_rarity_rank(canisterId == "" ? data : canisterId);
  rank.json()
  .then(res=>{
    let result = "";
    result += `Harmonic Algorithm\n\n`  
    result += `[${res[2]}],\n\n`  
    result += `Geometric Algorithm\n\n`  
    result += `[${res[3]}],\n\n`  
    result += `Arithmetic Algorithm\n\n`  
    result += `[${res[4]}],\n\n` 
    document.getElementById("result").innerText = result
  })
  .catch(err=>{
    document.getElementById("result").innerText = "Error : Can't fetch canister Data or canister doesn't contain valid data";
  })
});

normalizeButton.addEventListener("click", async function() {
  container.innerHTML = `<div id="canvascontainer"><canvas id="myCanvas" width="602" height="352" style="border:1px solid grey;"></canvas><div id="canvasdetile"><p>Red - Harmonic</p><p>Blue - Geometric</p><p>Green - Arithmetic</p></div></div><div id="result"></div>`
  document.getElementById("type").innerText = "Rarity Score - Trait Normalized";
  document.getElementById("result").innerText = "Loading...";
  const canisterId= document.getElementById("name").value;
  const data= document.getElementById("data").value;
  const normalize = await calculator_backend.get_trait_normalize(canisterId == "" ? data : canisterId);
  normalize.json()
  .then(res=>{
    const canvas= document.getElementById("myCanvas");  
    canvas.width = 602
    canvas.height = 352
    const width = canvas.width;
    const height = canvas.height;
    canvas.style.height = '352px'; 
    canvas.style.width = '602px'; 
    const ctx = canvas.getContext("2d");
    ctx.rect(10, 10, 300, 500)
    const colorArray = ['red', 'blue', 'green']
    const indexArray = [0,2,4]
    indexArray.forEach(ind=>{
       bins = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
      res[ind].map(item=>{
        bins[Math.floor(item/0.05)]+=1.0;
      })
      let max= 0.0
      let resulta = bins.map(bin=>{
        if(bin/res[ind].length > max) max = bin/res[ind].length;
        return bin/res[ind].length
      });
      console.log(resulta)
      ctx.strokeStyle = colorArray[ind/2]
      ctx.beginPath()
      resulta.forEach((item, index) => {
        console.log(ctx.offsetHeight, ctx.offsetWidth)
        if(index != 0){
          ctx.moveTo(width/20*(index-1), height - (height-10)*resulta[index-1]*2-5)
          ctx.lineTo(width/20*(index), height - (height-10)*resulta[index]*2-5)
        }
      })
      ctx.stroke();
    })
    let result = "<button id='view_btn'>View Raw Data</button>";
    document.getElementById('result').innerHTML = result
    result = "";
    result += `Harmonic Algorithm\n\n`  
    result += `[${res[0]}],\n\n`  
    result += `Geometric Algorithm\n\n`  
    result += `[${res[2]}],\n\n`  
    result += `Arithmetic Algorithm\n\n`  
    result += `[${res[4]}],\n\n`  
    viewData(result)
  })
  .catch(err=>{
    document.getElementById("result").innerText = "Error : Can't fetch canister Data or canister doesn't contain valid data";
  })
});

independenceButton.addEventListener("click", async function() {
  container.innerHTML = `<div id="result"></div>`
  document.getElementById("type").innerText = "Trait Independence";
  document.getElementById("result").innerText = "Loading...";
  const canisterId= document.getElementById("name").value;
  const data= document.getElementById("data").value;
  const independence = await calculator_backend.get_trait_independence(canisterId == "" ? data : canisterId);
  independence.json()
  .then(res=>{
    let result = "<table>";
    res.map((row, row_index)=>{
      result += "<tr>"
      row.map((col, col_index) =>{
        result += `<td>${res[col_index][row_index]}</td>`  
      })
      result += `</tr>`  
    })
    result += `</table>`  
    document.getElementById("result").innerHTML = result
  })
  .catch(err=>{
    document.getElementById("result").innerText = "Error : Can't fetch canister Data or canister doesn't contain valid data";
  })
});

cramersvButton.addEventListener("click", async function() {
  container.innerHTML = `<div id="result"></div>`
  document.getElementById("type").innerText = "Trait CramersV";
  document.getElementById("result").innerText = "Loading...";
  const canisterId= document.getElementById("name").value;
  const data= document.getElementById("data").value;
  const cramersv = await calculator_backend.get_trait_cramersv(canisterId == "" ? data : canisterId);
  cramersv.json()
  .then(res=>{
    let result = "<table>";
    res.map((row, row_index)=>{
      result += "<tr>"
      row.map((col, col_index) =>{
        result += `<td>${res[col_index][row_index]}</td>`  
      })
      result += `</tr>`  
    })
    result += `</table>`  
    document.getElementById("result").innerHTML = result
  })
  .catch(err=>{
    document.getElementById("result").innerText = "Error : Can't fetch canister Data or canister doesn't contain valid data";
  })
});