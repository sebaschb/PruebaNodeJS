# TEST NODEJS AUDARA

_Prueba básica para desarrollador Backend_


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
git clone https://github.com/roncertain/audara_v5_CA.git
```

_Si deseas descargarlo directamente puedes ingresar al siguiente link [https://github.com/roncertain/audara_v5_CA](https://github.com/roncertain/audara_v5_CA)._

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

_Con base en la estructura de rutas y los ejemplos en `` callQueueController.js ``  y `` callQueueValidations.js `` es necesario generar en los archivos `` callRatesController.js `` y `` callRatesValidations.js `` los siguientes métodos._

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

_Exporta el collection de Postman con la que se realizarán las pruebas._

_Comunicate con la persona encargada la cual te dira por que medio debes enviar o publicar tu respuesta._


### Te deseamos mucha suerte 🍀🍀⭐
