import { GraficoGann } from "./Resolvedor.js";

class Interfaz{
    constructor(visualizador){
        console.log(visualizador)
        this.visualizador = visualizador
    }

    identificador(){
        return this.id
    }

    nombreInterfaz(){
        return this.nombre
    }

    dibujar(){
        new Error("La subclase debe implementarlo")
    }
}

class Principal extends Interfaz{
    constructor(visualizador){
        super(visualizador)
        this.id = "principal"
        this.nombre = "Principal"
    }

     
 
    dibujar(){
        const contenedor =  $("#main")
        let interfaces = this.visualizador.interfacesDisponibles()
        interfaces.forEach(interfaz => {
            console.log(interfaz.identificador())
            let escritura = `<button id=${interfaz.identificador()} class="btn interfaz">${interfaz.nombreInterfaz()}</button>`
            contenedor.innerHTML += escritura
        });
       
        $$(".interfaz").forEach(btn => {
            
            btn.addEventListener("click", this.visualizador.handlerDeBotones)
        })

    }
}

class InterfazGann extends Interfaz{
    
    constructor(visualizador){
        super(visualizador)
        this.id = "inG"
        this.nombre = "Gann"
    }

    
 
    ejecutar(){

    }

    dibujar(){
        const contenedor =  $("#main")
        $("#main").innerHTML = `<h1>${this.nombre} </h1>`
    }
}


class Visualizador{
    constructor(){
     
        this.capaces = [new InterfazGann(this)]
       
        this.interfaz = new Principal(this)
    }

    handlerDeBotones(e){
   
    
        // esto esta mal, funciona pero es raro, el this representa botones por lo tanto no puedo usarlo para la instancia actual
        visualizador.cambiarInterfaz( visualizador.capaces.find(elem => elem.identificador() == e.target.id ))

    }

    interfacesDisponibles(){
        return this.capaces
    }

    cambiarInterfaz(interfaz){
       
        this.interfaz = interfaz
        
        this.dibujar()
    }

    dibujar(){
        this.interfaz.dibujar()
    }

}

const $ = (arg) => document.querySelector(arg)
const $$ = (args) => document.querySelectorAll(args) 

const pruebaProceso= [
    {id:0, rafaga:6, tiempoLlegada: 0, prioridad: 5},{id:1 , rafaga:4, tiempoLlegada:1, prioridad:2},{
        id:2 , rafaga: 3, tiempoLlegada: 2, prioridad:3}, {id:4 , rafaga: 2, tiempoLlegada: 3, prioridad:1} 
    ]

const visualizador = new Visualizador()

visualizador.dibujar()

const resolvedor = new GraficoGann(pruebaProceso)

console.log(resolvedor.resolver())