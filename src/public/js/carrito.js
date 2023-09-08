const showCarts = async () => {
    const cartsList = document.getElementById('cartsList');
    cartsList.innerHTML = '';

    const urlActual = window.location.href;
    const partesURL = urlActual.split('/');
    const cartId = partesURL[partesURL.length - 1];
    
    console.log('Valor deseado:', cartId);
    try {
        const response = await fetch(`/views/carritos/${cartId}`);
        console.log(response);        
        const cart = await response.toString();
        const id = cart._ids
        console.log('hola',id);
        cart.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <br>----------------------------------------</br>
                <strong>ID:</strong> ${product.product._id}<br>
                <strong>Título:</strong> ${product.product.title}<br>
                <strong>Precio:</strong> $${product.product.price}<br>
                <strong>Cantidad:</strong> ${product.quantity}<br>
            `;
            cartsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
    }
}

showCarts();
