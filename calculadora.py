from __future__ import print_function
import os
from dotenv import load_dotenv

load_dotenv()

spreadsheet_id = os.getenv('SPREADSHEET_ID')

def requerimiento_inicial():
    try:
        celda_A = input('Primera celda a usar(i.e. A1): ')
        numero_A = int(input('Primer numero para la celda %s: ' % (celda_A)))
        celda_B = input('Segunda celda a usar(i.e. B1): ')
        numero_B = int(input('Segundo numero para la celda %s: ' % (celda_B)))
    except:
        print('Error en dato ingresado')
        requerimiento_inicial()

print('Calculadora usando Google Sheets')
print('Sheet ID: ', spreadsheet_id)
requerimiento_inicial()
