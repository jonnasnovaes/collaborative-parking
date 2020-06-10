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

  let url = 'http://localhost:8080/geoserver/vagas/ows?service=WFS&' +
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
                color: '#FF0000'
              }),
              stroke: new ol.style.Stroke({
                color: '#000000'
              })
            })
          })
        });
        map.addInteraction(select);

        select.on('select', function(evt){

          if(evt.selected.length == 0){
            console.info("vazio");
          }
          else{

            //O TRECHO COMENTADO RETORNA AS COORDENADAS EXATAS DA VAGA
            //var coord = evt.selected[0].H.geometry.B;            

            //Obtém o id da vaga
            let split = evt.selected[0].f.split("vagas-point.");
            let id = split[1];

            //Obtém o status da vaga
            let parametro = evt.selected[0].H.status == true ? false : true;

            //Requisição ajax
            $.post("model/index.php", {id : id, parametro : parametro}, function(msg){
              requisitaGeoserver(map);
            });


          }
      });

        //BLOCO QUE ADICIONA OS CONTROLADORES DO MAPA
        map.addControl(new ol.control.ZoomSlider());
        map.addControl(new ol.control.FullScreen());
        //map.addControl(new ol.control.OverviewMap());
        //map.addControl(new ol.control.ScaleLine());
        //map.addControl(new ol.control.Attribution());
        /*map.addControl(new ol.control.MousePosition({
          displayProjection: 'EPSG:4326'
        }));*/

        //ADICIONA NO MAPA O TAMANHO EM PORCENTAGEM
        $("#map").attr('Style', 'height: ' + '100' + '%; width: ' + '100' + '%;');

        //INSERE O BOTÃO DE POSICIONAR O MAPA NA POSIÇÃO ATUAL
        $(".ol-full-screen").css("background", "none");
        //$("#pa").remove();
        $(".ol-full-screen").append("<button id='pa' class='navbar-brand mt-2'>" +
          "<img id='pa' width='20' height='20' src='assets/ico-localizacao-grey.svg' />" +
          "</button>");

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

          //----------

          /*
          var select = new ol.interaction.Select({
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: '#0288D1',
                width: 2
              })
            })
          });
          map.addInteraction(select);*/

          
          /*map.getInteractions().forEach(function (interaction) {
            console.log("OK");
            if(interaction instanceof ol.interaction.Select) { 
             }
          });*/

        });

        dadosLocalizacao(map, longitudeAtual, latitudeAtual);
        requisitaGeoserver(map);
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