// Clase Cuenta que representa una cuenta bancaria
class Cuenta {
    // Constructor que acepta solo el titular (cantidad por defecto 0)
    constructor(titular, cantidad = 0) {
        if (!titular) {
            throw new Error('El titular es obligatorio.');
        }
        this._titular = titular;
        this._cantidad = cantidad;
    }

    // Getter y Setter para el titular
    get titular() {
        return this._titular;
    }

    set titular(nuevoTitular) {
        if (!nuevoTitular) {
            throw new Error('El titular no puede ser vacío.');
        }
        this._titular = nuevoTitular;
    }

    // Getter para la cantidad
    get cantidad() {
        return this._cantidad;
    }

    // Método para mostrar la información de la cuendta
    toString() {
        return `Titular: ${this._titular}, Cantidad: ${this._cantidad.toFixed(2)} €`;
    }

    // Método para ingresar dinero en la cuenta
    ingresar(cantidad) {
        if (cantidad > 0) {
            this._cantidad += cantidad;
        } else {
            alert('No se puede ingresar una cantidad negativa.');
        }
    }

    // Método para retirar dinero sin permitir saldo negativo
    retirar(cantidad) {
        if (cantidad > 0) {
            this._cantidad -= cantidad;
            if (this._cantidad < 0) {
                this._cantidad = 0; // Si la cantidad resulta negativa, se establece en 0
            }
        } else {
            alert('No se puede retirar una cantidad negativa.');
        }
    }
}

// Variables del DOM
const formCuenta = document.getElementById('formCuenta');
const cuentaInfo = document.getElementById('cuentaInfo');
let cuenta = null;

// Función para crear una nueva cuenta
function crearCuenta(titular, cantidad) {
    if (!titular || isNaN(cantidad) || cantidad < 0) {
        alert('Por favor, ingresa un titular válido y una cantidad positiva.');
        return;
    }
    cuenta = new Cuenta(titular, cantidad);
    actualizarInfoCuenta();
}

// Función para actualizar la información de la cuenta en la pantalla
function actualizarInfoCuenta() {
    if (cuenta) {
        cuentaInfo.textContent = cuenta.toString();
    }
}

// Controlador para el formulario de crear cuenta
formCuenta.addEventListener('submit', function(e) {
    e.preventDefault();
    const titular = document.getElementById('titular').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
    crearCuenta(titular, cantidad);
});

// Función para ingresar dinero en la cuenta
function ingresarDinero(cantidad) {
    if (cuenta && cantidad > 0) {
        cuenta.ingresar(cantidad);
        actualizarInfoCuenta();
    } else {
        alert('Por favor, crea una cuenta primero o ingresa una cantidad válida.');
    }
}

// Función para retirar dinero de la cuenta
function retirarDinero(cantidad) {
    if (cuenta && cantidad > 0) {
        cuenta.retirar(cantidad);
        actualizarInfoCuenta();
    } else {
        alert('Por favor, crea una cuenta primero o ingresa una cantidad válida.');
    }
}

// Event listeners para botones de ingresar y retirar
document.getElementById('ingresarDinero').addEventListener('click', function() {
    const cantidadIngresar = parseFloat(prompt('Introduce la cantidad a ingresar:'));
    ingresarDinero(cantidadIngresar);
});

document.getElementById('retirarDinero').addEventListener('click', function() {
    const cantidadRetirar = parseFloat(prompt('Introduce la cantidad a retirar:'));
    retirarDinero(cantidadRetirar);
});
