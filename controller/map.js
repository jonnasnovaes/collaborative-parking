var min = 1;
var seg = 1
var timeOutContador;
function resetaContador() {
  min = 1;
  seg = 1;
  window.clearTimeout(timeOutContador);
}
function contadorAtualizacao() {
  
  if((min > 0) || (seg > 0)){				
    if(seg == 0){					
      seg = 59;					
      min = min - 1	
    }				
    else{					
      seg = seg - 1;				
    }				
    if(min.toString().length == 1){					
      min = "0" + min;				
    }				
    if(seg.toString().length == 1){					
      seg = "0" + seg;				
    }				
    $("#ct").html(min + ":" + seg);	
    timeOutContador = setTimeout('contadorAtualizacao()', 1000);			
  }
  else {
    min = 1;
    seg = 1;
  }	
	
}

function atualizaVagaTempo(map) {
  setTimeout(function() {
    atualizaVagas(map);
    atualizaVagaTempo(map);
  }, 60000);
}

function atualizaVagas(map) {
  removeVagas(map);
  resetaContador();
  requisitaGeoserver(map);
}

function removeVagas(map) {
  let layers = [];
  map.getLayers().forEach(function (layer) {
    layers.push(layer);
  });
  var len = layers.length;
  for(var i = 2; i <= len; i++) {
    map.removeLayer(layers[i]);
  }
  
}

function dadosLocalizacao(map, longitudeAtual, latitudeAtual) {

  //O BLOCO DE CÓDIGO ABAIXO TRATA DA SUA LOCALIZAÇÃO ATUAL NO MAPA 

  //O TRECHO ABAIXO ADICIONA O PONTO DA SUA LOCALIZAÇÃO ATUAL
  var imageYouPosition = new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
      color: 'blue', //#ff9900 Seta a cor interna do ponto
      opacity: 0.6
    }),
    //color: 'purple',
    stroke: new ol.style.Stroke({
      color: 'white',
      width: 1
    }) //Seta a cor da borda 
  });

  var styleYouPosition = {
    'Point': new ol.style.Style({
      image: imageYouPosition,
    })
  };

  var styleFunctionYouPosition = function (feature) {
    return styleYouPosition[feature.getGeometry().getType()];
  };

  var jsonYouPosition = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          longitudeAtual,
          latitudeAtual
        ]
      }
    }]
  }

  var sourceYouPosition = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(jsonYouPosition)
  });


  var layerYouPosition = new ol.layer.Vector({
    source: sourceYouPosition,
    style: styleFunctionYouPosition
  });

  map.addLayer(layerYouPosition);

}


//====================================================================//

function requisitaGeoserver(map) {

  //O TRECHO ABAIXO FAZ A REQUISIÇÃO AO SERVIDOR E TRATA OS DADOS PARA O MAPA 

  let url = 'http://localhost:3030/geoserver/vagas/ows?service=WFS&' +
  '+version=1.0.0&request=GetFeature&typeName=vagas:vagas-point&' +
  'maxFeatures=50&outputFormat=application/json';

  $.getJSON(url, function(data){   

    var cor;
    var textColor;
    var status;
    
    for(let i = 0; i < data.features.length; i++){    

      cor = null;
      status = null;
    
      status = data.features[i].properties.status;

      status == false ? cor = "#FF0000" : cor = "#00FF00";

      //CRIA O OBJETO QUE REPRESENTARÁ AS VAGAS E A POSIÇÃO ATUAL
      var point = new ol.style.Circle({ 
        radius: 5,
        fill: new ol.style.Fill({
          color: cor,
          opacity: 0.6
        }),
        stroke: new ol.style.Stroke({
          color: cor,
          width: 1
        }) //Seta a cor da borda 
      });

      //O TRECHO ABAIXO TRATA A ESTILIZAÇÃO PARA CADA TIPO DE GEOMETRIA
      var styles = {
        'Point': new ol.style.Style({
          image: point,
        }),
      };
      
      var vectorSource2 = new ol.source.Vector({});
      var feature = new ol.Feature({});

      var pointGeom = new ol.geom.Point([
        data.features[i].geometry.coordinates[0],
        data.features[i].geometry.coordinates[1]
      ]);

      feature.setId(data.features[i].id);    
      feature.setProperties({'name':'', 'status':status});    
      feature.setGeometry(pointGeom);    

      vectorSource2.addFeature(feature);
      
      var vector = new ol.layer.Vector({
        source: vectorSource2,
        style: styles[feature.getGeometry().getType()]
      });

      map.addLayer(vector);
    }

    resetaContador();
    contadorAtualizacao();

  });

}

//======================================================================//

window.onload = function () {

  var map;

  var longitudeAtual;
  var latitudeAtual;

  //VERIFICA SE O NAVEGADOR TEM SUPORTE A GEOLOCALIZAÇÃO E CHAMA A FUNÇÃO CASO TRUE
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {

      longitudeAtual = position.coords.longitude;
      latitudeAtual = position.coords.latitude;


      if (longitudeAtual != undefined && latitudeAtual != undefined) {

        //O CÓDIGO CRIA O OBJETO MAP PARA SER GERENCIADO
        map = new ol.Map({
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            }),
          ],
          target: 'map',
          controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
              collapsible: false
            }),

          }),
          view: new ol.View({
            projection: 'EPSG:4326', //projection: 'EPSG:4326', //Aqui é definido qual o tipo de Datum - Modelo terrestre
            //center: [-43.120243549346924, -22.895044312909466],
            center: [longitudeAtual, latitudeAtual],
            zoom: 18,
            minZoom: 3
          })
        });

        var select = new ol.interaction.Select({
          style: new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                color: 'FFFF00'//'#FF0000'
              }),
              stroke: new ol.style.Stroke({
                color: 'FFFF00'//'#000000'
              })
            })
          })
        });
        map.addInteraction(select);

        select.on('select', function(evt){

          if(evt.selected.length == 1){

            //O TRECHO COMENTADO RETORNA AS COORDENADAS EXATAS DA VAGA
            //var coord = evt.selected[0].H.geometry.B;            

            if(evt.selected[0].f != null){
              
              //Obtém o id da vaga
              let split = evt.selected[0].f.split("vagas-point.");
              let id = split[1];

              if(id != null){

                //Obtém o status da vaga
                let status = evt.selected[0].H.status == true ? false : true;
              
                let url = 'http://localhost:3030/geoserver/ows?request=changeStatusVaga&service=statusVaga&id=';
                url += id + '&status=' + status;

                //Requisição ajax
                $.get(url, function(msg){
                  removeVagas(map);
                  requisitaGeoserver(map);
                  select.getFeatures().clear();
                });
              
              }
            }
          }
      });

        //BLOCO QUE ADICIONA OS CONTROLADORES DO MAPA
        map.addControl(new ol.control.ZoomSlider());
        map.addControl(new ol.control.FullScreen());

        //ADICIONA NO MAPA O TAMANHO EM PORCENTAGEM
        $("#map").attr('Style', 'height: ' + '100' + '%; width: ' + '100' + '%;');

        //INSERE O BOTÃO DE POSICIONAR O MAPA NA POSIÇÃO ATUAL
        $(".ol-full-screen").css("background", "none");
  
        $(".ol-full-screen").append("<button id='pa' class='navbar-brand mt-2' title='Retorna a sua posição atual no mapa'>" +
          "<img id='pa' width='20' height='20' src='assets/location.png' />" +
          "</button>");
        
        //INSERE O BOTÃO DE RECARREGAR AS VAGAS
        $(".ol-full-screen").append("<button id='ld' class='navbar-brand mt-2' title='Atualiza o status das vagas'>" +
          "<img id='ld' width='20' height='20' src='assets/loop-white.png' />" +
          "</button>");

        //INSERE O BOTÃO DE AJUDA AO USUÁRIO
        $(".ol-full-screen").append("<button id='info' class='navbar-brand mt-2' title='Ajuda'>" +
          "<img id='info' width='20' height='20' src='assets/info.png' />" +
          "</button>");
        
          $(".ol-full-screen").append("<span id='ct' class='mt-2' title='Tempo restante para a próxima atualização'>" +
          "00:00" +
          "</span>");

        //AO CLICAR NO BOTÃO POSICIONA O MAPA NA SUA LOCALIZAÇÃO ATUAL
        $("#pa").click(function () {

          let view = new ol.View({
            projection: 'EPSG:4326',
            //center: [-43.120243549346924, -22.895044312909466],
            center: [longitudeAtual, latitudeAtual],
            zoom: 18,
            minZoom: 3
          });

          map.setView(view);   

        });

        //EXECUTA A FUNÇÃO DE ATUALIZAR AS VAGAS NO MAPA
        $("#ld").click(function () {
          atualizaVagas(map);
        });

        $("#info").click(function () {
          window.open('view/help.html');
        });

        dadosLocalizacao(map, longitudeAtual, latitudeAtual);
        requisitaGeoserver(map);
        atualizaVagaTempo(map);
      }
    });


    $("#localizar").click(function () {
      var endereco = $("#endereco").val();
      var tamString = endereco.length;

      if (tamString > 0) {

        url = "https://nominatim.openstreetmap.org/search/" + endereco + "?format=json";

        $.getJSON(url, function (response) {
          let arrayEndereco = response;

          if (arrayEndereco.length != 0) {

            let latitude = parseFloat(arrayEndereco[0].lat);
            let longitude = parseFloat(arrayEndereco[0].lon);

            let view = new ol.View({
              projection: 'EPSG:4326',
              //center: [-43.120243549346924, -22.895044312909466],
              center: [longitude, latitude],
              zoom: 18,
              minZoom: 3
            });

            map.setView(view);
          } else {
            alert("Localização inexistente ou informada de maneira incorreta.");
          }
        }, () => {
          alert("Não foi possivel carregar a localização, tenta novamente mais tarde !");
        });
      } else {
        alert("O campo de localização não pode ser NULO, insira uma localização válida !");
      }

      $("#endereco").val("");
    });

    $(document).keypress(function (e) {
      if (e.which == 13) {
        $("#localizar").click();
      }
    });


  } else {
    alert('Infelizmente seu navegador não suporta geolocalização.');
  }

}