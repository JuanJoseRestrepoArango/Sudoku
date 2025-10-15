(function(){
    let principal = document.getElementById("principal");
    let opciones = document.getElementById("opciones");
    

    function crearTablero(){
        for (let i = 1; i < 10; i++) {
            let fila = document.createElement("div");
            for (let j = 1; j < 10; j++) {
                let columna = document.createElement("div");
                columna.className = "casilla";
                columna.id = "casilla" + (i) + (j);
                if(j % 3 === 0 && j !== 9){
                    columna.classList.add("limite_casilla");
                }
                let p = document.createElement("p");
                columna.appendChild(p);
                fila.appendChild(columna);
            }
            
            fila.className = "fila";
            if(i === 1){
                fila.classList.add("limite_fila_top");
            }else if(i % 3 === 0){
                fila.classList.add("limite_fila_bottom");
            }
            
            principal.appendChild(fila);
        }
    }
    function crearOpciones(){
        for (let i = 1; i < 10; i++) {
            let opcion = document.createElement("button");
            opcion.className = "opcion";
            opcion.id = "opcion" + (i);
            opcion.textContent = i;
            opciones.appendChild(opcion);
        }
    }

    function crearRellenarTablero(){
        
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                
                let numeros = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);

                let casilla = document.querySelector(`#casilla${i}${j}`);
                if(casilla.querySelector("p").textContent === ""){
                    
                    for (let k = 0; k < 9; k++) { 
                        let valor = numeros[k];
                        
                        if(RevisarfilaColumna(i, j, valor) && RevisarCuadro(i, j, valor)){
                            casilla.querySelector("p").textContent = valor;
                            console.log(valor,`valor casilla ${i},${j}`);
                            if(crearRellenarTablero()){
                                return true
                            };
                            
                        }
                    }
                    return false; 
                            
                }
                
            }
        } 
    }
    
    function RevisarfilaColumna(f,c,valor){
        let filas = [];
        let columnas = [];
        for (let i = 1; i < 10; i++) {
            let fila = document.querySelector(`#casilla${f}${i}`);
            let columna = document.querySelector(`#casilla${i}${c}`);
            filas.push(Number(fila.querySelector("p").textContent));
            columnas.push(Number(columna.querySelector("p").textContent));
        }
        // console.log(filas);
        // console.log(columnas);
        if(filas.includes(valor) || columnas.includes(valor)){
            return false;
        }
        return true;
        
    }
    function RevisarCuadro(f,c,valor){
        let startFila = Math.floor((f - 1) / 3) * 3 + 1;
        let startColumna = Math.floor((c - 1) / 3) * 3 + 1;
        
        for (let i = startFila; i < startFila + 3; i++) {
            for (let j = startColumna; j < startColumna + 3; j++) {
                let casilla = document.querySelector(`#casilla${i}${j}`);
                if (Number(casilla.querySelector("p").textContent) === valor) {
                    return false;
                }
            }
        }
        return true;
    }
    
    crearTablero();
    crearOpciones();
    crearRellenarTablero()
    
})();