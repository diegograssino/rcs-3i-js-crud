// Inicializo la lista de productos
const products =
  JSON.parse(localStorage.getItem('products')) ||
  [];

// Selecciono los elementos HTML

const newArticleButton = document
  .getElementById('newArticleButton')
  .addEventListener('click', () => newArticle());

const newArticleId =
  document.getElementById('id');
const newArticleName =
  document.getElementById('name');
const newArticlePrice =
  document.getElementById('price');
const newArticleModalMessage =
  document.getElementById(
    'newArticleModalMessage'
  );

const results =
  document.getElementById('results');

const search = document.getElementById(
  'searchInput'
);

const searchButton = document
  .getElementById('search')
  .addEventListener('click', () =>
    updateResults()
  );

// Programo la lógica necesaria
const newArticle = () => {
  const product = {
    id: newArticleId.value,
    name: newArticleName.value,
    price: newArticlePrice.value,
  };
  products.push(product);
  localStorage.setItem(
    'products',
    JSON.stringify(products)
  );
  newArticleId.value = '';
  newArticleName.value = '';
  newArticlePrice.value = '';

  newArticleModalMessage.innerHTML = 'Added!';

  updateResults();
};

const updateResults = () => {
  results.innerHTML = '';
  const input = search.value;
  console.log(input);

  const filtered = products.filter(p =>
    p.name
      .toUpperCase()
      .includes(input.toUpperCase())
  );

  // Recorro el array de productos para inyectar codigo HTML tantas veces como productos contenga
  filtered.forEach(p => {
    // Creo un elemento que va a ser el que inserte al elemento padre que ya seleccione
    const card =
      document.createElement('article');
    card.className =
      'border border-1 bg-white p-2 mt-2';

    card.innerHTML = `<div class="d-flex justify-content-between align-items-center">
    <div>#${p.id} ${p.name} ($${p.price})</div>
    <div>
      <button
        type="button"
        class="btn btn-warning rounded-0"
      >
        <i class="fa-solid fa-pen text-white"></i>
      </button>
      <button
        type="button"
        class="btn btn-danger rounded-0" onclick="delArticle(${p.id})"
      >
        <i class="fa-solid fa-trash-can text-white"></i>
      </button>
    </div>
  </div>`;
    results.appendChild(card);
  });
};

// Funcion para borrar productos (Sale mal)
const delArticle = idProduct => {
  // console.log(product);
  // const index = products.indexOf(product);
  // console.log(index);
  const index = products[idProduct - 1];
  products.splice(index, 1);
  localStorage.setItem(
    'products',
    JSON.stringify(products)
  );
  updateResults();
};

updateResults();
