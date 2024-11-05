class Persona {
    // Constantes para los valores del IMC y sexo por defecto
    static IMC_BAJO_PESO = -1;
    static IMC_PESO_IDEAL = 0;
    static IMC_SOBREPESO = 1;
    static SEXO_POR_DEFECTO = 'H';

    /**
     * Constructor por defecto, todos los valores inicializados por defecto
     */
    constructor(nombre = '', edad = 0, sexo = Persona.SEXO_POR_DEFECTO, peso = 0, altura = 0) {
        this._nombre = nombre;
        this._edad = edad;
        this._dni = this.#generaDNI();
        this._sexo = this.#comprobarSexo(sexo);
        this._peso = peso;
        this._altura = altura;
    }

    /**
     * Constructor con nombre, edad y sexo, el resto por defecto.
     */
    static fromNombreEdadSexo(nombre, edad, sexo) {
        return new Persona(nombre, edad, sexo);
    }

    /**
     * Método para calcular el IMC de la persona.
     * @returns {number} -1 si está por debajo de su peso ideal, 0 si está en el peso ideal, 1 si tiene sobrepeso.
     */
    calcularIMC() {
        const imc = this._peso / (this._altura * this._altura);
        if (imc < 20) {
            return Persona.IMC_BAJO_PESO;
        } else if (imc >= 20 && imc <= 25) {
            return Persona.IMC_PESO_IDEAL;
        } else {
            return Persona.IMC_SOBREPESO;
        }
    }

    /**
     * Método para verificar si es mayor de edad.
     * @returns {boolean} True si es mayor de 18, False si no.
     */
    esMayorDeEdad() {
        return this._edad >= 18;
    }

    /**
     * Comprueba el sexo, si no es válido, devuelve el sexo por defecto.
     * @param {string} sexo 
     * @returns {string} 'H' o 'M'
     */
    #comprobarSexo(sexo) {
        return (sexo === 'H' || sexo === 'M') ? sexo : Persona.SEXO_POR_DEFECTO;
    }

    /**
     * Método privado para generar un DNI aleatorio y su correspondiente letra.
     * @returns {string} El DNI generado.
     */
    #generaDNI() {
        const numero = Math.floor(Math.random() * 100000000); // Genera un número de 8 dígitos
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const letra = letras[numero % 23];
        return `${numero}${letra}`;
    }

    /**
     * Devuelve la información completa de la persona.
     * @returns {string} Información de la persona.
     */
    toString() {
        return `Nombre: ${this._nombre}, Edad: ${this._edad}, DNI: ${this._dni}, Sexo: ${this._sexo}, Peso: ${this._peso} kg, Altura: ${this._altura} m`;
    }

    // Métodos getter y setter para cada atributo, excepto para el DNI
    get nombre() {
        return this._nombre;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get edad() {
        return this._edad;
    }

    set edad(edad) {
        this._edad = edad;
    }

    get sexo() {
        return this._sexo;
    }

    set sexo(sexo) {
        this._sexo = this.#comprobarSexo(sexo);
    }

    get peso() {
        return this._peso;
    }

    set peso(peso) {
        this._peso = peso;
    }

    get altura() {
        return this._altura;
    }

    set altura(altura) {
        this._altura = altura;
    }
}

// Clase Ejecutable para manejar las operaciones
class Ejecutable {
    /**
     * Muestra el estado de la persona, incluyendo su IMC y si es mayor de edad.
     * @param {Persona} persona 
     * @returns {string} Estado completo de la persona.
     */
    static mostrarEstadoPersona(persona) {
        const imcResultado = persona.calcularIMC();
        let imcMensaje;
        if (imcResultado === Persona.IMC_BAJO_PESO) {
            imcMensaje = "está por debajo de su peso ideal.";
        } else if (imcResultado === Persona.IMC_PESO_IDEAL) {
            imcMensaje = "está en su peso ideal.";
        } else {
            imcMensaje = "tiene sobrepeso.";
        }

        const esMayorMensaje = persona.esMayorDeEdad() ? "Es mayor de edad." : "No es mayor de edad.";

        return `${persona.toString()} - IMC: ${imcMensaje}. ${esMayorMensaje}.`;
    }
}

// Evento para manejar el formulario y crear objetos de la clase Persona
document.getElementById('formPersona').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Crear una persona con los datos proporcionados
    const persona = new Persona(nombre, edad, sexo, peso, altura);

    // Mostrar la información de la persona y su estado
    const personaInfo = document.getElementById('personaInfo');
    personaInfo.textContent = Ejecutable.mostrarEstadoPersona(persona);
});
