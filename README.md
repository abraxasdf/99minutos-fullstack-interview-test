# 99 Minutos Fullstack Test
<p align="center">
  <img src="https://www.99minutos.com/static/media/logo-99minutos.b60d26d8.png" width="120" alt="99minutos Logo" /></a>
</p>

## Introducción

Se realiza una implementacion de react native para recibir branches de este github, crear pull request y al listarlos puedes cerrarlos o darle merge.

## Instalación

## Requisitos

Instalar NodeJS - https://nodejs.org/en/

## Descargar este projecto: 

https://github.com/abraxasdf/99minutos-fullstack-interview-test/

### 1. Ejecutar en terminal:
```
$ npm install
```

### 2.-  Ejecutar en terminal:
```
$ npm run start
```

## Branches: 
---- 

* Al dar click en el boton de `branches`, carga todos los branches del lado izquierdo.

* Al dar click en un branch en especifico, carga todos los commits de esa branch en la parte inferior.

* Al dar click en un commit en especifico, carga los detalles de ese commit de esa branch en la sección de la derecha.


## Pull Request: 
----

* Al dar click en el boton de `Pull Request`, carga todos los Pull requests del lado izquierdo.

* En los detalles de los Pull Request dependiendo del status se muestran los botones para `close` o hacer `merge`.

* Al dar click en el boton de `close`, se cambia el status a closed.

* Al dar click en el boton de `merge`, se realiza un merge entre los dos branches.
 
## API Arquitectura:


 ```
        $root
        | package.json
        | package-lock.json
        | babel.config.js
        | archivo1.txt
        | app.json
        | README.md
        | App.js
        |_____src
        |       |_____components 
        |               |_____BranchesComp
        |               |       |_____BranchesComp.js
        |               |_____ButtonComp
        |               |       |_____ButtonComp.js
        |               |_____PRComp
        |                       |_____PRComp.js
        |_____assets
                 |_____favicon.png
                 |_____icon.png
                 |_____splash.png
 ```
