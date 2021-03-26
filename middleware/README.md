# MIDDLEWARE #

_Nota: Si se está visualizando este archivo desde VSCode, puedes hacer *"CTRL+SHIFT+V"* para verlo con formato._  

---
## mainMiddleware.js ##

Todos los llamados a los APIs pasan por el *mainMiddleware*  

Para hacer un llamado a un API se debe colocar la URL en la que se encuentre este servidor y seguido el código del API (_apiCode_) al que se desea llamar.  
Ej:  
    http://audara.app/api/?apiCode=1100  

Los APIs retornaran un código de respuesta o error que será el código del API más 1 o 4 respectivamente.  
Ej:  
El API con el código 1100 retornará el código de respuesta 1101 y el código de error 1104.


- ### Consideraciones ###
    En Postman, al enviar un request con contenido dentro del body, también se debe agregar el siguiente header:  

    Content-Type: application/json

    --

    Para los request que requieren el envio del token de autenticación, se debe enviar el token por medio del siguiente header:
    
    x-auth-token: token-va-aquí  

    El token de autenticación se genera desde el authController.


- ### Estructura de respuesta ###
    La estructura de la respuesta de los APIs es la siguiente:  
    Ej:

        {
            "code": "1101",
            "msg": {
                
            }
        }


- ### MIDDLEWARE (1000) ###
    El código del middleware es: 1000  
    Si se le envía un request con (el código 1000) y el token en el header, responde si el token es válido o no.
    Ej:  

        {
            "code": "1001",
            "msg": {
                "validToken": true
            }
        }

---
## apiSwitch.js ## 
Este es el switch que redirige el llamado a un api a su respectivo controller.  
El switch usa el código base del api. Por ejemplo, los códigos 1602, 1603 y 1605 tendrían el código base 1600. Este código base es el que usa para seleccionar el controller correspondiente.

