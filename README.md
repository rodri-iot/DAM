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

## **Uso**
1. Accede a la aplicación a través de http://localhost:8100.
2. Navega por la lista de dispositivos en la página principal.
3. Haz clic en "Ver Detalles" para consultar información detallada de cada dispositivo.
4. Desde la vista de detalle, puedes:
    - Visualizar la última medición de humedad.
    - Cambiar el estado de la válvula.
    - Consultar el historial de mediciones.
  

## Estructura del Directorio

El proyecto está organizado en dos principales componentes: **backend** y **frontend**, cada uno con su propia estructura para facilitar el desarrollo y mantenimiento.

## Estructura del Directorio

```plaintext
DAM/
├── backend/                     # Código del servidor y lógica del backend
│   ├── routes/                  # Rutas API
│   │   └── dispositivo/         # Endpoints relacionados con dispositivos
│   ├── sql/                     # Scripts para la base de datos MySQL
│   │   └── smart_home.sql       # Definición de tablas y datos iniciales
│   ├── mysql-connector.js       # Configuración de la conexión con la base de datos
│   ├── index.js                 # Punto de entrada del servidor
│   ├── package.json             # Dependencias del backend
│   └── README.md                # Documentación específica del backend
├── frontend/                    # Código de la aplicación cliente
│   ├── src/                     # Código fuente
│   │   ├── app/                 # Módulos y componentes de la aplicación
│   │   │   ├── home/            # Página principal de la aplicación
│   │   │   ├── dispositivo/     # Página de detalles de un dispositivo
│   │   │   └── services/        # Servicios de comunicación con el backend
│   │   ├── assets/              # Recursos estáticos (imágenes, íconos, etc.)
│   │   ├── environments/        # Configuración de entornos (desarrollo/producción)
│   ├── ionic.config.json        # Configuración de Ionic
│   ├── package.json             # Dependencias del frontend
│   ├── README.md                # Documentación específica del frontend
├── docker-compose.yml           # Configuración de contenedores Docker
└── README.md                    # Documentación principal del proyecto
```

## Estrucutra del backend
``` plaintext
backend/
├── routes/
│   └── dispositivo/             # Define las rutas API relacionadas con dispositivos
├── sql/
│   └── smart_home.sql           # Define las tablas y datos iniciales de la base de datos
├── mysql-connector.js           # Configura la conexión con MySQL
├── index.js                     # Servidor Express y lógica principal
├── package.json                 # Dependencias y scripts del backend
└── README.md                    # Detalles técnicos del backend
```

## Estructura del frontend
``` plaintext
frontend/
├── src/
│   ├── app/
│   │   ├── home/                # Componente principal que lista los dispositivos
│   │   ├── dispositivo/         # Componente para mostrar detalles de un dispositivo
│   │   └── services/            # Lógica para interactuar con el backend
│   ├── assets/                  # Imágenes, íconos y otros recursos estáticos
│   ├── environments/            # Configuraciones de entornos (desarrollo/producción)
├── ionic.config.json            # Configuración para el framework Ionic
├── package.json                 # Dependencias y scripts del frontend
└── README.md                    # Documentación específica del cliente
```

## Funcionalidad de la Aplicación

### **Página Principal - Home**
- **Ruta:** `/home`
- **Descripción:**
  - Lista todos los dispositivos registrados en la base de datos.
  - Muestra información básica:
    - Nombre del dispositivo.
    - Ubicación.
    - Estado de la válvula (Abierta/Cerrada) con un ícono visual (verde/rojo).
  - Incluye un botón para ver más detalles de cada dispositivo.

#### **Cómo funciona:**
1. El frontend envía una solicitud GET al backend en `/dispositivo`.
2. El backend consulta la base de datos y devuelve una lista de dispositivos con su estado actual.
3. La interfaz se actualiza dinámicamente con la información obtenida.

---

### **Página de Detalle del Dispositivo**
- **Ruta:** `/dispositivo/:id`
- **Descripción:**
  - Muestra información detallada del dispositivo seleccionado:
    - Última medición registrada (fecha y valor de humedad).
    - Estado actual de la válvula.
    - Ubicación.
  - Permite las siguientes acciones:
    - **Abrir válvula:** Cambia el estado a "Abierta" y guarda el cambio en la base de datos.
    - **Cerrar válvula:** Cambia el estado a "Cerrada" y guarda el cambio en la base de datos.
    - **Ver historial de mediciones:** Redirige a una página con todas las mediciones registradas para el dispositivo.

#### **Cómo funciona:**
1. **Carga inicial:**
   - El frontend realiza una solicitud GET a `/dispositivo/:id` para obtener detalles del dispositivo.
   - Realiza una solicitud GET a `/dispositivo/:id/ultimaMedicion` para obtener la última medición registrada.
2. **Cambiar estado de válvula:**
   - El usuario selecciona un botón para abrir o cerrar la válvula.
   - Se envía una solicitud POST a `/dispositivo/:id/valvula` con el nuevo estado.
   - El backend actualiza la base de datos y guarda un registro en la tabla `Log_Riegos`.
   - La vista se actualiza dinámicamente.

---

### **Historial de Mediciones**
- **Ruta:** `/dispositivo/:id/mediciones`
- **Descripción:**
  - Lista todas las mediciones registradas para el dispositivo.
  - Muestra la fecha y el valor de cada medición.
  - Ordena las mediciones de forma descendente (de la más reciente a la más antigua).

#### **Cómo funciona:**
1. El frontend envía una solicitud GET a `/dispositivo/:id/mediciones`.
2. El backend consulta la tabla `Mediciones` y devuelve los datos en orden descendente.
3. Los datos se muestran en una lista en la interfaz.

---

## **Simulación de Mediciones**
El backend genera mediciones aleatorias para los dispositivos registrados cada 5 minutos.

- **Proceso:**
  - Un script se ejecuta periódicamente.
  - Consulta la tabla `Dispositivos` para obtener los dispositivos activos.
  - Genera un valor aleatorio de humedad (entre 0 y 100).
  - Inserta la medición en la tabla `Mediciones` con un timestamp actual.

- **Código del generador:**
  ```javascript
  const generarMediciones = () => {
      const queryDispositivos = 'SELECT dispositivoId FROM Dispositivos';
      const queryInsertMedicion = `
          INSERT INTO Mediciones (dispositivoId, fecha, valor)
          VALUES (?, NOW(), ?)`;

      pool.query(queryDispositivos, (err, dispositivos) => {
          if (err) {
              console.error('Error al obtener dispositivos:', err);
              return;
          }

          dispositivos.forEach(({ dispositivoId }) => {
              const valor = (Math.random() * 100).toFixed(2);
              pool.query(queryInsertMedicion, [dispositivoId, valor], (err) => {
                  if (err) {
                      console.error(`Error al registrar medición para dispositivo ${dispositivoId}:`, err);
                  } else {
                      console.log(`Medición registrada para dispositivo ${dispositivoId}: ${valor}`);
                  }
              });
          });
      });
  };

  setInterval(generarMediciones, 300000); // Ejecutar cada 5 minutos

    

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
