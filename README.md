# TEST NODEJS AUDARA

_Prueba básica para desarrollador Backend._


## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósito de la prueba._


### Pre-requisitos 📋

* [Nodejs v10.* o superiores](https://nodejs.org/es/)
* [MariaDB 10.*](https://mariadb.org/)
* [Git](https://git-scm.com/)
* [Github](https://github.com/)
* [Postman](https://www.postman.com/)



### Instalación 🔧

_Clona el proyecto en tu máquina local para iniciar la prueba._

```
git clone https://github.com/geckosas/audara_test_node.git
```

_Si deseas descargarlo directamente puedes ingresar al siguiente link [https://github.com/geckosas/audara_test_node](https://github.com/geckosas/audara_test_node)._

_Una vez el proyecto esté en tu máquina es necesario instalar las dependencias que se encuentran en el archivo ``package.json`` y lo puedes hacer con el siguiente comando en tu terminal._

```
npm install
```

_Dentro del proyecto esta la carpeta `` database `` con el script `` audara_test.sql `` que debes correr en tu base de datos._

_Para configurar la conexión a la base de datos MariaDB es necesario modificar el archivo `` .env `` líneas (1 al 5)._

_El proyecto está configurado para correr en el puerto 8443, de ser necesario puedes modificarlo creando un variable de entorno en el archivo `` .env `` llamada `` PORT `` o en el archivo `` server.js linea 25 ``._

### Despliegue 🛫

_Ya estamos listos para iniciar el proyecto, para encenderlo en modo desarrollo es necesario ejecutar en la terminal el siguiente comando._

```
npm run dev
```

_Si todo esta bien, ya estarás listo para iniciar la prueba!!. ☕🤓_



### Tareas a realizar en la prueba 📄

__PARA OBTENER LA INFORMACIÓN COMPLETA DE LOS MÉTODOS (PARÁMETROS Y RESPUESTAS) DEBES LEER EL README DENTRO DEL LA CARPETA /controllers/CallRates/__

_La prueba está diseñada para no ser necesario instalar nuevas librerias en lo posible._

_Dentro de la carpeta `` helpers/ `` hay un archivo `` serverTools.js `` donde puedes encontrar múltiples métodos que pueden ayudarte. Si crees necesario para la escalabilidad del proyecto puedes agregar nuevos métodos en este archivo._

_Con base en la estructura de rutas y los ejemplos en `` callQueueController.js ``  y `` callQueueValidations.js `` es necesario generar en los archivos `` ratesController.js `` y `` ratesValidations.js `` los siguientes métodos._

*  Show callRate (2500)
*  Create callRate (2510)
*  Get callRates list (2511)
*  Update callRate (2512)
*  Delete callRate (2513)
*  Change status callRate to ACTIVE (2514)
*  Change status callRate to INACTIVE (2515)
*  Currency basic list (2518)
*  Rates basic list (2519)

### Una vez realizada la prueba ✅

_Envíanos tu respuesta en un archivo comprimido .zip y agrega el collection de postman para realizar pruebas._

Envía tu respuesta al mismo correo electrónico de donde te enviaron la prueba._


### Te deseamos mucha suerte 🍀🍀⭐
