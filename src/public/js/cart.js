const showProducts = async () => {
    const productList = document.getElementById('productList');

    productList.innerHTML = '';
    const response = await fetch('/productos');

    const producto = await response.json();
    console.log(producto)


    producto.products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <br>----------------------------------------</br>
                <strong>ID:</strong> ${product._id}<br>
                <strong>Title:</strong> ${product.title}<br>
                <strong>Precio:</strong> $${product.price}<br>
                <strong>Description:</strong> ${product.description}<br>
                <strong>Code:</strong> ${product.code}<br>
                <strong>Status:</strong> ${product.status}<br>
                <strong>Stock:</strong> ${product.stock}<br>
                <strong>Category:</strong> ${product.category}<br>
                <strong>Thumbnails:</strong> ${product.thumbnails}<br>
                <br>
                <form class="addToCartForm">
                    <button type="submit" data-product="${product._id}">Agregar al Carrito</button><br>
                </form>
            `;
        productList.appendChild(listItem);
    });


};

document.addEventListener('DOMContentLoaded', () => {

    showProducts();
    setupAddToCartButtons();
});


const setupAddToCartButtons = () => {

    console.log('el cartId tiene el valor:', cartId)
    const addToCartForms = document.querySelectorAll('.addToCartForm');
    addToCartForms.forEach(addToCartForm => {
        addToCartForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const productId = event.target.querySelector('button').getAttribute('data-product');
            if (productId) {
                try {

                    const url = `/carts/${cartId}/product/${productId}`;


                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ productId, cartId }),
                    });

                    if (response.ok) {
                        console.log('Producto agregado al carrito:', productId);

                    } else {
                        console.log('Error al agregar el producto al carrito.');
                    }
                } catch (error) {
                    console.error('Error al agregar el producto al carrito:', error);
                }
            } else {
                console.log('Error: No se pudo obtener el ID del producto.');
            }
        });
    });
};
