// Clase Entregable para manejar la lógica de entrega y devolución
class Entregable {
    entregar() {
        throw new Error("Método entregar no implementado.");
    }

    devolver() {
        throw new Error("Método devolver no implementado.");
    }

    isEntregado() {
        throw new Error("Método isEntregado no implementado.");
    }

    compareTo(a) {
        throw new Error("Método compareTo no implementado.");
    }
}

// Clase Videojuego que hereda de Entregable
class Videojuego extends Entregable {
    static HORAS_ESTIMADAS_DEFECTO = 10;
    static ENTREGADO_DEFECTO = false;

    /**
     * Constructor por defecto, con valores predeterminados.
     * @param {string} titulo - Título del videojuego.
     * @param {number} horasEstimadas - Horas estimadas de juego (por defecto 10).
     * @param {string} genero - Género del videojuego.
     * @param {string} compania - Compañía que desarrolla el videojuego.
     */
    constructor(titulo = "", horasEstimadas = Videojuego.HORAS_ESTIMADAS_DEFECTO, genero = "", compania = "") {
        super();
        this._titulo = titulo;
        this._horasEstimadas = horasEstimadas;
        this._entregado = Videojuego.ENTREGADO_DEFECTO;
        this._genero = genero;
        this._compania = compania;
    }

    // Métodos getter
    getTitulo() {
        return this._titulo;
    }

    getHorasEstimadas() {
        return this._horasEstimadas;
    }

    getGenero() {
        return this._genero;
    }

    getCompania() {
        return this._compania;
    }

    // Métodos setter
    setTitulo(titulo) {
        this._titulo = titulo;
    }

    setHorasEstimadas(horasEstimadas) {
        if (horasEstimadas > 0) {
            this._horasEstimadas = horasEstimadas;
        } else {
            console.error("Las horas estimadas deben ser mayores a 0.");
        }
    }

    setGenero(genero) {
        this._genero = genero;
    }

    setCompania(compania) {
        this._compania = compania;
    }

    // Implementación de los métodos de la clase Entregable
    entregar() {
        this._entregado = true;
    }

    devolver() {
        this._entregado = false;
    }

    isEntregado() {
        return this._entregado;
    }

    /**
     * Método para comparar dos videojuegos por las horas estimadas.
     * @param {Videojuego} a - Otro objeto Videojuego.
     * @returns {number} Diferencia de horas entre los dos videojuegos.
     */
    compareTo(a) {
        return this._horasEstimadas - a.getHorasEstimadas();
    }

    // Sobrescribe el método toString para mostrar la información del videojuego.
    toString() {
        return `Videojuego: ${this._titulo}, Horas estimadas: ${this._horasEstimadas}, Género: ${this._genero}, Compañía: ${this._compania}, Entregado: ${this._entregado}`;
    }
}

// Manejador del evento del formulario para crear un nuevo videojuego
document.getElementById('formVideojuego').addEventListener('submit', function (e) {
    e.preventDefault();

    // Recoger los valores del formulario
    const titulo = document.getElementById('tituloVideojuego').value;
    const horasEstimadas = parseInt(document.getElementById('horasEstimadas').value) || Videojuego.HORAS_ESTIMADAS_DEFECTO;
    const genero = document.getElementById('generoVideojuego').value;
    const compania = document.getElementById('compania').value;

    // Crear una nueva instancia de Videojuego con los valores introducidos
    const videojuego = new Videojuego(titulo, horasEstimadas, genero, compania);

    // Mostrar la información del videojuego
    const videojuegoInfo = document.getElementById('videojuegoInfo');
    videojuegoInfo.textContent = videojuego.toString();
});
