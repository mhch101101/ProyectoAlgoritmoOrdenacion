var intervalo;
var control;
var delay = ms => new Promise(res => intervalo =setTimeout(res, ms));

var mainIndex = new Vue({
    el: '#mainIndex',
    data: {
    	listaElementos: [],
    	nroElementos: 0,

    	generarAleatorio: false,
    	cont: 1,
    	elementoTemp:0,

    	tipoOrdenamiento:0,
        //lista que se muestra al inicio del resultado, ES UNA LISTA DE VARIABLES ENTEROS(VALORES)
    	listaElementosInicial: [],

        //lista que se usa para ayudar al counting sort, ES UNA LISTA DE OBJETOS(VALOR, ESTILO DE CELDA)
        listaTemporalInicial: [],
        listaAuxiliar: [],
        //lista que mostrará el resultado del ordenamiento del selection y counting sort, ES UNA LISTA DE OBJETOS(VALOR, ESTILO DE CELDA)
        listaTransicion: [],
        

        //lista que se muestra para el ordenamientos del quick sort, ES UNA LISTA DE LISTA DE OBJETOS(VALOR, ESTILO DE CELDA)
        listaAuxMitad1: [],
        listaAuxMitad2: [],

    	tituloOrdenamiento:'',
    	ordenado:false,
        encabezadoFinal:false,
        conConometro:true,
        conConometroValorActual:true,

        velocidad:500,
        velocidadActual:0,
        tiempo:'------',
        maximoAleatorio:100,

        txtSelection:false,
        txtQuick:false,
        txtCounting:false

    }, watch: {
        
    }, computed: {
        listaNoVacia: function () {
            let vm = this;
            if(vm.listaElementos!=null && vm.listaElementos.length>0 ){
            	return true;
            }else{
            	return false;
            }
        },
         listaInicialNoVacia: function () {
            let vm = this;
            if(vm.listaElementosInicial!=null && vm.listaElementosInicial.length>0 ){
            	return true;
            }else{
            	return false;
            }
        },
        listaTransicionNoVacia: function () {
            let vm = this;
            if(vm.listaTransicion!=null && vm.listaTransicion.length>0 ){
                return true;
            }else{
                return false;
            }
        },
        listaTemporalInicialNoVacia: function () {
            let vm = this;
            if(vm.listaTemporalInicial!=null && vm.listaTemporalInicial.length>0 ){
                return true;
            }else{
                return false;
            }
        },
        listaAuxiliarNoVacia: function () {
            let vm = this;
            if(vm.listaAuxiliar!=null && vm.listaAuxiliar.length>0 ){
                return true;
            }else{
                return false;
            }
        },
        listaAuxMitad1NoVacia: function () {
            let vm = this;
            if(vm.listaAuxMitad1!=null && vm.listaAuxMitad1.length>0 ){
                return true;
            }else{
                return false;
            }
        },
        listaAuxMitad2NoVacia: function () {
            let vm = this;
            if(vm.listaAuxMitad2!=null && vm.listaAuxMitad2.length>0 ){
                return true;
            }else{
                return false;
            }
        }

        
    }, mounted() {
        this.Init();
    }, methods: {

        Init: function () {
            let vm = this;
            var row = {

            }

        },ResetearArreglo: function () {
            let vm = this;
            vm.listaElementos=[];
            vm.generarAleatorio=false;
            vm.ordenado=false;
        },InicializarArreglo: function () {
            let vm = this;
            var nro=parseInt(vm.nroElementos);
            vm.cont= 1;
    		vm.elementoTemp=0;
    		vm.generarAleatorio=false;
    		vm.tipoOrdenamiento=0;
	        if(nro!=null && nro>0){
	        	vm.listaElementos=new Array(nro);
	        	for (var i = 0; i < nro; i++) {
	        		vm.listaElementos[i]=0;
	        	}
	        }else{
	        	vm.listaElementos=[];
	        	swal("Ingrese una longitud del arreglo válida y mayor a cero");
	        }
            
        },Aleatorio: function(){
        	let vm = this;
			var tt=vm.listaElementos.length;
			vm.listaElementos=new Array(tt);
			for (var i = 0; i < tt; i++) {
	        	vm.listaElementos[i]=parseInt(Math.random() * (vm.maximoAleatorio ) + 1) ;
	        }
        },AniadirElemento: function () {
            let vm = this;
            cTemp=parseInt(vm.cont);
            eTemp=parseInt(vm.elementoTemp);
            if(cTemp!=null && cTemp!=undefined && Number.isInteger(cTemp) &&  cTemp>0 && eTemp!=null && eTemp!=undefined && Number.isInteger(eTemp)  ){
	 			if(vm.listaElementos!=null && vm.listaElementos.length >0 && vm.listaElementos.length >= cTemp ){
		        	vm.listaElementos[cTemp-1]=eTemp;
		        	vm.cont ++;
		       		vm.elementoTemp='';
		        }else{
		        	swal("Posición fuera del rango del arreglo");
		        }
            }else{
            	swal("Ingrese la posición y el elemento");
            }
	       
	        
        },OrdenarArreglo: function(){
        	let vm = this;
        	var modo=parseInt(vm.tipoOrdenamiento);
            vm.tiempo='------';
            vm.TerminarConometro();
            vm.conConometroValorActual=vm.conConometro;
            vm.velocidadActual=vm.velocidad;
            clearInterval(intervalo);
            vm.listaTransicion=[];
            vm.listaAuxiliar=[];
            vm.listaTemporalInicial=[];
            vm.listaElementosInicial=[];
            vm.listaAuxMitad1=[];
            vm.listaAuxMitad2=[];
            vm.encabezadoFinal=false;
            if(vm.conConometro){
                delay = ms => new Promise(res => intervalo =setTimeout(res, ms));
            }else{
                clearInterval(intervalo);
            }
            vm.txtSelection=false;
            vm.txtQuick=false;
            vm.txtCounting=false;
        	switch (modo) {
			  case 1:
			    vm.tituloOrdenamiento='Ordenamiento por Selection Sort';
			    vm.InicializarListaSelection();
                vm.OrdenarSelectionSort();
                vm.txtSelection=true;
			    vm.ordenado=true;
			    break;
			  case 2:
			    vm.tituloOrdenamiento='Ordenamiento por Quick Sort';
			    vm.InicializarListaQuick();
                vm.OrdenarQuickSort();
                vm.txtQuick=true;
			    vm.ordenado=true;
			    break;
			  case 3:
			    vm.tituloOrdenamiento='Ordenamiento por Counting Sort';
			    vm.InicializarListaCounting();
                vm.OrdenarCountingSort();
                vm.txtCounting=true;
			    vm.ordenado=true;
			    break;
			  default:
			    swal("Seleccione un tipo de ordenamiento");
			    vm.ordenado=false;
			    break;
			}
        },InicializarListaSelection: function(){
            let vm = this;
            vm.listaElementosInicial=[];
            vm.listaElementos.forEach(element => vm.listaElementosInicial.push(element) );

            vm.listaTransicion=[];
            vm.listaElementos.forEach(element => vm.listaTransicion.push({"valor": element, "estadoCss":"celdaSinColor"}) );
        },InicializarListaQuick: function(){
            let vm = this;
            vm.listaElementosInicial=[];
            vm.listaElementos.forEach(element => vm.listaElementosInicial.push(element) );

            vm.listaTransicion=[];
            vm.listaElementos.forEach(element => vm.listaTransicion.push({"valor": element, "estadoCss":"celdaSinColor", "flagOrdenado":false}) );
        },InicializarListaCounting: function(){
            let vm = this;
            vm.listaElementosInicial=[];
            vm.listaElementos.forEach(element => vm.listaElementosInicial.push(element) );
        },OrdenarSelectionSort: function(){
            let vm = this;
            if(vm.conConometro){
                vm.OrdenarSelectionSortConAnimacion();
            }else{
                vm.OrdenarSelectionSortSinAnimacion();
            }
        },OrdenarQuickSort: function(){
            let vm = this;
            if(vm.conConometro){
                vm.OrdenarQuickSortConAnimacion();
            }else{
                vm.OrdenarQuickSortSinAnimacion();
            }
        },OrdenarCountingSort: function(){
            let vm = this;
            if(vm.conConometro){
                vm.OrdenarCountingSortConAnimacion();
            }else{
                vm.OrdenarCountingSortSinAnimacion();
            }
        },OrdenarCountingSortSinAnimacion: function(){
            let vm = this;
            var tam=vm.listaElementosInicial.length;
            var max=0;
            for(var i=1;i<=tam;i++){
                if(max<vm.listaElementosInicial[i-1]){
                    max=vm.listaElementosInicial[i-1];
                }
                vm.listaTemporalInicial.push({"valor": vm.listaElementosInicial[i-1], "estadoCss":"celdaSinColor"});
            }   
            vm.listaAuxiliar=[];
            for(var i=0;i<=max;i++){
                vm.listaAuxiliar.push({"valor": 0, "estadoCss":"celdaSinColor", "estadoCssCabeza":""})
            } 
            for(var i=1;i<=tam;i++){
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor++;
            }
            for(var i=2;i<=max+1;i++){
                vm.listaAuxiliar[i-1].valor=vm.listaAuxiliar[i-1].valor+vm.listaAuxiliar[i-2].valor;
            }
            for(var i=1;i<=tam;i++){
                vm.listaTransicion.push({"valor": 0, "estadoCss":"celdaSinColor", "estadoCssCabeza":""})
            }
            for(var i=tam;i>=1;i--){
                vm.listaTransicion[vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor-1].valor=vm.listaTemporalInicial[i-1].valor;
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor--;
            }
            vm.listaTemporalInicial=[];
            vm.listaAuxiliar=[];
        },OrdenarCountingSortConAnimacion: async function(){
            let vm = this;
            vm.IniciarConometro();
            vm.encabezadoFinal=true;

            var aux=vm.velocidadActual;
            //vm.velocidadActual=vm.velocidadActual/4;

            var tam=vm.listaElementosInicial.length;
            var max=0;
            for(var i=1;i<=tam;i++){
                if(max<vm.listaElementosInicial[i-1]){
                    max=vm.listaElementosInicial[i-1];
                }
                vm.listaTemporalInicial.push({"valor": vm.listaElementosInicial[i-1], "estadoCss":"celdaSinColor"});
            }   

            vm.listaAuxiliar=[];
            for(var i=0;i<=max;i++){
                vm.listaAuxiliar.push({"valor": 0, "estadoCss":"celdaSinColor", "estadoCssCabeza":""})
            } 
            await delay(vm.velocidadActual);
            for(var i=1;i<=tam;i++){
                vm.listaTemporalInicial[i-1].estadoCss="celdaSeleccionada";
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCssCabeza="encabezadoSeleccionado";
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCss="celdaSeleccionada";
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor++;
                await delay(vm.velocidadActual);
                vm.listaTemporalInicial[i-1].estadoCss="celdaSinColor";
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCssCabeza="";
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCss="celdaSinColor";
            }
            for(var i=2;i<=max+1;i++){
                vm.listaAuxiliar[i-1].estadoCss="celdaSeleccionada";
                vm.listaAuxiliar[i-2].estadoCss="celdaSeleccionada";
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[i-2].estadoCss="celdaSinColor";
                vm.listaAuxiliar[i-1].valor=vm.listaAuxiliar[i-1].valor+vm.listaAuxiliar[i-2].valor;
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[i-1].estadoCss="celdaSinColor";
            }
            for(var i=1;i<=tam;i++){
                vm.listaTransicion.push({"valor": 0, "estadoCss":"celdaSinColor", "estadoCssCabeza":""})
            }
            for(var i=tam;i>=1;i--){
                vm.listaTemporalInicial[i-1].estadoCss="celdaSeleccionada"; 
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCssCabeza="encabezadoSeleccionado";
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCss="celdaSeleccionada";
                await delay(vm.velocidadActual);
                vm.listaTransicion[vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor-1].estadoCssCabeza="encabezadoSeleccionado";
                await delay(vm.velocidadActual);
                vm.listaTransicion[vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor-1].estadoCss="celdaSeleccionada";
                await delay(vm.velocidadActual);

                vm.listaTemporalInicial[i-1].estadoCss="celdaSeleccionadaCambiar"; 
                vm.listaTransicion[vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor-1].estadoCss="celdaSeleccionadaCambiar";
                await delay(vm.velocidadActual);
                vm.listaTransicion[vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor-1].valor=vm.listaTemporalInicial[i-1].valor;
                await delay(vm.velocidadActual);
                var aux=vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor;
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCss="celdaSeleccionadaCambiar2";
                await delay(vm.velocidadActual);
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].valor--;
                await delay(vm.velocidadActual);

                vm.listaTemporalInicial[i-1].estadoCss="celdaSinColor"; 
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCss="celdaSinColor";
                vm.listaAuxiliar[vm.listaTemporalInicial[i-1].valor].estadoCssCabeza="";
                vm.listaTransicion[aux-1].estadoCssCabeza="";
                vm.listaTransicion[aux-1].estadoCss="celdaSinColor";
            }
            //await delay(vm.velocidadActual);
            //vm.listaTemporalInicial=[];
            //vm.listaAuxiliar=[];
            vm.encabezadoFinal=false;
            vm.velocidadActual=aux;
            vm.TerminarConometro();
        },OrdenarQuickSortConAnimacion: async function(){
            let vm = this;
            var tam=vm.listaElementosInicial.length;
            vm.IniciarConometro();

            var valorAux=null;
            var estadoCssAux=null;
            var flagOrdenadoAux=null;
            var tt=null;
            if(tam>1){
                var indicePivote =0;
                var indiceAux=tam-1;
                await delay(vm.velocidadActual);

                while(indicePivote>-1 && indicePivote<tam){

                    vm.listaTransicion[indicePivote].estadoCss="celdaSeleccionadaPivote";
                    await delay(vm.velocidadActual);

                    while( indiceAux!=indicePivote ){
                        vm.listaTransicion[indiceAux].estadoCss="celdaSeleccionadaSinPivote";
                        await delay(vm.velocidadActual);
                        if(indicePivote<=indiceAux){    // SI EL PIVOTE ESTA A LA IZQUIERDAA    --PIVOTE--------AUX----
                            if(vm.listaTransicion[indicePivote].valor>vm.listaTransicion[indiceAux].valor){
                                await delay(vm.velocidadActual);
                                vm.listaTransicion[indiceAux].estadoCss="celdaRojo";
                                vm.listaTransicion[indicePivote].estadoCss="celdaRojo";
                                await delay(vm.velocidadActual);

                                valorAux=vm.listaTransicion[indicePivote].valor;
                                estadoCssAux=vm.listaTransicion[indicePivote].estadoCss;
                                flagOrdenadoAux=vm.listaTransicion[indicePivote].flagOrdenado;


                                vm.listaTransicion[indicePivote].valor=vm.listaTransicion[indiceAux].valor;
                                vm.listaTransicion[indicePivote].estadoCss=vm.listaTransicion[indiceAux].estadoCss;
                                vm.listaTransicion[indicePivote].flagOrdenado=vm.listaTransicion[indiceAux].flagOrdenado;

                                vm.listaTransicion[indiceAux].valor=valorAux;
                                vm.listaTransicion[indiceAux].estadoCss=estadoCssAux;
                                vm.listaTransicion[indiceAux].flagOrdenado=flagOrdenadoAux;


                                tt=indiceAux;
                                indiceAux=indicePivote;
                                indicePivote=tt;
                                await delay(vm.velocidadActual);
                                vm.listaTransicion[indiceAux].estadoCss="celdaSeleccionadaSinPivote";
                                vm.listaTransicion[indicePivote].estadoCss="celdaSeleccionadaPivote";
                                await delay(vm.velocidadActual);
                            }
                        }else{                          // SI EL PIVOTE ESTA A LA DERECHA    --AUX--------PIVOTE----
                            if(vm.listaTransicion[indicePivote].valor<vm.listaTransicion[indiceAux].valor){
                                await delay(vm.velocidadActual);
                                vm.listaTransicion[indiceAux].estadoCss="celdaRojo";
                                vm.listaTransicion[indicePivote].estadoCss="celdaRojo";
                                await delay(vm.velocidadActual);

                                valorAux=vm.listaTransicion[indicePivote].valor;
                                estadoCssAux=vm.listaTransicion[indicePivote].estadoCss;
                                flagOrdenadoAux=vm.listaTransicion[indicePivote].flagOrdenado;

                                vm.listaTransicion[indicePivote].valor=vm.listaTransicion[indiceAux].valor;
                                vm.listaTransicion[indicePivote].estadoCss=vm.listaTransicion[indiceAux].estadoCss;
                                vm.listaTransicion[indicePivote].flagOrdenado=vm.listaTransicion[indiceAux].flagOrdenado;

                                vm.listaTransicion[indiceAux].valor=valorAux;
                                vm.listaTransicion[indiceAux].estadoCss=estadoCssAux;
                                vm.listaTransicion[indiceAux].flagOrdenado=flagOrdenadoAux;

                                tt=indiceAux;
                                indiceAux=indicePivote;
                                indicePivote=tt;
                                await delay(vm.velocidadActual);
                                vm.listaTransicion[indiceAux].estadoCss="celdaSeleccionadaSinPivote";
                                vm.listaTransicion[indicePivote].estadoCss="celdaSeleccionadaPivote";
                                await delay(vm.velocidadActual);
                            }
                        }
                        vm.listaTransicion[indiceAux].estadoCss="celdaSinColor";
                        await delay(vm.velocidadActual);
                        if(indicePivote<=indiceAux){
                            indiceAux--; 
                        }else{
                            indiceAux++;
                        }
                    }
                    vm.listaTransicion[indicePivote].flagOrdenado=true;
                    
                    indicePivote=-1;
                    for(var i=0;i<tam;i++){
                        if(!vm.listaTransicion[i].flagOrdenado && indicePivote<0){
                            indicePivote=i;
                            indiceAux=i;
                        }
                        if(indicePivote>=0 && !vm.listaTransicion[i].flagOrdenado ){
                            indiceAux=i;
                        }
                        if(indicePivote>=0 && vm.listaTransicion[i].flagOrdenado ){
                            break;
                        }
                    }    


                }

                
                

            }

            vm.TerminarConometro();
        },OrdenarQuickSortSinAnimacion: function(){
            let vm = this;
            var tam=vm.listaElementosInicial.length;

            var valorAux=null;
            var flagOrdenadoAux=null;
            var tt=null;
            if(tam>1){
                var indicePivote =0;
                var indiceAux=tam-1;

                while(indicePivote>-1 && indicePivote<tam){

                    while( indiceAux!=indicePivote ){
                        if(indicePivote<=indiceAux){    // SI EL PIVOTE ESTA A LA IZQUIERDAA    --PIVOTE--------AUX----
                            if(vm.listaTransicion[indicePivote].valor>vm.listaTransicion[indiceAux].valor){

                                valorAux=vm.listaTransicion[indicePivote].valor;
                                flagOrdenadoAux=vm.listaTransicion[indicePivote].flagOrdenado;


                                vm.listaTransicion[indicePivote].valor=vm.listaTransicion[indiceAux].valor;
                                vm.listaTransicion[indicePivote].flagOrdenado=vm.listaTransicion[indiceAux].flagOrdenado;

                                vm.listaTransicion[indiceAux].valor=valorAux;
                                vm.listaTransicion[indiceAux].flagOrdenado=flagOrdenadoAux;


                                tt=indiceAux;
                                indiceAux=indicePivote;
                                indicePivote=tt;
                            }
                        }else{                          // SI EL PIVOTE ESTA A LA DERECHA    --AUX--------PIVOTE----
                            if(vm.listaTransicion[indicePivote].valor<vm.listaTransicion[indiceAux].valor){
                                
                                valorAux=vm.listaTransicion[indicePivote].valor;
                                flagOrdenadoAux=vm.listaTransicion[indicePivote].flagOrdenado;

                                vm.listaTransicion[indicePivote].valor=vm.listaTransicion[indiceAux].valor;
                                vm.listaTransicion[indicePivote].flagOrdenado=vm.listaTransicion[indiceAux].flagOrdenado;

                                vm.listaTransicion[indiceAux].valor=valorAux;
                                vm.listaTransicion[indiceAux].flagOrdenado=flagOrdenadoAux;

                                tt=indiceAux;
                                indiceAux=indicePivote;
                                indicePivote=tt;
                            }
                        }
                        if(indicePivote<=indiceAux){
                            indiceAux--; 
                        }else{
                            indiceAux++;
                        }
                    }
                    vm.listaTransicion[indicePivote].flagOrdenado=true;
                    
                    indicePivote=-1;
                    for(var i=0;i<tam;i++){
                        if(!vm.listaTransicion[i].flagOrdenado && indicePivote<0){
                            indicePivote=i;
                            indiceAux=i;
                        }
                        if(indicePivote>=0 && !vm.listaTransicion[i].flagOrdenado ){
                            indiceAux=i;
                        }
                        if(indicePivote>=0 && vm.listaTransicion[i].flagOrdenado ){
                            break;
                        }
                    }    


                }

                
                

            }

        }, OrdenarSelectionSortConAnimacion: async function(){
            let vm = this;
            var ind=0;
            var min=0;
            var tam=vm.listaTransicion.length;

            vm.IniciarConometro();
            for (var i = ind; i < tam-1; i++) {
                min=vm.listaTransicion[i].valor;
                vm.listaTransicion[i].estadoCss="celdaVerde";
                for (var j = i+1; j < tam; j++) {
                    vm.listaTransicion[j].estadoCss="celdaAmarilla";
                    await delay(vm.velocidadActual);
                    if(min>vm.listaTransicion[j].valor){
                        vm.listaTransicion[j].estadoCss="celdaRojo";
                        vm.listaTransicion[i].estadoCss="celdaRojo";
                        await delay(vm.velocidadActual);
                        min=vm.listaTransicion[j].valor;
                        vm.listaTransicion[j].valor=vm.listaTransicion[i].valor;
                        vm.listaTransicion[i].valor=min;
                        await delay(vm.velocidadActual);
                        vm.listaTransicion[i].estadoCss="celdaVerde";
                        vm.listaTransicion[j].estadoCss="celdaAmarilla";
                        await delay(vm.velocidadActual);
                    }
                    vm.listaTransicion[j].estadoCss="celdaSinColor";
                }
                vm.listaTransicion[i].estadoCss="celdaSinColor";
            }
            vm.TerminarConometro();
        }, OrdenarSelectionSortSinAnimacion: async function(){
            let vm = this;
            var ind=0;
            var min=0;
            var tam=vm.listaElementos.length;

            for (var i = ind; i < tam-1; i++) {
                min=vm.listaTransicion[i].valor;
                for (var j = i+1; j < tam; j++) {
                    if(min>vm.listaTransicion[j].valor){
                        min=vm.listaTransicion[j].valor;
                        vm.listaTransicion[j].valor=vm.listaTransicion[i].valor;
                        vm.listaTransicion[i].valor=min;
                    }
                }
            }
        },IniciarConometro: function(){
            let vm = this;
            var timeInicial = new Date();
            control = setInterval(cronometro,10);
            function cronometro () { 
                timeActual = new Date();
                milisegundos = timeActual.getTime() - timeInicial.getTime();
                acumularTime2 = new Date();
                acumularTime2.setTime(milisegundos); 
                cc = Math.round(acumularTime2.getMilliseconds()/10);
                ss = acumularTime2.getSeconds();
                mm = acumularTime2.getMinutes();
                hh = acumularTime2.getHours()-19;
                if (cc < 10) {cc = "0"+cc;}
                if (ss < 10) {ss = "0"+ss;} 
                if (mm < 10) {mm = "0"+mm;}
                if (hh < 10) {hh = "0"+hh;}
                vm.tiempo = hh+" : "+mm+" : "+ss+" : "+cc;
            }
        },TerminarConometro: function(){
            let vm = this;
            clearInterval(control);
        },AniadirElementoPorEnter: function(e){
            let vm = this;
            vm.AniadirElemento();
        }

    }, Update: function () {
        
    }

});

/**
OrdenarQuickSortConAnimacionRecursivo: async function(inicio,fin){
            let vm = this;
            if(inicio<fin){
                var mid=Math.trunc((inicio+fin)/2);
                for(var j = inicio; j <= mid; j++){
                    vm.listaTransicion[j-1].estadoCss="celdaPrimeraMitad";  
                }
                for(var j = mid+1; j <= fin; j++){
                    vm.listaTransicion[j-1].estadoCss="celdaSegundaMitad";  
                }
                await delay(vm.velocidadActual);
                var listaAuxMitad1var= await vm.OrdenarQuickSortConAnimacionRecursivo(inicio,mid);
                var listaAuxMitad2var= await vm.OrdenarQuickSortConAnimacionRecursivo(mid+1,fin);
                var aux1=0;
                var aux2=0;
                var indiceTemp=inicio-1;
                
                while(aux1<listaAuxMitad1var.length || aux2<listaAuxMitad2var.length){
                    if(aux1<listaAuxMitad1var.length && aux2<listaAuxMitad2var.length){
                        if(listaAuxMitad1var[aux1].valor<=listaAuxMitad2var[aux2].valor){
                            vm.listaTransicion[indiceTemp].valor=listaAuxMitad1var[aux1].valor;
                            aux1++;
                        }else{
                            vm.listaTransicion[indiceTemp].valor=listaAuxMitad2var[aux2].valor;
                            aux2++;
                        }    
                    }else if (aux1<listaAuxMitad1var.length){
                        vm.listaTransicion[indiceTemp].valor=listaAuxMitad1var[aux1].valor;
                        aux1++;
                    }else{
                        vm.listaTransicion[indiceTemp].valor=listaAuxMitad2var[aux2].valor;
                        aux2++;
                    }    
                    indiceTemp++;  
                    await delay(vm.velocidadActual);              
                }

            }
            var listaReturn=[];
            for(var j = inicio; j <= fin; j++){
                var tt=vm.listaTransicion[j-1].valor;                
                listaReturn.push({"valor": tt, "estadoCss":""});
                vm.listaTransicion[j-1].estadoCss="celdaSinColor";  
            }
            
            return listaReturn;
            
        }
        ***/