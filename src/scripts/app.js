
const square1 = document.getElementById('cuadro-1');
const square2 = document.getElementById('cuadro-2');
const square3 = document.getElementById('cuadro-3');
const square4 = document.getElementById('cuadro-4');
const square5 = document.getElementById('cuadro-5');
const square6 = document.getElementById('cuadro-6');
const square7 = document.getElementById('cuadro-7');
const square8 = document.getElementById('cuadro-8');
const square9 = document.getElementById('cuadro-9');
const square10 = document.getElementById('cuadro-10');
const square11 = document.getElementById('cuadro-11');
const square12 = document.getElementById('cuadro-12');
const puntaje = document.getElementById('score');
const intento = document.getElementById('intentos');
const btn = document.getElementById('btnEmpezar');

var PUNTAJE = 0;
var INTENTOS = 3;


class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    // this.generarSerieAleatoria()
    this.comprobar();
    this.afterStart();
    this.agregarEventosClick();
  }

  inicializar() {
    // atamos this a este contexto
    PUNTAJE = 0;
    INTENTOS = 3;
    this.addStyle = this.addStyle.bind(this);
    this.valor_encontrado = [];
    this.eventos = {
      square1,
      square2,
      square3,
      square4,
      square5,
      square6,
      square7,
      square8,
      square9,
      square10,
      square11,
      square12,
      puntaje,
      intento
    };
    this.reiniciar();
    // this.agregarEventosClick()

  }

  afterStart() {
    if (btn.classList.contains('btn-animateIn')) {
      btn.classList.remove('btn-animateIn');
      btn.classList.add('btn-animateOut');
    }
    else {
      btn.classList.add('btn-animateOut');
    }

  }

  reiniciar() {
    // Reinicio la puntuacion
    this.eventos.puntaje.innerHTML = 0;
    // Reinicio los intentos
    this.eventos.intento.innerHTML = 3;
    // Vuelvo a pintar los cuadros
    square1.style.background = '#c54343';
    square2.style.background = '#c54343';
    square3.style.background = '#c54343';
    square4.style.background = '#c54343';
    square5.style.background = '#c54343';
    square6.style.background = '#c54343';
    square7.style.background = '#c54343';
    square8.style.background = '#c54343';
    square9.style.background = '#c54343';
    square10.style.background = '#c54343';
    square11.style.background = '#c54343';
    square12.style.background = '#c54343';
    // Reaparece el boton
    if (btn.classList.contains('btn-animateOut')) {
      btn.classList.remove('btn-animateOut');
      btn.classList.add('btn-animateIn');
    }
    // btn.classList.remove('btn-animateOut')
  }

  agregarEventosClick() {
    this.eventos.square1.addEventListener('click', this.addStyle);
    this.eventos.square2.addEventListener('click', this.addStyle);
    this.eventos.square3.addEventListener('click', this.addStyle);
    this.eventos.square4.addEventListener('click', this.addStyle);
    this.eventos.square5.addEventListener('click', this.addStyle);
    this.eventos.square6.addEventListener('click', this.addStyle);
    this.eventos.square7.addEventListener('click', this.addStyle);
    this.eventos.square8.addEventListener('click', this.addStyle);
    this.eventos.square9.addEventListener('click', this.addStyle);
  }

  eliminarEventosClick() {
    this.eventos.square1.removeEventListener('click', this.addStyle);
    this.eventos.square2.removeEventListener('click', this.addStyle);
    this.eventos.square3.removeEventListener('click', this.addStyle);
    this.eventos.square4.removeEventListener('click', this.addStyle);
    this.eventos.square5.removeEventListener('click', this.addStyle);
    this.eventos.square6.removeEventListener('click', this.addStyle);
    this.eventos.square7.removeEventListener('click', this.addStyle);
    this.eventos.square8.removeEventListener('click', this.addStyle);
    this.eventos.square9.removeEventListener('click', this.addStyle);
  }

  aleatoria() {
    let x;
    let vector = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < 9; i++) {
      x = Math.floor(Math.random() * 9);
    }
    return vector[x];
  }


  addStyle(ev) {
    if (ev.target.id === 'cuadro-1') {
      square1.style.background = 'white';
      let n = this.aleatoria();
      square1.innerHTML = n;
      this.valor_encontrado.push(n);
      // Removemos el manjeador de eventos
      square1.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-2') {
      square2.style.background = 'white';
      let n = this.aleatoria();
      square2.innerHTML = n;
      this.valor_encontrado.push(n);
      square2.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-3') {
      square3.style.background = 'white';
      let n = this.aleatoria();
      square3.innerHTML = n;
      this.valor_encontrado.push(n);
      square3.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-4') {
      square4.style.background = 'white';
      let n = this.aleatoria();
      square4.innerHTML = n;
      this.valor_encontrado.push(n);
      square4.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-5') {
      square5.style.background = 'white';
      let n = this.aleatoria();
      square5.innerHTML = n;
      this.valor_encontrado.push(n);
      square5.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-6') {
      square6.style.background = 'white';
      let n = this.aleatoria();
      square6.innerHTML = n;
      this.valor_encontrado.push(n);
      square6.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-7') {
      square7.style.background = 'white';
      let n = this.aleatoria();
      square7.innerHTML = n;
      this.valor_encontrado.push(n);
      square7.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-8') {
      square8.style.background = 'white';
      let n = this.aleatoria();
      square8.innerHTML = n;
      this.valor_encontrado.push(n);
      square8.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
    else if (ev.target.id === 'cuadro-9') {
      square9.style.background = 'white';
      let n = this.aleatoria();
      square9.innerHTML = n;
      this.valor_encontrado.push(n);
      square9.removeEventListener('click', this.addStyle);
      this.comprobar();
    }
  }

  comprobar() {
    if (this.valor_encontrado[0] && this.valor_encontrado[1]) {
      // si son iguales llamo a score
      if (this.valor_encontrado[0] === this.valor_encontrado[1]) {
        this.score();
      }
      else {
        this.valor_encontrado = [];
        this.intentos();
      }
    }
  }

  score() {
    PUNTAJE = PUNTAJE + 1;
    // console.log(PUNTAJE)
    this.eventos.puntaje.innerHTML = PUNTAJE;
    // let puntaje = Number(pto) + 1
    //limpio el array de control
    this.valor_encontrado = [];
    if (PUNTAJE === 2) {
      this.ganoElJuego();
    }

  }

  intentos() {
    INTENTOS = INTENTOS - 1;
    this.eventos.intento.innerHTML = INTENTOS;
    //verifico nuevamente si se hace cero
    if (INTENTOS === 0) {
      this.perdioElJuego();
    }
  }

  ganoElJuego() {
    //swal devuelve una Promesa
    swal('Felicidades Ganaste!!! :)', 'success')
      .then(() => {
        this.eliminarEventosClick();
        this.inicializar();
      });
  }

  perdioElJuego() {
    //swal devuelve una Promesa
    swal('Lo lamentamos, te quedaste sin intentos :(', 'error')
      .then(() => {
        this.eliminarEventosClick();
        this.inicializar();
      });
  }



  // termina la clase Juego
}

// Aqui empieza el viaje :)
function empezarJuego() {
  juego = new Juego();
}