// Clase Serie con manejo de errores
class Serie {
    // Constructor por defecto
    constructor(titulo = "", numeroTemporadas = 3, entregado = false, genero = "", creador = "") {
        this.setTitulo(titulo);
        this.setNumeroTemporadas(numeroTemporadas);
        this.entregado = entregado; // Se deja tal cual ya que no se modifica externamente
        this.setGenero(genero);
        this.setCreador(creador);
    }

    // Constructor con solo título y creador, el resto por defecto
    static conTituloYCreador(titulo, creador) {
        return new Serie(titulo, 3, false, "", creador);
    }

    // Constructor con todos los atributos excepto entregado
    static conTodosMenosEntregado(titulo, numeroTemporadas, genero, creador) {
        return new Serie(titulo, numeroTemporadas, false, genero, creador);
    }

    // Getters
    getTitulo() {
        return this.titulo;
    }

    getNumeroTemporadas() {
        return this.numeroTemporadas;
    }

    getGenero() {
        return this.genero;
    }

    getCreador() {
        return this.creador;
    }

    // Setters con manejo de errores
    setTitulo(titulo) {
        if (typeof titulo !== 'string' || titulo.trim() === "") {
            throw new Error("El título debe ser una cadena no vacía.");
        }
        this.titulo = titulo;
    }

    setNumeroTemporadas(numeroTemporadas) {
        if (!Number.isInteger(numeroTemporadas) || numeroTemporadas < 1) {
            throw new Error("El número de temporadas debe ser un entero positivo.");
        }
        this.numeroTemporadas = numeroTemporadas;
    }

    setGenero(genero) {
        if (typeof genero !== 'string') {
            throw new Error("El género debe ser una cadena de texto.");
        }
        this.genero = genero;
    }

    setCreador(creador) {
        if (typeof creador !== 'string' || creador.trim() === "") {
            throw new Error("El creador debe ser una cadena no vacía.");
        }
        this.creador = creador;
    }

    // Sobrescribir método toString
    toString() {
        return `Serie: ${this.titulo}, Temporadas: ${this.numeroTemporadas}, Género: ${this.genero}, Creador: ${this.creador}, Entregado: ${this.entregado}`;
    }
}

// Ejemplos de uso con manejo de errores:

try {
    // 1. Constructor por defecto
    const serie1 = new Serie();
    console.log(serie1.toString()); // Serie: , Temporadas: 3, Género: , Creador: , Entregado: false

    // 2. Constructor con título y creador
    const serie2 = Serie.conTituloYCreador("Breaking Bad", "Vince Gilligan");
    console.log(serie2.toString()); // Serie: Breaking Bad, Temporadas: 3, Género: , Creador: Vince Gilligan, Entregado: false

    // 3. Constructor con todos los atributos excepto entregado
    const serie3 = Serie.conTodosMenosEntregado("Friends", 10, "Comedia", "David Crane");
    console.log(serie3.toString()); // Serie: Friends, Temporadas: 10, Género: Comedia, Creador: David Crane, Entregado: false

    // 4. Intentar crear una serie con un número de temporadas inválido
    const serie4 = new Serie("Test Series", -1, false, "Drama", "Test Creator");
} catch (error) {
    console.error(error.message); // El número de temporadas debe ser un entero positivo.
}
