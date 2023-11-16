class Resolvedor{
 
}

class GraficoGann extends Resolvedor{
    constructor(procesos,  quantum = 0){
        super()
        this.procesos = procesos
        this.quantum = quantum

        
    }

    resolver(){
        return{
            fcfs : this.resolverConFcfs(),
            sjf :  null,
            rr : null,
            prioExp:  null,
            prioNoExp:  null 
        }
    }
    

 

    resolverConFcfs(){
        
        let tablasProceso = []
        let tablaReady = []
      

        this.procesos.sort((a, b) => a.tiempoLlegada - b.tiempoLlegada) // en teoria ordena por tiemppo llegada
      


      //  let tick = this.procesos.reduce((accumulado, proceso) => accumulado + proceso.rafaga)
        let tick = 0    
        this.procesos.forEach(({rafaga}) => {
            tick += rafaga
        })

        let inicio = 0
        this.procesos.forEach(proceso => {
            
            let {rafaga, tiempoLlegada, id} = proceso
            
            let tablaTemporal = [id]
           
            for(let i = 0 ; i< tick ; i++){
                let valor = " "
                if (rafaga <= 0 ||  (i+1 >= tiempoLlegada && i != inicio )){
                    
                    if(rafaga<= 0){
                        valor = "/"
                    }else{valor = "-"}
                    
                }else if(i >= tiempoLlegada && i == inicio){
                   
                    valor = rafaga
                    rafaga--
                    inicio++
                }
           
               
                tablaTemporal.push(valor)
            }
            tablasProceso.push(tablaTemporal)
        })

        for(let i = 0; i< tick; i++){
            let readyTemporal = []
            tablasProceso.forEach((proceso) => {
                
                if(proceso[i+1] == "-" ){
                    readyTemporal.push(proceso[0])
                }
            })
            tablaReady.push(readyTemporal)
        }

        return {tablasProceso,tablaReady}
    }

}



export {GraficoGann}