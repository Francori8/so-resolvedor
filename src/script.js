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
        this.datos = []
        this.id = "inG"
        this.nombre = "Gann"
    }

    
    contexto(){
        return `<h1>${this.nombre} </h1>
        <div>
            <label name="id-pcb">Id: <input type="number" name="id-pcb" id="id-pcb" value=0></label>
            <label> Prioridad: <input type="number" id="prioridad-pcb" value=0></label>
            <label>Tiempo Llegada: <input type="number" id="tll-pcb" value=0></label>
            <label>Rafaga:<input type="number" id="rafaga-pcb" value=0></label>

            <button id="agregar-pcb">Agregar</button>
        </div>
        <table >
            <thead>
            <tr>
                <th>Id</th>
                <th>Prioridad</th>
                <th>Tiempo Llegada</th>
                <th>Rafaga</th>
            </tr>
            </thead>
            <tbody id="tablaDeMuestra">
            </tbody>
        </table>
        <div>
            <button id="ejecutar-gann">Ejecutar</button>
            <label>Quantum<input type="number" value=3 id="quantum"></label>
        </div>
        <div id="resultados-gann"></div>
        `
    }

    dibujarResultado(resul){
        const contenedor = $("#resultados-gann")
        
        for (const key in resul) {
            
           let estilo = resul[key]
           if(estilo != null || estilo != undefined){
            console.log(estilo)
            console.log(estilo.tablasProceso)
            let {tablasProceso, tablaReady} = estilo

// los id ayyq ue modificarloes uqe dependan del estilo tambien
            contenedor.innerHTML =` <table border=1>
            <thead >
                <tr id="encabezadoTP">
                </tr>
                
            </thead>
            <tbody id="cuerpoTP">
            </tbody>
    </table> 
            <table border=1>
            <thead>
                <tr id="encabezadoTR"></tr>
            </thead>
            <tbody>
                <tr id="cuerpoTR"></tr>
            </tbody>
            </table>
    `
            tablasProceso.forEach((elem, i) => {
               
                $("#cuerpoTP").innerHTML +=`<tr id="fila${i}">`
                elem.forEach((ele, j) => {
                    
                    if(i == 0){
                        $("#encabezadoTP").innerHTML += `<td>${j==0 ? "id" : j-1} </td>`  
                    }
                    $(`#fila${i}`).innerHTML += `<td> ${ele}</td>`


                })

                $(`#fila${i}`).innerHTML += `</tr>`
            })

            tablaReady.forEach((ele, i) => {
                $("#encabezadoTR").innerHTML += `<td>${i} </tsd>`
                $("#cuerpoTR").innerHTML += `<td>${ele} </td>`
            })


           }
  
        }
    }

    ejecutar(){
        console.log(this.datos)
        const resolvedo  = new GraficoGann(this.datos, $("#quantum").value )
        const resultado =  resolvedo.resolver()
        this.dibujarResultado(resultado)
    }

    dibujar(){
        const contenedor =  $("#main")
        $("#main").innerHTML = this.contexto()

        $("#agregar-pcb").addEventListener("click", (e) => {
            let contene = $("#tablaDeMuestra")
                contene.innerHTML += `<tr>
                        <th>${$("#id-pcb").value}</th>
                        <th>${$("#prioridad-pcb").value}</th>
                        <th>${$("#tll-pcb").value}</th>
                        <th>${$("#rafaga-pcb").value}</th>
                </tr>`
                this.datos.push({id: Number($("#id-pcb").value) , rafaga: Number($("#rafaga-pcb").value), tiempoLlegada: Number($("#tll-pcb").value) , prioridad: Number($("#prioridad-pcb").value) })


                $("#id-pcb").value ++
                $("#prioridad-pcb").value = 0
                $("#tll-pcb").value = 0
                $("#rafaga-pcb").value = 0

            })

        $("#ejecutar-gann").addEventListener("click", (e) => {
            

            this.ejecutar()
        })
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

console.log(pruebaProceso)

const resolvedor = new GraficoGann(pruebaProceso)
console.log(resolvedor.resolver())
