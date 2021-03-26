# RATES #
## ratesController ##
Estos son los apis de Tarifas, con códigos 25XX:  

### 2500 (Show rate) ###
En el query recibe un parámetro _id_ con el id de la tarifa que se quiere mostrar.  
Retorna los datos de esa tarifa. La respuesta tiene la siguiente estructura:  

    {
        "code": "2501",
        "msg": {
            "data": {
                "id": 1,
                "name": "Out_Calls",
                "prefix": "9",
                "number_of_digits": 7,
                "min_rate": 1.25,
                "sec_rate": 0.045,
                "currency_id": 1,
                "status": "ACTIVE"
            }
        }
    }

---
### 2510 (Create rate) ###
Dentro del body recibe los datos necesarios para la creación de la tarifa.  
Valida los datos de acuerdo con el archivo de validaciones y si todo se crea bien retorna el mismo resultado que el show (api 2500).  

Los datos que recibe son, ej:  

    {
        "name": "prueba_a",
        "prefix": 3,
        "number_of_digits": 4,
        "min_rate": 2000,
        "sec_rate": 100,
        "currency_id": 15
    }

---
### 2511 (Rates list) ###
Dentro del body recibe los siguientes parámetros:  
    - _filters_: Contiene los valores por los cuales se puede filtrar la búsqueda, en este caso, _name_.  
    - _perpage_: El número de registros que se muestran por página.  
    - _page_: La página a mostrar.  
    - _order_: El orden. Puede ser 'asc' o 'desc'.  
    - _orderField_: El campo por el cual se va a ordenar. Puede ser 'name', 'prefix' o 'status'.  

Retorna el listado de tarifas. La respuesta tiene la siguiente estructura:  

    {
        "code": "2501",
        "msg": {
            "data": [
                {
                    "id": 2,
                    "tr": [
                        {
                            "td": "name",
                            "value": "DEV_Celular"
                        },
                        {
                            "td": "prefix",
                            "value": "05"
                        },
                        {
                            "td": "currency",
                            "value": "USD$"
                        },
                        {
                            "td": "rate_min",
                            "value": 1
                        },
                        {
                            "td": "rate_sec",
                            "value": 0.1
                        },
                        {
                            "td": "status",
                            "value": "ACTIVE"
                        }
                    ]
                }
            ],
            "from": 1,
            "to": 1,
            "per_page": 1,
            "totalhits": 2,
            "current_page": 1
        }
    }

---
### 2512 (Update rate) ###
En el query recibe un parámetro _id_ con el id de la tarifa que se va a editar.  
Dentro del body recibe los datos necesarios para la edición de la tarifa.  
Valida los datos de acuerdo con el archivo de validaciones y si todo se actualiza bien retorna el mismo resultado que el show (api 2500).  

Los datos que recibe son los mismos que el create (api 2510).  

---
### 2513 (Delete rate) ###
En el query recibe un parámetro _id_ con el id de la tarifa que se desea eliminar.  
Elimina la tarifa y se retorna la siguiente respuesta:  

    {
        "code": "2501",
        "msg": {
            "data": {
                "delete": true
            }
        }
    }

---
### 2515 (Enable rate) ###
En el query recibe un parámetro _id_ con el id de la tarifa que se desea activar.  
Si se encuentra la tarifa, cambia su status a 'ACTIVE' y retorna la siguiente respuesta:  

    {
        "code": "2501",
        "msg": {
            "data": {
                "active": true
            }
        }
    }

---
### 2516 (Disable rate) ###
En el query recibe un parámetro _id_ con el id de la tarifa que se desea eliminar.  
Se cambia su status a 'INACTIVE' y se retorna la siguiente respuesta:  

    {
        "code": "2501",
        "msg": {
            "data": {
                "inactive": true
            }
        }
    }

---
### 2518 (Currencies basic list) ###
Trae un listado básico (sin paginación) de todos los registros de la tabla currencies.  

La estructura es la siguiente:  

    {
        "code": "2501",
        "msg": {
            "data": [
                {
                    "id": 1,
                    "value": "USD$",
                    "name": "American Dollar"
                },
                {
                    "id": 4,
                    "value": "ARS$",
                    "name": "Argentine Peso"
                }
            ]
        }
    }

---
### 2519 (Rates basic list) ###
Trae un listado básico (sin paginación) de todas las tarifas.  

La estructura es la siguiente:  

    {
        "code": "2501",
        "msg": {
            "data": [
                {
                    "id": 2,
                    "name": "DEV_Celular"
                },
                {
                    "id": 1,
                    "name": "Out_Calls"
                }
            ]
        }
    }