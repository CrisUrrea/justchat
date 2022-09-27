#cargue y visualización de datos

from http.client import _DataType
import pandas as pd
import numpy as np
from flask import request
app = Flask(__name__)

#Cargando datos del dataset
dataset = pd.read_csv(r'/Users/cristhianurrea/Downloads/Datos.csv',encoding="latin9", sep=",")

#resumen de los datos
print (dataset.head())

#lectura y busqueda de usuarios

import getpass
import csv
tagId = getpass.getpass("Acerque su carnet al lector: ")
#tagId='0008712525'
RFidRegistered = False
with open(r'/Users/cristhianurrea/Downloads/Datos.csv') as csvfile:
     Dataset = csv.DictReader(csvfile)
     for idx in Dataset:
        if str(idx["Contra"]) == tagId:
           RFidRegistered = True
           print("Bienvenido " + idx["Nombres"])
           @app.route('/', methods=["POST"])
           def index():
            datos = {'rfid':tagId}
            print (datos)
            return render_template("Sidepanel.js",value=datos)
           if __name__=="__main__":
            app.run(debug=True)

     if RFidRegistered == False:
        print("No se ha encontrado el usuario")
