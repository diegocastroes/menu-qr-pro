// DATOS BASE
let menu = JSON.parse(localStorage.getItem('menuRestaurante')) || [
    {id: 1, nombre: '🥤 Coca Cola', precio: 2.50, img: 'https://images.unsplash.com/photo-1572497925045-4613cf472a7f?w=200', desc: '500ml helada', cat: 'bebidas'},
    {id: 2, nombre: '🍊 Jugo Natural', precio: 3.00, img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200', desc: 'Naranja, limón o piña', cat: 'bebidas'},
    {id: 3, nombre: '🍔 Hamburguesa Clásica', precio: 12.00, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', desc: 'Carne 200g, cheddar, lechuga, tomate', cat: 'platos'},
    {id: 4, nombre: '🍕 Pizza Margherita', precio: 15.00, img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200', desc: '12\", mozzarella fresca, albahaca', cat: 'platos'},
    {id: 5, nombre: '🍝 Pasta Alfredo', precio: 13.00, img: 'https://images.unsplash.com/photo-1645112411341-6c4ee32510d8?w=200', desc: 'Fettuccine con crema y parmesano', cat: 'platos'},
    {id: 6, nombre: '🍰 Tiramisú', precio: 5.00, img: 'https://images.unsplash.com/photo-1571115764595-644a12c7aab1?w=200', desc: 'Casero con espresso y cacao', cat: 'postres'},
    {id: 7, nombre: '🍓 Cheesecake', precio: 5.50, img: 'https://images.unsplash.com/photo-1533134242443-742ae1b8bd6f?w=200', desc: 'Con frutos rojos frescos', cat: 'postres'}
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// MOSTRAR MENU
function renderMenu() {
    ['bebidas', 'platos', 'postres'].forEach(cat => {
        let html = menu.filter(p => p.cat === cat).map(p => `
            <div class="plato">
                <img src="${p.img}" alt="${p.nombre}" class="plato-img" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200'">
                <div class="plato-info">
                    <div class="plato-nombre">${p.nombre}</div>
                    <div class="plato-desc">${p.desc}</div>
                    <div class="plato-footer">
                        <div class="plato-precio">$${p.precio.toFixed(2)}</div>
                        <button class="btn-agregar" onclick="agregarAlCarrito(${p.id})">Agregar</button>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('grid-' + cat).innerHTML = html;
    });
    document.getElementById('total-platos').textContent = menu.length;
    renderListaAdmin();
}

// AGREGAR AL CARRITO
function agregarAlCarrito(id) {
    let plato = menu.find(p => p.id === id);
    let item = carrito.find(c => c.id === id);
    
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({...plato, cantidad: 1});
    }
    
    guardarCarrito();
    actualizarBadgeCarrito();
    mostrarNotificacion('✅ Agregado al carrito');
}

// MOSTRAR NOTIFICACION
function mostrarNotificacion(msg) {
    alert(msg);
}

// ACTUALIZAR BADGE
function actualizarBadgeCarrito() {
    let cantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cantidad-carrito').textContent = cantidad;
}

// GUARDAR CARRITO
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// ABRIR CARRITO
function abrirCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    let html = carrito.map(item => `
        <div class="carrito-item">
            <div>
                <div class="carrito-item-nombre">${item.nombre}</div>
                <small>Cantidad: ${item.cantidad}</small>
            </div>
            <div class="carrito-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
        </div>
    `).join('');
    
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    document.getElementById('contenido-carrito').innerHTML = html;
    document.getElementById('total-carrito').textContent = total.toFixed(2);
    document.getElementById('modalCarrito').style.display = 'block';
}

// CERRAR CARRITO
function cerrarCarrito() {
    document.getElementById('modalCarrito').style.display = 'none';
}

// REALIZAR PEDIDO POR WHATSAPP
function realizarPedido() {
    let mensaje = 'Hola, quiero hacer un pedido:\n\n';
    carrito.forEach(item => {
        mensaje += `${item.nombre} x${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mensaje += `\n*TOTAL: $${total.toFixed(2)}*`;
    
    let url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// ADMIN - AGREGAR PLATO
function agregarPlato() {
    let nombre = document.getElementById('nombre').value.trim();
    let precio = parseFloat(document.getElementById('precio').value);
    let img = document.getElementById('img').value.trim();
    let desc = document.getElementById('desc').value.trim();
    let cat = document.getElementById('categoria').value;

    if (!nombre || isNaN(precio) || !desc) {
        alert('⚠️ Llena todos los campos');
        return;
    }

    menu.push({
        id: Date.now(),
        nombre,
        precio,
        img: img || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200',
        desc,
        cat
    });

    guardarMenu();
    renderMenu();
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('img').value = '';
    document.getElementById('desc').value = '';
    alert('✅ Plato agregado');
}

// ADMIN - ELIMINAR PLATO
function eliminarPlato(id) {
    if (confirm('¿Eliminar este plato?')) {
        menu = menu.filter(p => p.id !== id);
        guardarMenu();
        renderMenu();
    }
}

// GUARDAR MENU
function guardarMenu() {
    localStorage.setItem('menuRestaurante', JSON.stringify(menu));
}

// ADMIN - RENDER LISTA
function renderListaAdmin() {
    let html = menu.map(p => `
        <div class="plato-item">
            <span><strong>${p.nombre}</strong> - $${p.precio.toFixed(2)}</span>
            <button onclick="eliminarPlato(${p.id})">🗑️ Eliminar</button>
        </div>
    `).join('');
    document.getElementById('listaPlatos').innerHTML = html;
}

// MOSTRAR CATEGORIA
function mostrarCategoria(cat) {
    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
    document.getElementById(cat).classList.add('active');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

// TOGGLE ADMIN
function toggleAdmin() {
    let panel = document.getElementById('adminPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// CERRAR MODAL CLICK FUERA
window.onclick = function(event) {
    let modal = document.getElementById('modalCarrito');
    if (event.target === modal) {
        cerrarCarrito();
    }
}

// INICIALIZAR
renderMenu();
actualizarBadgeCarrito();
