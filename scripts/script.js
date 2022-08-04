const products = JSON.parse(localStorage.getItem('products')) || [];

const results = document.getElementById('results');
const searchInput = document.getElementById('searchInput');
const search = document
  .getElementById('search')
  .addEventListener('click', () => showResults());

const newId = document.getElementById('id');
const newName = document.getElementById('name');
const newPrice = document.getElementById('price');
const newArticleModalMessage = document.getElementById('newArticleModalMessage');
const newArticleButton = document
  .getElementById('newArticleButton')
  .addEventListener('click', () => newArticle());

const noResults = document.createElement('article');
noResults.className = 'text-center text-white p-2 my-2';
noResults.innerHTML = `<h2>No results ...</h2>`;

const noProducts = document.createElement('article');
noProducts.className = 'text-center text-white p-2 my-2';
noProducts.innerHTML = `<h2>No products in database ...</h2>`;

const showResults = () => {
  results.innerHTML = '';
  const input = searchInput.value;
  const filteredProducts = products.filter(product =>
    product.name.toUpperCase().includes(input.toUpperCase())
  );

  filteredProducts.forEach(filteredProduct => {
    const article = document.createElement('article');
    article.className = 'p-2 my-2 border rounded bg-white';
    article.innerHTML = `<div class="d-flex justify-content-between align-items-center">
  		<div>#${filteredProduct.id} ${filteredProduct.name} ($${filteredProduct.price})</div>
  		<div>
  			<button type="button" class="btn btn-warning rounded-0">
  				<i class="fa-solid fa-pen text-white"></i>
  			</button>
  			<button type="button" class="btn btn-danger rounded-0" onclick="delArticle(${filteredProduct.id})">
  				<i class="fa-solid fa-trash-can text-white"></i>
  			</button>
  		</div>
  	</div>`;
    results.appendChild(article);
  });
  // }
};

const newArticle = () => {
  const product = { id: newId.value, name: newName.value, price: newPrice.value };

  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  showResults();
  newArticleModalMessage.innerText = 'Agregado exitosamente';
};

const delArticle = i => {
  console.log(i);
  const index = products.indexOf(i);
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  showResults();
};

showResults();
