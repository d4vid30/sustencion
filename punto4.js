class Serie {
    // Constantes para los valores por defecto
    static TEMPORADAS_DEFECTO = 3;
    static ENTREGADO_DEFECTO = false;

    /**
     * Constructor por defecto.
     * @param {string} titulo - Título de la serie.
     * @param {number} numeroTemporadas - Número de temporadas (por defecto 3).
     * @param {boolean} entregado - Si la serie está entregada o no (por defecto false).
     * @param {string} genero - Género de la serie.
     * @param {string} creador - Creador de la serie.
     */
    constructor(titulo = "", numeroTemporadas = Serie.TEMPORADAS_DEFECTO, entregado = Serie.ENTREGADO_DEFECTO, genero = "", creador = "") {
        this._titulo = titulo;
        this._numeroTemporadas = numeroTemporadas;
        this._entregado = entregado;
        this._genero = genero;
        this._creador = creador;
    }

    /**
     * Constructor estático con título y creador, el resto de valores por defecto.
     * @param {string} titulo - Título de la serie.
     * @param {string} creador - Creador de la serie.
     * @returns {Serie} Nueva instancia de Serie.
     */
    static conTituloYCreador(titulo, creador) {
        return new Serie(titulo, Serie.TEMPORADAS_DEFECTO, Serie.ENTREGADO_DEFECTO, "", creador);
    }

    /**
     * Constructor estático con todos los atributos, excepto entregado.
     * @param {string} titulo - Título de la serie.
     * @param {number} numeroTemporadas - Número de temporadas.
     * @param {string} genero - Género de la serie.
     * @param {string} creador - Creador de la serie.
     * @returns {Serie} Nueva instancia de Serie.
     */
    static conTodosMenosEntregado(titulo, numeroTemporadas, genero, creador) {
        return new Serie(titulo, numeroTemporadas, Serie.ENTREGADO_DEFECTO, genero, creador);
    }

    // Métodos getter
    getTitulo() {
        return this._titulo;
    }

    getNumeroTemporadas() {
        return this._numeroTemporadas;
    }

    getGenero() {
        return this._genero;
    }

    getCreador() {
        return this._creador;
    }

    // Métodos setter
    setTitulo(titulo) {
        this._titulo = titulo;
    }

    setNumeroTemporadas(numeroTemporadas) {
        if (numeroTemporadas > 0) {
            this._numeroTemporadas = numeroTemporadas;
        } else {
            console.error('El número de temporadas debe ser mayor a 0.');
        }
    }

    setGenero(genero) {
        this._genero = genero;
    }

    setCreador(creador) {
        this._creador = creador;
    }

    // Sobrescribe el método toString para mostrar toda la información de la serie.
    toString() {
        return `Serie: ${this._titulo}, Temporadas: ${this._numeroTemporadas}, Género: ${this._genero}, Creador: ${this._creador}, Entregado: ${this._entregado}`;
    }
}

// Manejador del evento del formulario para crear una nueva serie
document.getElementById('formSerie').addEventListener('submit', function(e) {
    e.preventDefault();

    // Recoger los valores del formulario
    const titulo = document.getElementById('titulo').value;
    const numeroTemporadas = parseInt(document.getElementById('numeroTemporadas').value, 10) || Serie.TEMPORADAS_DEFECTO;
    const genero = document.getElementById('genero').value;
    const creador = document.getElementById('creador').value;

    // Crear una nueva instancia de Serie con los valores introducidos
    const serie = new Serie(titulo, numeroTemporadas, false, genero, creador);

    // Mostrar la información de la serie
    const serieInfo = document.getElementById('serieInfo');
    serieInfo.textContent = serie.toString();
});
