from __future__ import print_function
import gspread
import os
from dotenv import load_dotenv
from oauth2client.service_account import ServiceAccountCredentials
from google.oauth2.service_account import Credentials


load_dotenv()
scope = ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',
         "https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
spreadsheet_id = os.getenv('SPREADSHEET_ID')


creds = ServiceAccountCredentials.from_json_keyfile_name(os.getenv('CLIENT_SECRET_JSON'), scope)
client = gspread.authorize(creds)
sheet = client.open(os.getenv('SHEET_NAME')).sheet1

def requerimiento_inicial():
    try:
        celda_A = input('Primera celda a usar(i.e. A1): ')
        numero_A = int(input('Primer numero para la celda %s: ' % (celda_A)))
        celda_B = input('Segunda celda a usar(i.e. B1): ')
        numero_B = int(input('Segundo numero para la celda %s: ' % (celda_B)))
        celda_fin = input('celda de resultado: ')
    except:
        print('Error en dato ingresado')
        requerimiento_inicial()
    valores = {'celda_A': celda_A, 'celda_B': celda_B, 'numero_A': numero_A, 'numero_B': numero_B}
    print(valores)
    resultado = insertar_valores(valores)

def insertar_valores(valores):
    sheet.update(valores.get('celda_A'), valores.get('numero_A'))
    sheet.update(valores.get('celda_B'), valores.get('numero_B'))


print('Calculadora usando Google Sheets')
print('Sheet ID: ', spreadsheet_id)
requerimiento_inicial()
