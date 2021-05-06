# Integracion-sheets

Integración con la API de Google Sheets en su versión 4, para insertar datos en una hoja de calculo y realizar sumas de dos celdas.

## Requisitos

* Python 2.6 o mayor.
* Manejador de paquetes [pip](https://pypi.org/project/pip/).
* [Habilitar y crear](https://developers.google.com/workspace/guides/create-project?authuser=1) proyecto en Google Cloud para la API y obtener archivos json con [credenciales](https://developers.google.com/workspace/guides/create-credentials?authuser=1).

## Configuración

* Instalar cliente de Google
```js
  pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
```
* Instalar paquete para archivo `.env`
```
pip install python-dotenv
```
* Installar gspread API para Google Sheets.
```
pip install gspread
```
* Para la configuración de las variables de ambiente copie el archvi de ejemplo `.env.example` y sustituya las variables por las suyas propias.

## Ejecución

* Para ejecutar el proyecto, usar el siguiente comando:
```py calculadora.py```

* Seguir las instrucciones y luego corroborar la información directamente el en google sheets empleado.

## Colaborador

* [Miguel Coccaro](https://github.com/mecoccaro)