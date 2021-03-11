async function displayList() {
  const response = await fetch('./list.json');
  list = await response.json(); 
  renderList(list)
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
}