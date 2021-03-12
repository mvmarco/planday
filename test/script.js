let imgPerPage = 4;
async function displayList() {
  const response = await fetch('./list.json');
  list = await response.json(); 
  renderList(list.slice(0, imgPerPage));
  generatePagination(list)
}

displayList()


function renderList(list){

  let container = document.querySelector('#list')
  container.innerHTML = ''
  list.forEach(item=>{
    container.innerHTML += `
      <div class="card m-2" style="width: 18rem;">
        <img src="${item.imagePath}" style="height:200px;object-fit:cover" class="card-img-top" alt="${item.description}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    `
  
  })
  if(!list.length){
    container.innerHTML = '<h2> NO results found</h2>'
  }
}
let searchEl = document.querySelector('#search');
function handleInput(e) {
  search(e.target.value)
}
searchEl.addEventListener('input', handleInput)

function search(query){
  let filtered = list.filter(item => item.title.toUpperCase().includes(query.toUpperCase()) || item.description.includes(query.toUpperCase()))
  renderList(filtered)
  generatePagination(filtered)
}

function addTile(){
  let inputs = document.querySelectorAll('#tileInputs input, #tileInputs textarea');
  let newTile = {};
  inputs.forEach(input=>{
    newTile[input.name] = input.value
    input.value = ''
  })
  list.push(newTile)
  renderList(list);
   document.getElementById('close').click()
}

let addBtn = document.querySelector('#add')
addBtn.onclick = addTile

function generatePagination(list){
  let paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML=''
  let pages = ''
  for (let i = 0; i < Math.ceil(list.length / imgPerPage);i++){
    pages+= `
      <li class="page-item"><a class="page-link" id="page-${i}">${i+1}</a></li>
    `
  }

  paginationContainer.innerHTML = pages;

  paginationContainer.querySelectorAll('a').forEach(page=>{
    page.onclick = function(){
      let start = page.id.split('-')[1] * imgPerPage
      renderList(list.slice(start, start+imgPerPage));
    }
  })

}

