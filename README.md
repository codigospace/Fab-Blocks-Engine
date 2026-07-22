# FabBlocks - Engine

## Descripción general
Motor base e independiente para FabBlocks. Utiliza Blockly para generar bloques visuales y traducirlos a código C++, Python y JavaScript de forma modular y dinámica. Soporta perfiles de color personalizados, cambio de idioma (localización) y gestión de categorías adaptadas a cada lenguaje de programación.

---

## Estructura destacada

### ComboBoxes de la Interfaz
- **Selector de colores:** `#colorProfileSelector` (Temas de color para el workspace y bloques)
- **Selector de lenguaje:** `#languageSelector` (C++, Python, JavaScript)
- **Selector de idioma:** `#localeSelector` (Español, Inglés, Francés, Italiano, Ruso)

### Contenedores Principales
- **XML de Toolbox:** `<xml id="toolbox">` (Generado dinámicamente)
- **Contenedor Blockly:** `<div id="blockly">` (Espacio de trabajo visual)
- **Contenedor de código:** `<div id="code">` (Visor de código resaltado)

### Scripts e Integraciones
- **jQuery & Underscore**: Librerías auxiliares requeridas por la versión de Blockly.
- **Blockly (BQ Fork)**: Versión de Blockly adaptada para robótica y Arduino.
- **FabBlocks (módulo núcleo)**: `/static/fabblocks.js` (Definición de bloques personalizados, colores y traducciones).
- **Mapeado de traducciones**: `/static/src/translationMap.js` (Mapeo de textos y etiquetas traducidos).

---

## Arquitectura y Módulos (`/js`)

El código de control y la lógica del motor están estructurados en módulos de ES6 para facilitar su mantenimiento e independencia:

*   **`js/app.js`**: Punto de entrada de la aplicación. Inicializa los controladores y coordina el arranque.
*   **`js/config.js`**: Contiene configuraciones por defecto del sistema.
*   **`js/core/`**:
    *   `workspace.manager.js`: Administra el espacio de trabajo de Blockly (inyección, redimensionamiento, limpieza).
    *   `state.store.js`: Tienda de estado global (idioma, lenguaje, tema). Persiste y recupera la configuración de `localStorage` (`languageFabBlocks` / `selectedLanguage`).
    *   `code.generator.js`: Genera el código a partir de los bloques y gestiona el resaltado sintáctico.
*   **`js/generators/`**:
    *   `index.js` y `registry.js`: Sistema dinámico de plantillas para la generación de código.
    *   `languages/`: Plantillas separadas para la generación de `cpp.js`, `python.js` y `javascript.js`.
*   **`js/integrations/`**:
    *   `blockly.adapter.js`: Encapsula la comunicación directa con el objeto global `Blockly`.
    *   `fabblocks.adapter.js`: Adaptador para interactuar con el núcleo del motor (`FabBlocks` definido en `static/fabblocks.js`).
*   **`js/ui/`**:
    *   `language.controller.js`: Controla el selector de lenguaje de programación y oculta categorías no soportadas.
    *   `locale.controller.js`: Gestiona las etiquetas y traducción del entorno.
    *   `theme.controller.js`: Aplica temas de color a la interfaz, toolbox y bloques.

---

## **Descripción de las Carpetas y Archivos Relevantes**

### **Carpeta `static/`**
Contiene los archivos CSS, JavaScript y assets estáticos esenciales:
- **`fabblocks.css`**: Define los estilos visuales del entorno (el contenedor de Blockly, el panel de código y elementos responsivos).
- **`fabblocks.js`**: Define los bloques de Blockly y sus generadores Arduino heredados, expuestos bajo el namespace `FabBlocks`.

#### **`static/javascript/`**
- **`blockly-bq/`**: Contiene la librería Blockly con soporte para generación orientada a Arduino.
- **`highlight/`**: Contiene `highlight.pack.js` para el coloreado sintáctico de C++, Python y JS.

#### **`static/src/`**
- **`colorProfiles.js`**: Define los esquemas de color para los temas (Oscuro, Claro, Daltónico, etc.).
- **`helpUrls.js`**: URLs de documentación de ayuda para cada bloque.
- **`profiles.js`**: Perfiles de velocidad y configuración de comunicación.
- **`resources.js`**: Rutas y dimensiones de imágenes utilizadas en los bloques.
- **`translationMap.js`**: Mapeo de términos de traducción para internacionalización.

#### **`static/lang/`**
Archivos de localización con los mensajes en distintos idiomas (`en-ES.js`, `en-GB.js`, `fr-FR.js`, `it-IT.js`, `ru.js`).

---

## **Archivo `fabblocks.js`**

Define la configuración visual y comportamiento de los bloques.
*   **Ejemplo de bloque Arduino:**
    ```javascript
    Blockly.Arduino.test_inout_highlow = function () {
        var bool_value = this.getFieldValue('BOOL');
        var code = JST['inout_highlow']({ 'bool_value': bool_value }, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    ```

*   **Configuración del bloque:**
    ```javascript
    Blockly.Blocks.test_inout_highlow = {
        category: FabBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        init: function () {
            this.setColour(FabBlocks.LANG_COLOUR_MODULAR_ADI_3);
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(resources.images.escribirModular))
                .appendField(new Blockly.FieldDropdown([
                    ['HIGH', 'HIGH'],
                    ['LOW', 'LOW']
                ]), 'BOOL');
            this.setOutput(true, Boolean);
        }
    };
    ```

---

## **Edición de Color del Entorno**

Los colores del entorno se configuran en `static/src/colorProfiles.js`. El controlador `theme.controller.js` se encarga de reaccionar a cambios en el selector para aplicar dinámicamente estos temas tanto al lienzo de Blockly como a las clases CSS de resaltado sintáctico.

---

## **Conclusión**
Este motor está diseñado para ser completamente independiente y extensible, facilitando la integración de FabBlocks con cualquier interfaz web sin depender de configuraciones globales propietarias de otras marcas.