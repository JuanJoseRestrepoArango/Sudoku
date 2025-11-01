//revision diego
//lugar para crear el pull request
(function(){
    let principal = document.getElementById("principal");
    let opciones = document.getElementById("opciones");
    let solucion = Array.from({ length: 9 }, () => Array(9).fill(0));

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

    function crearSolucion(){
        
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {

                if(solucion[i - 1][j - 1] === 0){
                    let numeros = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                    
                    for (let k = 0; k < 9; k++) { 
                        let valor = numeros[k];
                        
                        if(RevisarfilaColumna(i, j, valor) && RevisarCuadro(i, j, valor)){
                            solucion[i - 1][j - 1] = valor;
                        
                            if(crearSolucion()){
                                return true
                            }else{
                                solucion[i - 1][j - 1] = 0;
                            }
                            
                            
                        }
                    }
                    return false; 
                            
                }
                
            }
        } 
        return true;
    }
    
    function RevisarfilaColumna(f,c,valor){
        f = f - 1;
        c = c - 1;
        let filas = [];
        let columnas = [];
        for (let i = 0; i < 9; i++) {
            let fila = solucion[f][i];
            let columna = solucion[i][c];
            filas.push(Number(fila));
            columnas.push(Number(columna));
        }
        // console.log(filas);
        // console.log(columnas);
        if(filas.includes(valor) || columnas.includes(valor)){
            return false;
        }
        return true;
        
    }
    function RevisarCuadro(f,c,valor){
        f = f - 1;
        c = c - 1;
        let startFila = Math.floor((f ) / 3) * 3 ;
        let startColumna = Math.floor((c) / 3) * 3 ;
        
        for (let i = startFila; i < startFila + 3; i++) {
            for (let j = startColumna; j < startColumna + 3; j++) {
                let casilla = solucion[i][j];
                if (Number(casilla) === valor) {
                    return false;
                }
            }
        }
        return true;
    }

    function rellenarTablero(niv){
        let cont = 0;
        while(cont<niv){
            let fila = Math.floor(Math.random() * 9);
            let columna = Math.floor(Math.random() * 9);
            let casilla = document.querySelector(`#casilla${fila+1}${columna+1}`);
            if(  casilla.querySelector("p").textContent === ""){
                casilla.querySelector("p").textContent = solucion[fila][columna]
                cont++;
            }
        }
    }
    
    crearTablero();
    crearOpciones();
    crearSolucion()
    console.log("Solución del Sudoku:");
    console.table(solucion);
    rellenarTablero(45)
    let botones = document.querySelectorAll('.opcion');
    let casillas = document.querySelectorAll('.casilla');
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            console.log('Botón presionado:', boton.textContent);
            valor = boton.textContent;
            casillas.forEach(casilla=>{
                casilla.addEventListener('click',function(){
                    let id = casilla.id.replace('casilla', '');  // "39"
                    let fila = parseInt(id[0]);
                    let columna = parseInt(id[1]);
                    let valorCorrecto = solucion[fila - 1][columna - 1];
                    console.log(fila,columna,valorCorrecto)
                    if(casilla.querySelector("p").textContent==="" && parseInt(valor) === valorCorrecto){
                        casilla.querySelector("p").textContent=valor
                        console.log(casilla.classList)
                        casilla.classList.remove('malo')
                        console.log(casilla.classList)
                    }else{
                        
                        casilla.classList.add('malo')
                    }
                })
            })

        });
    });

    
    
})();