window.onload = function () {

  var longitudeAtual;
  var latitudeAtual;

  //CRIA O OBJETO QUE REPRESENTARÁ AS VAGAS E A POSIÇÃO ATUAL
  var image = new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
      color: 'purple', //#ff9900 Seta a cor interna do ponto
      opacity: 0.6
    }),
    //color: 'purple',
    stroke: new ol.style.Stroke({
      color: 'purple',
      width: 1
    }) //Seta a cor da borda 
  });

  //O TRECHO ABAIXO TRATA A ESTILIZAÇÃO PARA CADA TIPO DE GEOMETRIA
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

  var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
  };

  //=====================================================================//

  //O CÓDIGO CRIA O OBJETO MAP PARA SER GERENCIADO
  var map = new ol.Map({
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
      center: [-43.120243549346924, -22.895044312909466],
      zoom: 18,
      minZoom: 3
    })
  });

  //BLOCO QUE ADICIONA OS CONTROLADORES DO MAPA
  map.addControl(new ol.control.OverviewMap());
  map.addControl(new ol.control.MousePosition({
    displayProjection: 'EPSG:4326'
  }));
  map.addControl(new ol.control.ScaleLine());
  map.addControl(new ol.control.ZoomSlider());
  map.addControl(new ol.control.FullScreen());
  map.addControl(new ol.control.Attribution());

  //ADICIONA NO MAPA O TAMANHO EM PORCENTAGEM
  $("#map").attr('Style', 'height: ' + '100' + '%; width: ' + '100' + '%;');

  function dadosLocalizacao(position) {

    //PEGA A LONGITUTE E LATITUDE ATUAL
    longitudeAtual = position.coords.longitude;
    latitudeAtual = position.coords.latitude;

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

  function requisitaGeoserver() {

    //O TRECHO ABAIXO FAZ A REQUISIÇÃO AO SERVIDOR E TRATA OS DADOS PARA O MAPA 
    var vectorSource2 = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return 'http://localhost:8080/geoserver/vagas/ows?service=WFS&' +
          'version=1.0.0&request=GetFeature&typeName=vagas:vagas-point&' +
          'maxFeatures=50&outputFormat=application/json'; //&srsname=EPSG:4674&' +
        //'bbox=' + extent.join(',') + ',EPSG:4674';
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
      //strategy: ol.loadingstrategy.bbox
    });

    var vector = new ol.layer.Vector({
      source: vectorSource2,
      style: styleFunction
    });

    map.addLayer(vector);
    
  }

  //======================================================================//

  //VERIFICA SE O NAVEGADOR TEM SUPORTE A GEOLOCALIZAÇÃO E CHAMA A FUNÇÃO CASO TRUE
  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(function (position) {
      //JOGAR A POSITION PARA OUTRA VARIAVEL
      //VER UMA MANEIRA DE CARREGAR A LONGITUTE E LATITUE ATUAL NO MAPA
      dadosLocalizacao(position);
    });
    requisitaGeoserver();
  } else {
    alert('Infelizmente seu navegador não suporta geolocalização.');
  }

}