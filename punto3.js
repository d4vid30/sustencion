// Clase Password que gestiona la generación de contraseñas
class Password {
    static CARACTERES_PERMITIDOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Constructor por defecto con longitud predeterminada de 8 caracteres
    constructor(longitud = 8) {
        this._longitud = longitud;
        this._contraseña = this.generarPassword();
    }

    // Método para generar una contraseña aleatoria según la longitud del objeto
    generarPassword() {
        let password = '';
        for (let i = 0; i < this._longitud; i++) {
            const randomIndex = Math.floor(Math.random() * Password.CARACTERES_PERMITIDOS.length);
            password += Password.CARACTERES_PERMITIDOS[randomIndex];
        }
        this._contraseña = password;
        return password;
    }

    // Método para comprobar si la contraseña es fuerte
    esFuerte() {
        let mayusculas = 0;
        let minusculas = 0;
        let numeros = 0; 

        for (const char of this._contraseña) {
            if (char >= 'A' && char <= 'Z') {
                mayusculas++;
            } else if (char >= 'a' && char <= 'z') {
                minusculas++;
            } else if (char >= '0' && char <= '9') {
                numeros++;
            }
        }

        // Condiciones para que una contraseña sea considerada fuerte
        return mayusculas > 2 && minusculas > 1 && numeros > 5;
    }

    // Método getter para la contraseña
    getContraseña() {
        return this._contraseña;
    }

    // Método getter para la longitud
    getLongitud() {
        return this._longitud;
    }

    // Método setter para la longitud que regenera la contraseña
    setLongitud(longitud) {
        if (longitud > 0) {
            this._longitud = longitud;
            this.generarPassword(); // Generar nueva contraseña con la nueva longitud
        } else {
            throw new Error('La longitud debe ser mayor que 0');
        }
    }
}

// Manejo del DOM y la lógica de ejecución
document.getElementById('formPassword').addEventListener('submit', function (e) {
    e.preventDefault();

    const tamañoArray = parseInt(document.getElementById('tamañoArray').value);
    const longitud = parseInt(document.getElementById('longitud').value);

    if (isNaN(tamañoArray) || isNaN(longitud) || tamañoArray <= 0 || longitud <= 0) {
        alert('Por favor, ingrese valores válidos para el tamaño del array y la longitud de la contraseña.');
        return;
    }

    const passwords = new Array(tamañoArray);
    const fuertes = new Array(tamañoArray);

    for (let i = 0; i < tamañoArray; i++) {
        passwords[i] = new Password(longitud); // Crear un objeto Password para cada posición
        fuertes[i] = passwords[i].esFuerte(); // Verificar si la contraseña es fuerte
    }

    // Mostrar los resultados en la página
    const passwordResults = document.getElementById('passwordResults');
    passwordResults.textContent = ''; // Limpiar los resultados anteriores

    for (let i = 0; i < tamañoArray; i++) {
        passwordResults.textContent += `Contraseña: ${passwords[i].getContraseña()} - Fuerte: ${fuertes[i]}\n`;
    }
});
