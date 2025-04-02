async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const list = document.getElementById('items-list');
    list.innerHTML = '';

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        // Botão para remover o item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => deleteItem(index)); // Passa o índice correto

        li.appendChild(removeButton);
        list.appendChild(li);
    });
}


async function addItem(event) {
    event.preventDefault();
    const newItem = document.getElementById('new-item').value;

    const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: newItem })
    });

    if (response.ok) {
        document.getElementById('new-item').value = '';
        fetchItems();
    }
}

async function deleteItem(index) {
    const response = await fetch(`/api/items/${index}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchItems(); // Atualiza a lista após a remoção
    } else {
        console.error('Erro ao remover o item');
    }
}

document.getElementById('add-item-form').addEventListener('submit', addItem);
fetchItems(); // Carrega a lista inicial
