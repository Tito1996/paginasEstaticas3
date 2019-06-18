const http=require('http');
const url=require('url');
const fs=require('fs');

//const mime = {
//   'html' : 'text/html',
//   'css'  : 'text/css',
//   'jpg'  : 'image/jpg',
//   'ico'  : 'image/x-icon',
//   'mp3'  :	'audio/mpeg3',
//   'mp4'  : 'video/mp4'
//}; Lo sustituimos por:
const mime = require('mime');

const servidor=http.createServer((pedido, respuesta) => {
  const objetourl = url.parse(pedido.url);
  let camino='static'+objetourl.pathname;
  if (camino=='static/')
    camino='static/index.html';
  fs.stat(camino, error => {
    if (!error) {
      fs.readFile(camino, (error,contenido) => {		  
        if (error) {
            respuesta.writeHead(500, {'Content-Type': 'text/plain'});
            respuesta.write('Error interno');
            respuesta.end();					
        } else {
            //const vec = camino.split('.');
            //const extension=vec[vec.length-1];
            //const mimearchivo=mime[extension]; 
            //respuesta.writeHead(200, {'Content-Type': mimearchivo});
            const tipo=mime.getType(camino);
            console.log(tipo);
            respuesta.writeHead(200, {'Content-Type': tipo});
            //Llamamos a la función getType indicando el recurso y nos devuelve el tipo mime que le corresponde.

            respuesta.write(contenido);
            respuesta.end();
        }
	  });
    } else {
      respuesta.writeHead(404, {'Content-Type': 'text/html'});
      respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
      respuesta.end();
    }
  });
});

servidor.listen(8888);

console.log('Servidor web iniciado');