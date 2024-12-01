# DAM - Dispositivos IoT

Esta es una aplicación multiplataforma para gestionar dispositivos IoT, desarrollada con **Ionic** para el frontend y **Node.js** para el backend. Permite visualizar dispositivos, gestionar su estado y monitorear sus mediciones.

## Índice

1. [Descripción](#descripción)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Contribución](#contribución)
7. [Licencia](#licencia)

## Descripción

Esta aplicación permite:
- Listar dispositivos registrados en la base de datos.
- Visualizar el estado de las válvulas asociadas a los dispositivos (abierta o cerrada).
- Consultar las últimas mediciones de humedad registradas.
- Registrar nuevos estados de las válvulas y almacenarlos en el sistema.
- Monitorear las mediciones asociadas a cada dispositivo.

Es ideal para sistemas de riego inteligentes o proyectos de automatización doméstica.

## Características

- **Lista de dispositivos:** Muestra dispositivos con su estado de válvula y ubicación.
- **Detalle de dispositivo:** Visualiza las mediciones recientes y el estado actual de cada dispositivo.
- **Gestión de válvulas:** Permite abrir o cerrar válvulas asociadas y guarda un registro en la base de datos.
- **Simulación de mediciones:** Generador automático de datos de sensores.
- **Interfaz amigable y responsiva:** Diseño intuitivo para todas las plataformas.

## Tecnologías Utilizadas

- **Ionic Framework**: Para la construcción de la interfaz de usuario multiplataforma.
- **Angular**: Framework para la lógica del frontend.
- **Node.js**: Backend para manejar las APIs.
- **Express.js**: Framework ligero para la creación de APIs RESTful.
- **MySQL**: Base de datos para almacenar dispositivos, registros de válvulas y mediciones.

## Instalación

Sigue estos pasos para configurar el entorno de desarrollo:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/rodri-iot/DAM.git
   cd DAM
   
2. **Instalar dependencias del backend:**
    ```bash
    cd backend
    npm install

3. **Configurar la base de datos:**

- Crea una base de datos en MySQL.
- Ejecuta el script SQL proporcionado en /backend/sql/smart_home.sql para crear las tablas necesarias.
- Actualiza las credenciales de conexión en mysql-connector.js.

4. **Iniciar el servidor backend:**
    ```bash
    npm start

5. **Instalar dependencias del frontend:**
    ```bash
    cd ../frontend
    npm install

6. **Iniciar la aplicación frontend:**
    ```bash
    ionic serve

**Uso**
1. Accede a la aplicación a través de http://localhost:8100.
2. Navega por la lista de dispositivos en la página principal.
3. Haz clic en "Ver Detalles" para consultar información detallada de cada dispositivo.
4. Desde la vista de detalle, puedes:
    - Visualizar la última medición de humedad.
    - Cambiar el estado de la válvula.
    - Consultar el historial de mediciones.
    

# Desarrollo de aplicaciones multiplataforma. Especialización IoT. FIUBA

## Clase 01
    Single Page Application
    Angular
      Componentes
      Bindings

## Clase 02
    Angular
      Pipes
      Servicios
      Directivas
        *ngIf
        *ngFor
        *ngSwitch

## Clase 03
    Reactive Forms

## Clase 04
    Comunicación entre componentes
    Ciclo de vida Angular
    App Híbridas vs Nativas

## Clase 05
    Ionic
    Ciclo de vida ionic
    Ionic Native
    Web Api vs Web Service
    Rest vs SOAP
    Express - Middleware

## Clase 06
    CORS
    MySql Pool
    Services con HTTP
    Observables
    Promesas
    Async-Await

## Clase 07
    Interceptors
    Guard
    Router

## Clase 08
    Realización y entrega de TP final

## Condición de aprobación
    Entrega del trabajo final en la clase 8 (4/12/2024) o antes del (11/12/2024 23:59)

> **Nota:** Los ejercicios resueltos y los de la clase se encuentran sin la carpeta node_modules, por lo tanto si desean correr alguno de ellos se deberán parar en la carpeta y ejecutar el comando **npm install**
