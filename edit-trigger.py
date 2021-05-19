from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler
import gspread
import os, uuid, time
from dotenv import load_dotenv
from oauth2client.service_account import ServiceAccountCredentials


load_dotenv()
scope = ["https://spreadsheets.google.com/feeds", 'https://www.googleapis.com/auth/spreadsheets',
         "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]
spreadsheet_id = os.getenv('SPREADSHEET_ID')

creds = ServiceAccountCredentials.from_json_keyfile_name(os.getenv('CLIENT_SECRET_JSON'), scope)
client = gspread.authorize(creds)
sh = client.open(os.getenv('SHEET_NAME'))
sheet = client.open(os.getenv('SHEET_NAME')).sheet1
sched = BackgroundScheduler()
app = Flask(__name__)
valor = 0

def verificarCelda(celda):
    return sheet.acell(celda).value

def checkCelda():
    global valor
    celda = verificarCelda('A1')
    a1 = verificarCelda('A1')
    b1 = verificarCelda('B1')
    if valor != celda:
        valor = celda
        time.sleep(1.3)
        worksheetCopia(sheet.acell('D1', value_render_option='FORMULA').value, a1, b1)

def worksheetCopia(formula,a1,b1):
    id = str(uuid.uuid1())
    if formula and a1 and b1:
        sh.add_worksheet(title=id, rows='100', cols='20')
        time.sleep(2)
        worksheet = sh.worksheet(id)
        worksheet.update_acell('C1', formula)
        worksheet.update_acell('A1', a1)
        worksheet.update_acell('B1', b1)
        resultado = worksheet.acell('C1').value
        sheet.update('A2', resultado)
        sh.del_worksheet(id)


sched.add_job(func=checkCelda, trigger='interval', seconds=2)
sched.start()


