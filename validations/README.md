# VALIDATIONS #

Estas son las validaciones:  

- *required*: Si el campo es requerido.  
- *min*: El largo mínimo del campo. Recibe un valor numérico.  
- *max*: El largo máximo del campo. Recibe un valor numérico.  
- *type*: El tipo de campo. Acepta uno de los siguientes valores: (alphaNumericDash, bool, numeric)

---

## validator.js ##
Este archivo sirve para validar formularios.

Exporta:

- *validateForm*: Esta función recibe un formulario y sus validaciones. Retorna los errores, si los hay.  


Ejemplo:

Recibe un formulario con la siguiente estructura:   

    {
        name: "James",
        phone: "3001123455"
    }

Las validaciones que recibe tienen la siguiente estructura:  

    
    {
        name: 'required|min:3|max:30',
        phone: 'min:7|max:10'
    }

Si no hay errores en el formulario, la función retorna false.  

En caso de que haya algún error, la respuesta tiene la siguiente estructura con las validaciones que fallaron.  

    {
        name: 'required|max:30',
        phone: 'min:7
    }

