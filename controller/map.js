window.onload = function(){

  var longitudeAtual;
  var latitudeAtual;

    function dadosLocalizacao(position){
      longitudeAtual = position.coords.longitude;
      latitudeAtual = position.coords.latitude;

      var image = new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: 'purple', //#ff9900 Seta a cor interna do ponto
          opacity: 0.6
        }),
        //color: 'purple',
        stroke: new ol.style.Stroke({color: 'purple', width: 1}) //Seta a cor da borda 
      });

      //Aqui é setado em objeto a estilização de cada tipo de vetorização
      var styles = {
        'Point': new ol.style.Style({
          image: image,
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
          })
        }),
        'MultiPoint': new ol.style.Style({
          image: image
        }),
        'MultiPolygon': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
          })
        }),
        'Polygon': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        }),
        'GeometryCollection': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'magenta',
            width: 2
          }),
          fill: new ol.style.Fill({
            color: 'magenta'
          }),
          image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
              color: 'magenta'
            })
          })
        }),
        'Circle': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
          })
        })
      };

      var styleFunction = function(feature) {
        return styles[feature.getGeometry().getType()];
      };

      //var convert = ol.proj.transform([-43.120243549346924, -22.895044312909466], 'EPSG:4326', 'EPSG:4674');
      //console.log(coordinates);
	  
	  var json = {
      "type": "FeatureCollection",
      
       'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG: 4674'
          }
      },
      "features": [
          {
              "type": "Feature",
              "properties": {
                "name": "urn:ogc:def:crs:EPSG::4674"
              },
              "geometry": {
                  "type": "Polygon", //Trecho que define o perímetro das vagas
                  "coordinates": [
                      [
                          [
                              -43.120176,
                              -22.895190 //INFERIOR ESQUERDO
                          ],
                          [
                              //-43.120176, -22.895402 
                              -43.120176,
                              -22.895430 //SUPERIOR ESQUERDO
                          ],
                          [
                              //-43.119903, -22.895402 
                              -43.119903,
                              -22.895430 //INFERIOR DIREITO
                          ],
                          [
                              -43.119903,
                              -22.895190 //SUPERIOR DIREITO
                              //-43.119903, -22.895430
                          ]
                      ]
                  ]
              }
          },
          //Trecho que define a 1 fileira
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201312,
                      -22.8952000
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201074,
                      //-22.8952000
                      -22.8952023
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200836,
                      -22.8952046
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200598,
                      -22.8952069
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200360,
                      -22.8952092
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200122,
                      -22.8952115
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199884,
                      -22.8952138
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199646,
                      -22.8952161
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199408,
                      -22.8952184
                  ]
              }
          },
          //Trecho que define a 2 fileira
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201406,
                      -22.8952718 //-22.8952318
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201211,
                      -22.8952718
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201016,
                      -22.8952718
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200821,
                      -22.8952718
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200626,
                      -22.8952718
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200431,
                      -22.8952718
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200236,
                      -22.8952718
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200041,
                      -22.8952718
                  ]
              }
          },
          //Trecho que define a 3 fileira
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201406,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201211,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201016,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200821,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200626,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200431,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200236,
                      -22.8953025
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200041,
                      -22.8953025
                  ]
              }
          },
          //Trecho que define a lateral
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199177,
                      -22.8952528
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199177,
                      -22.8952725
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199177,
                      -22.8952922
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199177,
                      -22.8953119
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199177,
                      -22.8953692
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1199177,
                      -22.8953859
                  ]
              }
          },
          //Trecho que define as vagas de deficientes
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201467,
                      -22.8954014
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1201182,
                      -22.8954014
                  ]
              }
          },
          {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -43.1200897,
                      -22.8954014
                  ]
              }
          },
      ]
  };

  /*var objJson;
  
  $.getJSON("map.json", function(json){
    objJson = callback(json);
  })*/

     

      var vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(json)
      });

      //vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction
      });

      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          vectorLayer
        ],
        target: 'map',
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          }),
        
        }),
        view: new ol.View({
		    projection: 'EPSG:4326',                //projection: 'EPSG:4326', //Aqui é definido qual o tipo de Datum - Modelo terrestre
            center: [-43.120243549346924,    -22.895044312909466],
            zoom: 19,
            minZoom: 3
        })
      });

      //O TRECHO ABAIXO ADICIONA O PONTO DA SUA LOCALIZAÇÃO ATUAL
      var imageYouPosition = new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: 'blue', //#ff9900 Seta a cor interna do ponto
          opacity: 0.6
        }),
        //color: 'purple',
        stroke: new ol.style.Stroke({color: 'white', width: 1}) //Seta a cor da borda 
      });

      var styleYouPosition = {
        'Point': new ol.style.Style({
          image: imageYouPosition,
        })
    };

    var styleFunctionYouPosition = function(feature) {
        return styleYouPosition[feature.getGeometry().getType()];
      };

      var jsonYouPosition = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                longitudeAtual,
                latitudeAtual
              ]
            }
          }
        ]
      }

      var sourceYouPosition = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(jsonYouPosition)
      });

      
      var layerYouPosition = new ol.layer.Vector({
        source: sourceYouPosition,
        style: styleFunctionYouPosition
      });

      map.addLayer(layerYouPosition);
      //TERMINA AQUI A SUA LOCALIZAÇÃO ATUAL

      map.addControl(new ol.control.OverviewMap());
      map.addControl(new ol.control.MousePosition({displayProjection: 'EPSG:4326'}));
      map.addControl(new ol.control.ScaleLine());
      map.addControl(new ol.control.ZoomSlider());
      map.addControl(new ol.control.FullScreen());
      map.addControl(new ol.control.Attribution());
      
      //$("#map").attr('Style', 'height: ' + (window.innerHeight-80) + 'px; width: ' + (window.innerWidth) + 'px;');
      
      //ADICIONA NO MAPA O TAMANHO EM PORCENTAGEM
      $("#map").attr('Style', 'height: ' + '100' + '%; width: ' + '100' + '%;');
    }

  if('geolocation' in navigator){
    navigator.geolocation.watchPosition(function(position){
      dadosLocalizacao(position);
    });
  }
  else{
    alert('Infelizmente seu navegador não suporta geolocalização.');
  }

}
