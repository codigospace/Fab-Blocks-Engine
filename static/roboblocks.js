// Importar dependencias como módulos ES6
import _ from 'https://cdn.jsdelivr.net/npm/underscore@1.13.6/underscore-esm.js';
import { language as enGBlang } from "./lang/en-GB.js";
import { language as enESlang } from "./lang/en-ES.js";
import { language as frFRlang } from "./lang/fr-FR.js";
import { language as itITlang } from "./lang/it-IT.js";
import { language as RUlang } from "./lang/ru.js";
import { JST } from './tmp/jst.js';
import profiles from './src/profiles.js';
import resources from './src/resources.js';
import { colorProfiles } from './src/colorProfiles.js';
import { RoboBlocksURLs } from './src/helpUrls.js';
import { translationMap } from './src/translationMap.js';

// Crear la función de carga
var load = function (options) {

    RoboBlocks.locales = {
        defaultLanguage: {},
        languages: []
    };
    RoboBlocks.locales.getLang = function () {
        return this.defaultLanguage.lngCode;
    };
    RoboBlocks.locales.getKey = function (key) {
        return this.defaultLanguage[key];
    };
    RoboBlocks.locales.setDefaultLang = function (langCode) {
        for (var i in this.languages) {
            if (this.languages[i].langCode === langCode) {
                this.defaultLanguage = this.languages[i].values;
                this.defaultLanguage.lngCode = langCode;

                // Update Blockly.Msg with localized strings
                if (typeof Blockly !== 'undefined' && Blockly.Msg) {
                    for (var key in this.defaultLanguage) {
                        if (key.indexOf('BLOCKLY_MSG_') === 0) {
                            var msgKey = key.replace('BLOCKLY_MSG_', '');
                            Blockly.Msg[msgKey] = this.defaultLanguage[key];
                        }
                    }
                }
            }
        }
    };
    RoboBlocks.locales.add = function (langCode, values) {
        if (!langCode) {
            return this.defaultLanguage;
        }
        if (langCode && !values) {
            if (!this.languages[langCode]) {
                throw new Error('Unknown language : ' + langCode);
            }
            //this.defaultLanguage = langCode;
        }
        if (values || !this.languages[langCode]) {
            this.languages.push({
                langCode: langCode,
                values: values
            });
        }
        return this;
    };
    RoboBlocks.locales.initialize = function () {
        var lang = options.language || 'es-ES';
        this.setDefaultLang(lang);
        return this;
    };

    RoboBlocks.locales.add('ru', RUlang());
    RoboBlocks.locales.add('es-ES', enESlang());
    RoboBlocks.locales.add('en-GB', enGBlang());
    RoboBlocks.locales.add('fr-FR', frFRlang());
    RoboBlocks.locales.add('it-IT', itITlang());

    // Source: src/constants.js
    /* global RoboBlocks, Blockly*/
    RoboBlocks.locales.initialize();
    RoboBlocks.variables = {};
    RoboBlocks.isVariable = function (varValue) {
        for (var i in Blockly.Variables.allVariables()) {
            if (Blockly.Variables.allVariables()[i] === varValue) {
                return true;
            }
        }
        if (RoboBlocks.variables[varValue] !== undefined) {
            return true;
        }
        if (varValue.search('digitalRead\\(') >= 0 || varValue.search('analogRead\\(') >= 0) {
            return true;
        }
        return false;
    };

    RoboBlocks.findPinMode = function (dropdown_pin) {
        var code = '';
        dropdown_pin = dropdown_pin.split(';\n');
        for (var j in dropdown_pin) {
            if (dropdown_pin[j].search('pinMode') >= 0) {
                code += dropdown_pin[j] + ';\n';
            } else {
                dropdown_pin = dropdown_pin[j];
            }
        }
        return {
            'code': code,
            'pin': dropdown_pin
        };
    };

    // Aplicar el perfil de colores
    var colorProfile = options.colorProfile || 'default'; // Perfil por defecto o el que se pase

    var profile = colorProfiles[colorProfile];

    RoboBlocks.LANG_COLOUR_BQ = profile.BQ;
    RoboBlocks.LANG_COLOUR_ZUM = profile.ZUM;
    RoboBlocks.LANG_COLOUR_SERVO = profile.SERVO;
    RoboBlocks.LANG_COLOUR_LCD = profile.LCD;
    RoboBlocks.LANG_COLOUR_CONTROL = profile.CONTROL;
    RoboBlocks.LANG_COLOUR_LOGIC = profile.LOGIC;
    RoboBlocks.LANG_COLOUR_MATH = profile.MATH;
    RoboBlocks.LANG_COLOUR_TEXT = profile.TEXT;
    RoboBlocks.LANG_COLOUR_COMMUNICATION = profile.COMMUNICATION;
    RoboBlocks.LANG_COLOUR_MODULAR = profile.MODULAR;
    RoboBlocks.LANG_COLOUR_MODULAR_ADI = profile.MODULAR_ADI;
    RoboBlocks.LANG_COLOUR_MODULAR_ADI_2 = profile.MODULAR_ADI_2;
    RoboBlocks.LANG_COLOUR_MODULAR_ADI_3 = profile.MODULAR_ADI_3;
    RoboBlocks.LANG_COLOUR_MODULAR_WRITE = profile.MODULAR_WRITE;
    RoboBlocks.LANG_COLOUR_BETTO = profile.BETTO;
    RoboBlocks.LANG_COLOUR_CARLITTO = profile.CARLITTO;
    RoboBlocks.LANG_COLOUR_ADVANCED = profile.ADVANCED;
    RoboBlocks.LANG_COLOUR_VARIABLES = profile.VARIABLES;
    RoboBlocks.LANG_COLOUR_PROCEDURES = profile.PROCEDURES;
    RoboBlocks.LANG_COLOUR_RASPBERRY = profile.RASPBERRY;
    RoboBlocks.BACKGROUND_COLOUR_TOOLBOX = profile.TOOLBOX;
    RoboBlocks.BACKGROUND_COLOUR_CANVAS = profile.CANVAS;
    RoboBlocks.BACKGROUND_COLOUR_CODE = profile.CODE;
    RoboBlocks.TITLE_COLOR = profile.TITLE_COLOR;
    RoboBlocks.COMMENT_COLOR = profile.COMMENT_COLOR;
    RoboBlocks.STRING_COLOR = profile.STRING_COLOR;
    RoboBlocks.LITERAL_COLOR = profile.LITERAL_COLOR;
    RoboBlocks.KEYWORD_COLOR = profile.KEYWORD_COLOR;
    RoboBlocks.NUMBER_COLOR = profile.NUMBER_COLOR;

    Object.assign(RoboBlocks, RoboBlocksURLs);

    // Source: src/blockly.extensions.js
    /* global Blockly */
    /* jshint sub:true */

    /**
     * Generates toolbox XML with all blocks defined in Blockly.Blocks
     * @return {String} Blockly toolbox XML
     */
    Blockly.createToolbox = function () {
        var blocks = {};
        for (var block in this.Blocks) {

            // important check that this is objects own property 
            // not from prototype prop inherited
            if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                var category = this.Blocks[block].category;
                blocks[category] = blocks[category] || [];
                blocks[category].push(block);
            }
        }

        var toolbox = '<xml id="toolbox" style="display: none">';

        var categoryItem = function (type) {
            toolbox += '<block type="' + type + '"></block>';
        };

        for (block in blocks) {
            if (blocks.hasOwnProperty(block)) {
                toolbox += '<category id="' + block + '" name="' + block + '">';
                blocks[block].forEach(categoryItem);
                toolbox += '</category>';
            }

        }
        toolbox += '</xml>';
        return toolbox;
    };

    Blockly.createLocalizedToolbox = function (labelArray, oldLocale, newLocale) {
        // Obtener las traducciones del nuevo idioma
        var translations = translationMap[newLocale];
        // Crear un nuevo objeto donde se modificará la se  gunda parte de cada subarray
        var localizedObject = labelArray.reduce((obj, [id, originalText]) => {
            // Buscar la clave en el idioma original (en este caso, el idioma anterior)
            var translationKey = Object.keys(translationMap[oldLocale]).find(key => {
                return translationMap[oldLocale][key] === originalText;
            });

            // Si se encuentra la clave, busca la traducción en el nuevo idioma
            if (translationKey) {
                var translatedText = translations[translationKey] || originalText; // Busca la traducción por la clave encontrada
                obj[id] = translatedText; // Actualiza con la traducción
            } else {
                obj[id] = originalText; // Si no se encuentra la clave, mantener el texto original
            }
            return obj;
        }, {});

        return localizedObject; // Retornar el objeto con las traducciones
    };

    // Source: src/blocks/advanced_conversion/advanced_conversion.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * advanced_conversion code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.advanced_conversion = function () {
        var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
        var code = '';
        var a = RoboBlocks.findPinMode(value_num);
        code += a['code'];
        value_num = a['pin'];

        var convertion = this.getFieldValue('CONV');

        code += JST['advanced_conversion']({
            'value_num': value_num,
            'convertion': convertion
        }, window.programmingLanguage); // Añade este argumento

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * advanced_conversion block definition
     * @type {Object}
     */
    Blockly.Blocks.advanced_conversion = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        /**
         * advanced_conversion initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_CONVERT'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_DECIMAL') || 'DEC', 'DEC'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_HEXADECIMAL') || 'HEX', 'HEX'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_OCTAL') || 'OCT', 'OCT'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_BINARY') || 'BIN', 'BIN']
                ]), 'CONV');
            this.appendValueInput('NUM', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_VALUE'))
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck(Number);
            this.setOutput(true, Number);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_TOOLTIP'));
        }
    };

    // Source: src/blocks/advanced_map/advanced_map.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * advanced_map code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.advanced_map = function () {
        var num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
        var from_min = Blockly.Arduino.valueToCode(this, 'FROM_MIN', Blockly.Arduino.ORDER_NONE);
        var from_max = Blockly.Arduino.valueToCode(this, 'FROM_MAX', Blockly.Arduino.ORDER_NONE);
        var to_min = Blockly.Arduino.valueToCode(this, 'TO_MIN', Blockly.Arduino.ORDER_NONE);
        var to_max = Blockly.Arduino.valueToCode(this, 'TO_MAX', Blockly.Arduino.ORDER_NONE);

        var code = '';
        var a = RoboBlocks.findPinMode(num);
        code += a['code'];
        num = a['pin'];

        a = RoboBlocks.findPinMode(from_min);
        code += a['code'];
        from_min = a['pin'];

        a = RoboBlocks.findPinMode(from_max);
        code += a['code'];
        from_max = a['pin'];

        a = RoboBlocks.findPinMode(to_min);
        code += a['code'];
        to_min = a['pin'];

        a = RoboBlocks.findPinMode(to_max);
        code += a['code'];
        to_max = a['pin'];


        code += JST['advanced_map']({
            'num': num,
            'from_min': from_min,
            'from_max': from_max,
            'to_min': to_min,
            'to_max': to_max
        }, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * advanced_map block definition
     * @type {Object}
     */
    Blockly.Blocks.advanced_map = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
        helpUrl: RoboBlocks.URL_MATH,
        /**
         * advanced_map initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.appendValueInput('NUM', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_MAP'))
                .setCheck(Number);
            this.appendValueInput('FROM_MIN', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_FROM'))
                .setCheck(Number);
            this.appendValueInput('FROM_MAX', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                .setCheck(Number);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
            this.appendValueInput('TO_MIN', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_TO'))
                .setCheck(Number);
            this.appendValueInput('TO_MAX', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                .setCheck(Number);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
            this.setInputsInline(true);
            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_TOOLTIP'));
        }
    };

    // Source: src/blocks/array_get/array_get.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */
    /**
     * array_get code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.array_get = function () {
        // Numeric value.
        var variable = this.getFieldValue('VAR');
        var index = this.getFieldValue('INDEX');
        var code = variable + '[' + index + ']';
        // -4.abs() returns -4 in Dart due to strange order of operation choices.
        // -4 is actually an operator and a number.  Reflect this in the order.
        // var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.array_get = {
        // Numeric value.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'),
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldVariable(' '), 'VAR');
            // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
            this.appendDummyInput('DUMMY2').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET1')).appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.array_get.validator), 'INDEX').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET2'));
            this.setOutput(true, Number);
            this.setInputsInline(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ARRAY_GET_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            this.last_variable = this.getFieldValue('VAR');
            if (!this.last_variables) {
                this.last_variables = Blockly.Variables.allVariables();
            }
            var variables = Blockly.Variables.allVariables();
            for (var i in variables) {
                if (Blockly.Variables.allVariables()[i] !== this.last_variables[i]) {
                    try {
                        this.removeInput('DUMMY');
                        this.removeInput('DUMMY2');
                    } catch (e) { }
                    this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    this.appendDummyInput('DUMMY2').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET1')).appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.array_get.validator), 'INDEX').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET2'));
                    this.setFieldValue(this.last_variable, 'VAR');
                    this.last_variables = Blockly.Variables.allVariables();
                }
            }
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            if (this.getFieldValue('VAR')) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
            }
            return false;
        }
    };
    Blockly.Blocks.array_get.validator = function (text) {
        // Ensure that only a number may be entered.
        // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
        var n = window.parseFloat(text || 0);
        return window.isNaN(n) ? null : String(n);
    };
    // Source: src/blocks/base_delay/base_delay.js
    /* global Blockly, JST, RoboBlocks */


    // COPIA DE LED PRUEBAS
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.bq_led_2 = function () {

        var sensorTypeMappings = {
            '0': 'analogInput',
            '1': 'analogInput',
            '2': 'digitalInput',
            '3': 'distanceSensor',
            '4': 'digitalOutput',
            '5': 'digitalOutput',
            '6': 'stepperMotor',
            '7': 'display7seg',
            '8': 'servoMotor',
            '9': 'dcMotor',
            '10': 'imuSensor',
            '11': 'displayLcd',
            '12': 'displayOled',
            '13': 'SoftwareSerial',
            '14': 'SoftwareSerial'
        };

        var dropdown_pin = this.getFieldValue('PORT');
        var dropdown_mod = this.getFieldValue('MOD');
        var name_mod = this.getFieldValue('VAR');

        var sensor = sensorTypeMappings[this.getFieldValue('MOD')];

        var code = '';
        Blockly.Arduino.definitions_['define_test_mod'] = JST['bq_test_def_definitions']({}, window.programmingLanguage);
        Blockly.Arduino.definitions_['declare_var_mod' + dropdown_mod + dropdown_pin] = JST['mod_def_declare']({
            'dropdown_mod': sensor,
            'dropdown_pin': dropdown_pin,
            'name_mod': name_mod
        }, window.programmingLanguage);

        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        if (RoboBlocks.isVariable(dropdown_pin)) {
            code += JST['bq_test_setups']({
                'name_mod': name_mod
            }, window.programmingLanguage);
        } else {
            code += JST['bq_test_setups']({
                'name_mod': name_mod
            }, window.programmingLanguage);
        }
        return code;
    };
    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.bq_led_2 = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        tags: ['modular'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.declararModular, resources.dimensions.declararModular.width * options.zoom, resources.dimensions.declararModular.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_DEFINE'))
                .appendField(new Blockly.FieldTextInput('name'), 'VAR')
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_TYPE'))
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_MODULAR_SENSOR_POTENTIOMETER'), '0'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_SENSOR_INFRARED'), '1'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_SENSOR_BUTTON'), '2'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_SENSOR_DISTANCE'), '3'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_LED'), '4'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_BUZZER'), '5'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_STEPPER_MOTOR'), '6'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_DISPLAY_7_SEG'), '7'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_SERVO_MOTOR'), '8'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_DC_MOTOR'), '9'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_SENSOR_IMU'), '10'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_LCD'), '11'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_ACTUATOR_OLED'), '12'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_MODULE_BLUETOOTH'), '13'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_MODULE_WIFI'), '14'],
                ]), "MOD")
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_PORT'))
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['10', '10'],
                ]), "PORT");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setFieldValue(newName, 'VAR');
            }
        },
        isVariable: function (varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            return false;
        },
        validName: function (name) {
            if (name && name.length > 0) {
                var i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                name = name.replace(/([ ])/g, '_');
                name = name.replace(/([áàâä])/g, 'a');
                name = name.replace(/([éèêë])/g, 'e');
                name = name.replace(/([íìîï])/g, 'i');
                name = name.replace(/([óòôö])/g, 'o');
                name = name.replace(/([úùûü])/g, 'u');
                name = name.replace(/([ñ])/g, 'n');
                name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                    var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                    if (name === reserved_words[j]) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                        name = '';
                        break;
                    } else {
                        this.setWarningText(null);
                    }
                }
            }
            return name;
        },
        onchange: function () {
            if (this.last_variable !== this.getFieldValue('VAR')) {
                var name = this.getFieldValue('VAR');
                name = this.validName(name);
                try {
                    this.setFieldValue(name, 'VAR');
                } catch (e) { }
                this.last_variable = name;
            }

        }
    };

    //Copia de DigitalRead
    // Source: src/blocks/inout_digital_read/inout_digital_read.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_read code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_read = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        var var_mod = a['pin'];

        code += JST['test_inout_digital_read']({
            'var_mod': var_mod,
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    /**
     * inout_digital_read block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_read = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_read initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI_3);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.leerModular, resources.dimensions.leerModular.width * options.zoom, resources.dimensions.leerModular.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_READ'))
                .appendField(new Blockly.FieldImage(resources.images.leerModularPanel, resources.dimensions.leerModular.width * options.zoom, resources.dimensions.leerModular.height * options.zoom))
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.setOutput(true);
            this.setOutput(true, Boolean);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
        },

        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento true-false
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_op = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_stat = this.getFieldValue('STAT');
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_inout_digital_write']({
            'dropdown_pin': dropdown_pin,
            'dropdown_stat': dropdown_stat
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_op = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_WRITE);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_WRITE'))
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_MODULAR_STATE')).appendField(new Blockly.FieldDropdown([
                [RoboBlocks.locales.getKey('LANG_MODULAR_ON'), 'HIGH'],
                [RoboBlocks.locales.getKey('LANG_MODULAR_OFF'), 'LOW']
            ]), 'STAT');
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento true-false 2
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_bool = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_stat = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_inout_digital_write_bool']({
            'dropdown_pin': dropdown_pin,
            'dropdown_stat': dropdown_stat
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_bool = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_WRITE);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_WRITE'))
                //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_MODULAR_STATE'));
            this.appendValueInput('BOOL', Boolean)
                .setCheck(Boolean);
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento number
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_number = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_motor_stepper']({
            'dropdown_pin': dropdown_pin,
            'dropdown_num': dropdown_num
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_number = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI_2);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_STEPPER_MOTOR'))
                //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_VALUE'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento number 4 digitos
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_number_4 = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_stat = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_inout_digital_write']({
            'dropdown_pin': dropdown_pin,
            'dropdown_stat': dropdown_stat
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_number_4 = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI_2);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_WRITE_SEVEN_DISPLAY'))
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_FOUR_VALUE'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento number servo
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_number_servo = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_motor_servo']({
            'dropdown_pin': dropdown_pin,
            'dropdown_num': dropdown_num
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_number_servo = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_SERVO_MOTOR'))
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_VALUE_TO_180'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento number servo
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_number_dc = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
        var dropdown_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_motor_dc']({
            'dropdown_pin': dropdown_pin,
            'dropdown_velo': dropdown_stat,
            'dropdown_dir': dropdown_num
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_number_dc = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_DC_MOTOR'))
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_DC_MOTOR_POWER'));
            this.appendValueInput('STAT')
                .setCheck(Boolean)
                .appendField(RoboBlocks.locales.getKey('LANG_MODULAR_DC_MOTOR_DIRECTION'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Copia de digital Write 1 argumento i2c
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write_i2c = function () {
        var dropdown_pin = this.getFieldValue('VAR');
        var dropdown_stat = this.getFieldValue('STAT');
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        code += JST['test_inout_digital_write']({
            'dropdown_pin': dropdown_pin,
            'dropdown_stat': dropdown_stat
        }, window.programmingLanguage);

        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write_i2c = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI_3);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom, resources.dimensions.escribirModular.height * options.zoom));
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_MODULAR_LCD'))
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_MODULAR_LCD_TEXT'))
                .appendField(new Blockly.FieldTextInput('', String), 'VAR');
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // copia de inout
    // Source: src/blocks/inout_highlow/inout_highlow.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * inout_highlow code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_highlow = function () {
        var bool_value = this.getFieldValue('BOOL');

        var code = JST['inout_highlow']({
            'bool_value': bool_value,
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * inout_highlow block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_highlow = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_highlow initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI_3);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.escribirModular, resources.dimensions.escribirModular.width * options.zoom, resources.dimensions.escribirModular.height * options.zoom))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_MODULAR_FORWARD'), 'HIGH'],
                    [RoboBlocks.locales.getKey('LANG_MODULAR_BACKWARD'), 'LOW']
                ]), 'BOOL');
            this.setOutput(true, Boolean);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
        }
    };

    // BETTO BLOQUES
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_def_variables = function () {

        var code = '';
        Blockly.Arduino.definitions_['define_betto_mod'] = JST['betto_definitions']({}, window.programmingLanguage);
        Blockly.Arduino.definitions_['declare_var_mod'] = JST['mod_def_declare_betto']({}, window.programmingLanguage);

        code += JST['betto_setups']({}, window.programmingLanguage);

        return code;
    };
    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_def_variables = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.ottoMain, resources.dimensions.ottoMain.width * options.zoom, resources.dimensions.ottoMain.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_DEFINE'))
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_movs_select = function () {
        var actions = {
            '0': 'walk(1,',
            '1': 'walk(1,',
            '2': 'turn(1,',
            '3': 'turn(1,',
            '4': 'bend(1,',
            '5': 'bend(1,',
            '6': 'shakedLeg(1,',
            '7': 'shakedLeg(1,',
            '8': 'jump(1,',
        };

        var actionKey = this.getFieldValue('ACTION');
        var action = actions[actionKey];
        var speed = parseInt(this.getFieldValue('VEL'));
        var speedValue;

        switch (speed) {
            case 0:
                speedValue = '1000';
                break;
            case 1:
                speedValue = '2000';
                break;
            case 2:
                speedValue = '3000';
                break;
            case 3:
                speedValue = '750';
                break;
            case 4:
                speedValue = '500';
                break;
            case 5:
                speedValue = '250';
                break;
            default:
                speedValue = '1000';
        }

        var code = 'betto.' + action + speedValue;

        // Añadir la dirección al final de la llamada de función
        if (actionKey === '0' || actionKey === '2' || actionKey === '4' || actionKey === '6') {
            code += ',1';
        } else if (actionKey === '8') {
            code += '';
        } else {
            code += ',-1';
        }

        code += ');\n';

        return code;
    };

    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_movs_select = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput('VALUE')
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOVEMENT'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_FORWARD'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_BACKWARD'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_TURN_LEFT'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_TURN_RIGHT'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_TILT_LEFT'), '4'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_TILT_RIGHT'), '5'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_SHAKE_LEFT'), '6'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_SHAKE_RIGHT'), '7'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_UP'), '8'],
                ]), "ACTION")
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_NORMAL'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_SLOW'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_VERY_SLOW'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_FAST'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_VERY_FAST'), '4'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_TOO_FAST'), '5'],
                ]), "VEL");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_movs_select_dance = function () {
        var actions = {
            '0': 'moonwalker(1,',
            '1': 'moonwalker(1,',
            '2': 'crusaito(1,',
            '3': 'crusaito(1,',
            '4': 'flapping(1,',
            '5': 'flapping(1,',
        };

        var actionKey = this.getFieldValue('ACTION');
        var action = actions[actionKey];
        var speed = parseInt(this.getFieldValue('VEL'));
        var speedValue;
        var size = parseInt(this.getFieldValue('SIZE')); // Obtener el tamaño seleccionado

        // Determinar el valor de velocidad basado en la selección
        switch (speed) {
            case 0:
                speedValue = '1000';
                break;
            case 1:
                speedValue = '2000';
                break;
            case 2:
                speedValue = '3000';
                break;
            case 3:
                speedValue = '750';
                break;
            case 4:
                speedValue = '500';
                break;
            case 5:
                speedValue = '250';
                break;
            default:
                speedValue = '1000';
        }

        // Determinar el valor de tamaño basado en la selección
        var sizeValue;
        switch (size) {
            case 0:
                sizeValue = '25';
                break;
            case 1:
                sizeValue = '10';
                break;
            case 2:
                sizeValue = '40';
                break;
            default:
                sizeValue = '25';
        }

        var code = 'betto.' + action + speedValue + ',' + sizeValue; // Añadir tamaño al código

        // Añadir la dirección al final de la llamada de función
        if (actionKey === '0' || actionKey === '2' || actionKey === '4' || actionKey === '6') {
            code += ',1';
        } else if (actionKey === '8') {
            code += '';
        } else {
            code += ',-1';
        }

        code += ');\n';

        return code;
    };


    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_movs_select_dance = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput('VALUE')
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_DANCE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_MOONWALK_LEFT'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_MOONWALK_RIGHT'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_CRUSAITO_LEFT'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_CRUSAITO_RIGHT'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_FLAP_UP'), '4'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_FLAP_DOWN'), '5'],
                ]), "ACTION")
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_NORMAL'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_SLOW'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_VERY_SLOW'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_FAST'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_VERY_FAST'), '4'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_TOO_FAST'), '5'],
                ]), "VEL")
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_SIZE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_SIZE_NORMAL'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_SIZE_SMALL'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_SIZE_LARGE'), '2'],
                ]), "SIZE");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos MOVE
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_movs_select_move = function () {
        var actions = {
            '0': 'swing(1,',
            '1': 'updown(1,',
            '2': 'tiptoeSwing(1,',
            '3': 'jitter(1,',
            '4': 'ascendingTurn(1,'
        };

        var actionKey = this.getFieldValue('ACTION');
        var action = actions[actionKey];
        var speed = parseInt(this.getFieldValue('VEL'));
        var speedValue;
        var size = parseInt(this.getFieldValue('SIZE')); // Obtener el tamaño seleccionado

        // Determinar el valor de velocidad basado en la selección
        switch (speed) {
            case 0:
                speedValue = '1000';
                break;
            case 1:
                speedValue = '2000';
                break;
            case 2:
                speedValue = '3000';
                break;
            case 3:
                speedValue = '750';
                break;
            case 4:
                speedValue = '500';
                break;
            case 5:
                speedValue = '250';
                break;
            default:
                speedValue = '1000';
        }

        // Determinar el valor de tamaño basado en la selección
        var sizeValue;
        switch (size) {
            case 0:
                sizeValue = '25';
                break;
            case 1:
                sizeValue = '10';
                break;
            case 2:
                sizeValue = '40';
                break;
            default:
                sizeValue = '25';
        }

        var code = 'betto.' + action + speedValue + ',' + sizeValue; // Añadir tamaño al código

        code += ');\n';

        return code;
    };


    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_movs_select_move = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput('VALUE')
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOVE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_MENEITO'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_UP_DOWN'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_TIPTOE_SWAY'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_RESTLESS'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_DANCE_SPIN_ASCENDING'), '4'],
                ]), "ACTION")
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_NORMAL'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_SLOW'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_VERY_SLOW'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_FAST'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_VERY_FAST'), '4'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_VELOCITY_TOO_FAST'), '5'],
                ]), "VEL")
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_SIZE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_SIZE_NORMAL'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_SIZE_SMALL'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_SIZE_LARGE'), '2'],
                ]), "SIZE");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_select_sound = function () {
        var actions = {
            '0': 'S_superHappy',
            '1': 'S_happy',
            '2': 'S_happy_short',
            '3': 'S_sad',
            '4': 'S_confused',
            '5': 'S_cuddly',
            '6': 'S_OhOoh',
            '7': 'S_OhOoh2',
            '8': 'S_surprise',
            '9': 'S_connection',
            '10': 'S_disconnection',
            '11': 'S_buttonPushed',
            '12': 'S_mode1',
            '13': 'S_mode2',
            '14': 'S_mode3',
            '15': 'S_sleeping',
            '16': 'S_fart1',
            '17': 'S_fart2',
            '18': 'S_fart3'
        };

        var actionKey = this.getFieldValue('ACTION');
        var action = actions[actionKey];

        var code = 'betto.sing(' + action;

        code += ');\n';

        return code;
    };

    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_select_sound = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput('VALUE')
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOVE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_HAPPY'), '0'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_JOYFUL'), '1'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_CONTENT'), '2'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_SAD'), '3'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_CONFUSED'), '4'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_AFFectionate'), '5'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_OH'), '6'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_OOH'), '7'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_SURPRISE'), '8'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_CONNECTION'), '9'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_DISCONNECTION'), '10'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_BUTTON'), '11'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_MODE_1'), '12'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_MODE_2'), '13'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_MODE_3'), '14'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_SLEEP'), '15'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_FART_1'), '16'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_FART_2'), '17'],
                    [RoboBlocks.locales.getKey('LANG_BETTO_ACTION_FART_3'), '18'],
                ]), "ACTION")
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_select_sound = function () {
        var dropdown_otto_sound = this.getFieldValue('otto_note');
        var dropdown_otto_duration = this.getFieldValue('otto_note_duration');

        var code = 'betto.sing(' + dropdown_otto_sound + ',' + dropdown_otto_duration + ',1);\n';
        return code;
    };

    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_select_sound = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.appendDummyInput().appendField("🎼")
                .appendField(new Blockly.FieldDropdown([["C₄ | Do₄", "262"], ["D₄ | Re₄", "294"], ["E₄ | Mi₄", "330"], ["F₄ | Fa₄", "349"], ["G₄ | Sol₄", "392"], ["A₄ | La₄", "440"], ["B₄ | Si₄", "494"], ["C₅ | Do₅", "523"], ["D₅ | Re₅", "587"], ["E₅ | Mi₅", "659"], ["F₅ | Fa₅", "698"], ["G₅ | Sol₅", "784"], ["A₅ | La₅", "880"], ["B₅ | Si₅", "988"], ["C₆ | Do₆", "1047"], ["D₆ | Re₆", "1175"], ["E₆ | Mi₆", "1319"], ["F₆ | Fa₆", "1397"], ["G₆ | Sol₆", "1568"], ["A₆ | La₆", "1760"], ["B₆ | Si₆", "1976"]]), "otto_note");
            this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(" ")
                .appendField(new Blockly.FieldDropdown([["\u266B", "125"], ["\u266A", "250"], ["\u2669", "500"], ["𝅗𝅥", "1000"], ["𝅝", "2000"]]), "otto_note_duration");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND 3 campos
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_select_sound_vars = function () {
        var Hz1 = Blockly.Arduino.valueToCode(this, 'Hz1', Blockly.Arduino.ORDER_ATOMIC);
        var duration = Blockly.Arduino.valueToCode(this, 'duration', Blockly.Arduino.ORDER_ATOMIC);
        var silent = Blockly.Arduino.valueToCode(this, 'silent', Blockly.Arduino.ORDER_ATOMIC);

        var code = "betto._tone( " + Hz1 + "," + duration + "," + silent + ");\n";
        return code;
    };


    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_select_sound_vars = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.appendDummyInput().appendField("🎼 Hz")
            this.appendValueInput("Hz1")
            this.appendValueInput("duration").setCheck("Number").appendField("⏰");
            this.appendValueInput("silent").setCheck("Number").appendField("🔇");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND 5 campos
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_select_sound_5_vars = function () {
        var Hz1 = Blockly.Arduino.valueToCode(this, 'Hz1', Blockly.Arduino.ORDER_ATOMIC);
        var Hz2 = Blockly.Arduino.valueToCode(this, 'Hz2', Blockly.Arduino.ORDER_ATOMIC);
        var prop = Blockly.Arduino.valueToCode(this, 'prop', Blockly.Arduino.ORDER_ATOMIC);
        var duration = Blockly.Arduino.valueToCode(this, 'duration', Blockly.Arduino.ORDER_ATOMIC);
        var silent = Blockly.Arduino.valueToCode(this, 'silent', Blockly.Arduino.ORDER_ATOMIC);

        var code = "betto.bendTones( " + Hz1 + "," + Hz2 + "," + prop + "," + duration + "," + silent + ");\n";
        return code;
    };


    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_select_sound_5_vars = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.appendDummyInput().appendField("🎼 Hz1")
            this.appendValueInput("Hz1")
            this.appendValueInput("Hz2").appendField("Hz2");
            this.appendValueInput("prop").setCheck("Number").appendField("P");
            this.appendValueInput("duration").setCheck("Number").appendField("⏰");
            this.appendValueInput("silent").setCheck("Number").appendField("🔇");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos Gesto
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_select_gest = function () {
        var dropdown_otto_gesture = this.getFieldValue('otto_gesture');

        var code = 'betto.playGesture(' + dropdown_otto_gesture + ');\n';
        return code;
    };


    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_select_gest = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        tags: ['Betto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.ottoEmoji, resources.dimensions.ottoEmoji.width * options.zoom, resources.dimensions.ottoEmoji.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_GESTURE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_HAPPY'), "BettoSuperHappy"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_JOYFUL'), "BettoHappy"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_SAD'), "BettoSad"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_SLEEPING'), "BettoSleeping"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_CONFUSED'), "BettoConfused"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_FRETUL'), "BettoFretful"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_LOVE'), "BettoLove"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_ANGRY'), "BettoAngry"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_MAGIC'), "BettoMagic"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_WAVE'), "BettoWave"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_VICTORY'), "BettoVictory"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_FAIL'), "BettoFail"],
                    [RoboBlocks.locales.getKey('LANG_BETTO_GESTURE_FART'), "BettoFart"],
                ]), "otto_gesture")
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        },
    };

    //Matriz 8x8
    Blockly.Arduino.mouth_matrix8x8 = function (block) {
        var code = '';
        for (var i = 0; i < 64; i++) {

            if (this.getFieldValue('Pixel' + i) != 'rgb(255, 255, 255)') {
                var on = this.getFieldValue('Pixel' + i) == "TRUE" ? "1" : "0";
                var row = i + 1
                { if (i >= 0 && i <= 7) row = 0 } { if (i >= 8 && i < 16) row = 1 } { if (i >= 16 && i < 24) row = 2 } { if (i >= 24 && i < 32) row = 3 }
                { if (i >= 32 && i < 40) row = 4 } { if (i >= 40 && i < 48) row = 5 } { if (i >= 48 && i < 56) row = 6 } { if (i >= 56 && i < 64) row = 7 }
                var col = i
                { if (i > 1 && i <= 7) col = i } { if (i >= 8 && i < 16) col = i - 8 } { if (i >= 16 && i < 24) col = i - 16 } { if (i >= 24 && i < 32) col = i - 24 }
                { if (i >= 32 && i < 40) col = i - 32 } { if (i >= 40 && i < 48) col = i - 40 } { if (i >= 48 && i < 56) col = i - 48 } { if (i >= 56 && i < 64) col = i - 56 }
                code += 'betto.setLed(' + row + ',' + col + ',' + on + ');'
            }
        };
        for (var i = 0; i < 8; i++) { if (this.getFieldValue('eyes_pixel' + i) == 'TRUE') row = 0; };
        return code + '\n';
    };

    Blockly.Blocks.mouth_matrix8x8 = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        init: function () {
            this.appendDummyInput().appendField('  ').appendField(' 0').appendField(' 1').appendField(' 2').appendField('  3').appendField('  4').appendField(' 5').appendField(' 6').appendField(' 7');
            Blockly.FieldCheckbox.CHECK_CHAR = '🔴';
            this.appendDummyInput().appendField('0 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel0')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel8')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel16')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel24')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel32')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel40')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel48')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel56');
            this.appendDummyInput().appendField('1 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel1')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel9')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel17')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel25')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel33')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel41')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel49')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel57');
            this.appendDummyInput().appendField('2 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel2')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel10')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel18')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel26')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel34')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel42')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel50')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel58');
            this.appendDummyInput().appendField('3 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel3')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel11')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel19')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel27')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel35')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel43')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel51')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel59');
            this.appendDummyInput().appendField('4 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel4')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel12')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel20')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel28')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel36')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel44')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel52')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel60');
            this.appendDummyInput().appendField('5 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel5')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel13')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel21')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel29')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel37')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel45')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel53')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel61');
            this.appendDummyInput().appendField('6 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel6')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel14')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel22')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel30')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel38')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel46')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel54')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel62');
            this.appendDummyInput().appendField('7 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel7')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel15')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel23')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel31')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel39')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel47')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel55')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel63');
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        },
    };

    // Copia de digital Write 1 argumento true-false para BETTO
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.test_inout_digital_write = function () {
        var code = '';
        code += JST['betto_home']({}, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.test_inout_digital_write = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_BETTO_STAND'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        }
    };

    // Copia de digital Write 1 argumento true-false para BETTO 2
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_clear_mouth = function () {
        var code = '';
        code += 'betto.clearMouth();'
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_clear_mouth = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_CLEAN'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        }
    };

    // Mouth
    Blockly.Blocks.betto_mouth_text = {

        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        init: function () {
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_TEXT')).appendField(new Blockly.FieldTextInput('I AM OTTO'), 'input');
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        }
    };
    Blockly.Arduino.betto_mouth_text = function (block) {
        var text_input = block.getFieldValue('input');
        var code = 'betto.writeText(' + '"' + text_input + '"' + ',80);\n';
        return code;
    };

    // Brightness
    Blockly.Blocks.betto_mouth_brightness = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        init: function () {
            this.appendValueInput("brightness")
                .setCheck(Number)
                .appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_GLOW'));
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        }
    };

    Blockly.Arduino.betto_mouth_brightness = function (block) {
        var brightness = Blockly.Arduino.valueToCode(block, "brightness", Blockly.Arduino.ORDER_ATOMIC);
        var code = "betto.matrixIntensity(" + brightness + ");\n";
        return code;
    };

    // Boca
    Blockly.Blocks.betto_mouth_face = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        init: function () {
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_BETTO_MOUTH')).appendField(new Blockly.FieldDropdown([
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_HAPPY'), "happyOpen"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_JOYFUL'), "happyClosed"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_SMILE'), "smile"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_SAD'), "23"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_DEJECTED'), "24"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_SMALL_SURPRISE'), "smallSurprise"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_BIG_SURPRISE'), "bigSurprise"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_CONFUSED'), "confused"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_TONGUE_OUT'), "tongueOut"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_CULITO'), "culito"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_SERIOUS'), "lineMouth"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_DISAPPOINTED'), "21"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_LOVE'), "heart"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_VAMPIRE'), "vamp1"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_TEETH'), "vamp2"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_NO'), "xMouth"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_OK'), "okMouth"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_QUESTION'), "27"],
                [RoboBlocks.locales.getKey('LANG_BETTO_MOUTH_THUNDER'), "thunder"],
            ]), "otto9_mouth_choice");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
        }
    };
    Blockly.Arduino.betto_mouth_face = function (block) {
        var dropdown_otto9_mouth_choice = block.getFieldValue('otto9_mouth_choice');
        var code = 'betto.putMouth(' + dropdown_otto9_mouth_choice + ');\n';
        return code;
    };

    // MIC

    Blockly.Arduino.Sound_sensor_3 = function (block) {

        window.programmingLanguage === 'python' && (Blockly.Arduino.definitions_['import_analog_library'] = JST['analog_library']({}, window.programmingLanguage));

        var PinSound = block.getFieldValue('PIN_SOUND');
        var Status = this.getFieldValue('OUTPUT_VALUE');

        var code;
        var card = window.localStorage.card;

        if (card == "MRTnode") {
            Blockly.Arduino.setups_['setup_analogResolutionESP32'] = 'analogReadResolution(10);\n';
        }
        if (Status == '0') {
            if (window.programmingLanguage === 'cpp') {
                var code = 'map(analogRead(' + PinSound + '),0,1023,0,100)';
            } else if (window.programmingLanguage === 'python') {
                var code = 'analog_read = lambda canal: MCP3008().channels[canal].value\nmap_function = lambda x, in_min, in_max, out_min, out_max: (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min\n' + 'map_function(analog_read(' + PinSound + '),0,1023,0,100)';
            }
        }
        else {
            if (window.programmingLanguage === 'cpp') {
                var code = 'analogRead(' + PinSound + ')';
            } else if (window.programmingLanguage === 'python') {
                var code = 'analog_read = lambda canal: MCP3008().channels[canal].value\n' +
                    'analog_read(' + PinSound + ')';
            }
        }

        return code;
    };

    Blockly.Blocks.Sound_sensor_3 = {
        helpUrl: '',
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        init: function () {
            var card = window.localStorage.card;
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(resources.images.sensorNoise, resources.dimensions.sensorNoise.width * options.zoom, resources.dimensions.sensorNoise.height * options.zoom))
                .appendField(Blockly.Msg.SOUND_NAME)
                .appendField(Blockly.Msg.PIN)
                .appendField(new Blockly.FieldDropdown([
                    ["A0", "A0"],
                    ["A1", "A1"],
                    ["A2", "A2"],
                    ["A3", "A3"],
                    ["A4", "A4"],
                    ["A5", "A5"],
                    ["A6", "A6"],
                    ["A7", "A7"]
                ]), "PIN_SOUND")
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["Valor (0-1023)", "1"], ["Porcentaje (0-100%)", "0"]]), "OUTPUT_VALUE");
            this.setOutput(true, 'Number');
            this.setInputsInline(true);
            this.setTooltip('Analog sound sensor');
        }
    };

    // Ultrasonido
    Blockly.Blocks.ultrasonic_distance = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(resources.images.sensorUltrasound, resources.dimensions.sensorUltrasound.width * options.zoom, resources.dimensions.sensorUltrasound.height * options.zoom))
                .appendField("#").appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']]), "US_NUMBER")
                .appendField(RoboBlocks.locales.getKey('LANG_ULTRASOUND_DISTANCE'));
            this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
            this.setInputsInline(false);
            this.setOutput(true, "Number");
        }
    };
    Blockly.Arduino.ultrasonic_distance = function (block) {
        var code;
        var us_number = this.getFieldValue('US_NUMBER');

        code = 'ultrasound_distance_simple()';
        return code;
    };

    // CARLITTO BLOQUES
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.carlitto_def_variables = function () {

        var code = '';
        var MOT_LEFT = this.getFieldValue('MOT_LEFT');
        var MOT_RIGHT = this.getFieldValue('MOT_RIGHT');
        var POT_LEFT = this.getFieldValue('POT_LEFT');
        var POT_RIGHT = this.getFieldValue('POT_RIGHT');
        var POT = this.getFieldValue('POT');
        Blockly.Arduino.definitions_['define_carlitto_mod'] = JST['carlitto_definitions']({}), window.programmingLanguage;
        Blockly.Arduino.definitions_['declare_var_mod_carlitto'] = JST['mod_def_declare_carlitto']({
            'MOT_LEFT': MOT_LEFT,
            'MOT_RIGHT': MOT_RIGHT,
            'POT_LEFT': POT_LEFT,
            'POT_RIGHT': POT_RIGHT,
            'POT': POT
        }, window.programmingLanguage);

        code += JST['carlitto_setups']({}, window.programmingLanguage);

        return code;
    };
    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.carlitto_def_variables = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CARLITTO'),
        tags: ['Carlitto'],
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CARLITTO);

            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(resources.images.declararCarlitto, resources.dimensions.declararCarlitto.width * options.zoom, resources.dimensions.declararCarlitto.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_DEFINE'));

            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_MOTOR_LEFT'))
                .setAlign(Blockly.ALIGN_LEFT)
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), "MOT_LEFT")
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_POWER_LEFT'))
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_dc.validator), 'POT_LEFT');

            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_MOTOR_RIGHT'))
                .setAlign(Blockly.ALIGN_LEFT)
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), "MOT_RIGHT")
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_POWER_RIGHT'))
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_dc.validator), 'POT_RIGHT');

            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_POTENTIOMETER'))
                .setAlign(Blockly.ALIGN_LEFT)
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), "POT");

            this.setPreviousStatement(true);
            this.setNextStatement(true);

            // Tooltip
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
    };

    // COPIA DE LED PRUEBAS para BETTO Movimientos Gesto
    // Source: src/blocks/bq_led/bq_led.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_led code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.betto_select_gest = function () {
        var dropdown_carlitto_move = this.getFieldValue('carlitto_move');

        if (window.programmingLanguage === 'cpp') {
            var code = 'carlitto.move(' + dropdown_carlitto_move + ');\n';
        } else if (window.programmingLanguage === 'python') {
            var code = 'carlitto.move("' + dropdown_carlitto_move + '");\n';
        }
        return code;
    };


    /**
     * bq_led block definition
     * @type {Object}
     */
    Blockly.Blocks.betto_select_gest = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CARLITTO'),
        tags: ['Carlitto'],
        helpUrl: '',
        /**
         * bq_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CARLITTO);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.movimientoCarlitto, resources.dimensions.movimientoCarlitto.width * options.zoom, resources.dimensions.movimientoCarlitto.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_MOVE_IN'))
                .appendField(new Blockly.FieldDropdown([
                    ["ADELANTE", "ADELANTE"],
                    ["ATRAS", "ATRAS"],
                    ["DERECHA", "DERECHA"],
                    ["IZQUIERDA", "IZQUIERDA"]
                ]), "carlitto_move");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        },
    };

    // Copia de digital Write 1 argumento true-false para BETTO
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.carlitto_stop = function () {
        var code = '';
        code += JST['carlitto_stop']({}, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.carlitto_stop = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CARLITTO'),
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CARLITTO);
            this.appendDummyInput().appendField(new Blockly.FieldImage(resources.images.pararCarlitto, resources.dimensions.pararCarlitto.width * options.zoom, resources.dimensions.pararCarlitto.height * options.zoom))
                .appendField(RoboBlocks.locales.getKey('LANG_CARLITTO_STOP'));
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
        }
    };

    // Source: src/blocks/base_map/base_map.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * base_map code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.base_map = function () {
        var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
        var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);

        var code = '';
        var a = RoboBlocks.findPinMode(value_num);
        code += a['code'];
        value_num = a['pin'];

        a = RoboBlocks.findPinMode(value_dmax);
        code += a['code'];
        value_dmax = a['pin'];

        code += JST['base_map']({
            'value_num': value_num,
            'value_dmax': value_dmax
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.base_map = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.appendValueInput('NUM', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP'))
                .setCheck(Number);
            this.appendValueInput('DMAX', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_VALUE_TO'))
                .setCheck(Number);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_BRACKET'));
            this.setInputsInline(true);
            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_TOOLTIP'));
        }
    };

    // Source: src/blocks/base_millis/base_millis.js
    /* global Blockly, JST, RoboBlocks */

    //register with blockly arduino
    Blockly.Arduino.base_millis = function () {
        var code = 'millis()';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.base_millis = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_LED,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_MILLIS'));
            this.setOutput(true, 'Number');
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_MILLIS_TOOLTIP'));
        }
    };

    //register with blockly arduino
    Blockly.Arduino.base_delay = function () {
        var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(delay_time);
        code += a['code'];
        delay_time = a['pin'];

        Blockly.Arduino.definitions_['define_mod_time'] = JST['time_library']({}, window.programmingLanguage);

        code += JST['base_delay']({
            'delay_time': delay_time
        }, window.programmingLanguage);
        return code;
    };

    Blockly.Blocks.base_delay = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_LED,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendValueInput('DELAY_TIME', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT'))
                .setCheck(Number);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_DELAY_TOOLTIP'));
        }
    };
    // Source: src/blocks/bq_bluetooth_def/bq_bluetooth_def.js
    /* global Blockly, options, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * bq_bluetooth_def code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.bq_bluetooth_def = function () {
        var dropdown_pin, NextPIN;
        if (this.getFieldValue('TOGGLE') === 'FALSE') {
            dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            NextPIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
            var a = RoboBlocks.findPinMode(dropdown_pin);
            Blockly.Arduino.setups_['setup_bluetooth_pinmode'] = a['code'];
            dropdown_pin = a['pin'];
            a = RoboBlocks.findPinMode(NextPIN);
            Blockly.Arduino.setups_['setup_bluetooth_pinmode2'] = a['code'];
            NextPIN = a['pin'];
        } else {
            dropdown_pin = 0;
            NextPIN = 1;
        }
        var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
        var b = RoboBlocks.findPinMode(baud_rate);
        Blockly.Arduino.setups_['setup_bluetooth_pinmode3'] = b['code'];
        baud_rate = b['pin'];

        Blockly.Arduino.definitions_['declare_var_blueToothSerial' + dropdown_pin] = 'SoftwareSerial blueToothSerial(' + dropdown_pin + ',' + NextPIN + ');\n';
        Blockly.Arduino.definitions_['define_softwareserial'] = JST['bq_bluetooth_def_definitions']({
            'dropdown_pin': dropdown_pin,
            'NextPIN': NextPIN
        }, window.programmingLanguage);
        Blockly.Arduino.setups_['setup_bluetooth_'] = JST['bq_bluetooth_def_setups']({
            'baud_rate': baud_rate,
            'dropdown_pin': dropdown_pin,
            'NextPIN': NextPIN
        }, window.programmingLanguage);
        return '';
    };
    /**
     * bq_bluetooth__def block definition
     * @type {Object}
     */
    Blockly.Blocks.bq_bluetooth_def = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        tags: ['bluetooth'],
        helpUrl: RoboBlocks.URL_BT,
        /**
         * bq_bluetooth_slave initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF')).appendField(new Blockly.FieldImage(resources.images.bqmod03, resources.dimensions.bqmod03.width * options.zoom, resources.dimensions.bqmod03.height * options.zoom));
            this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput().appendField('zum?').appendField(new Blockly.FieldCheckbox('FALSE'), 'TOGGLE').setAlign(Blockly.ALIGN_RIGHT);
            this.checkBT();
            this.last_toogle = this.getFieldValue('TOGGLE');
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_TOOLTIP'));
        },
        checkBT: function () {
            if (this.getFieldValue('TOGGLE') === 'FALSE') {
                try {
                    this.removeInput('PIN');
                    this.removeInput('PIN2');
                } catch (e) { }
                this.appendValueInput('PIN').setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_PIN1')).setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('PIN2').setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_PIN2')).setAlign(Blockly.ALIGN_RIGHT);
            } else {
                try {
                    this.removeInput('PIN');
                    this.removeInput('PIN2');
                } catch (e) { }
            }
        },
        onchange: function () {
            if (this.getFieldValue('TOGGLE') !== this.last_toogle) {
                this.checkBT();
                this.last_toogle = this.getFieldValue('TOGGLE');
            }
        }
    };
    // Source: src/blocks/bq_bluetooth_receive/bq_bluetooth_receive.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * bq_bluetooth_slave code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.bq_bluetooth_receive = function () {
        var code = JST['bq_bluetooth_receive']({}, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * bq_bluetooth_slave block definition
     * @type {Object}
     */
    Blockly.Blocks.bq_bluetooth_receive = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        tags: ['bluetooth'],
        helpUrl: RoboBlocks.URL_BT,
        /**
         * bq_bluetooth_slave initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_RECEIVE'));
            // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));

            this.setInputsInline(false);


            this.setOutput(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_RECEIVE_TOOLTIP'));
        }
    };

    // Source: src/blocks/bq_bluetooth_send/bq_bluetooth_send.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * bq_bluetooth_slave code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.bq_bluetooth_send = function () {
        var statement_send = Blockly.Arduino.valueToCode(this, 'SNT', Blockly.Arduino.ORDER_ATOMIC) || '';

        var code = '';
        var a = RoboBlocks.findPinMode(statement_send);
        code += a['code'];
        statement_send = a['pin'];

        code += JST['bq_bluetooth_send']({
            'statement_send': statement_send
        }, window.programmingLanguage);

        return code;
    };

    /**
     * bq_bluetooth_send block definition
     * @type {Object}
     */
    Blockly.Blocks.bq_bluetooth_send = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        tags: ['bluetooth'],
        helpUrl: RoboBlocks.URL_BT,
        /**
         * bq_bluetooth_send initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_SEND'));
            // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));

            this.appendValueInput('SNT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_SEND_SEND'));

            this.setInputsInline(false);


            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_SEND_TOOLTIP'));
        }
    };


    // Source: src/blocks/bt_serial_available/bt_serial_available.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * serial_available code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.bt_serial_available = function () {
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        branch = branch.replace(/&quot;/g, '"');

        var code = JST['bt_serial_available']({
            'branch': branch
        }, window.programmingLanguage);
        return code;
    };

    /**
     * serial_available block definition
     * @type {Object}
     */
    Blockly.Blocks.bt_serial_available = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_BT,
        tags: ['bluetooth'],
        /**
         * bt_serial_available initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BT_SERIAL_AVAILABLE'));
            this.appendStatementInput('DO')
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_BT_SERIAL_AVAILABLE_TOOLTIP'));
        }
    };

    // Source: src/blocks/controls_doWhile/controls_doWhile.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * controls_doWhile code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.controls_doWhile = function () {
        // Do while/until loop.
        var argument0 = Blockly.Arduino.valueToCode(this, 'WHILE', Blockly.Arduino.ORDER_NONE) || '';
        argument0 = argument0.replace(/&quot;/g, '"');
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        branch = branch.replace(/&quot;/g, '"');
        var code = '';
        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
            branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            // branch = branch.substring(0, branch.length - 2);
        }
        // branch=branch.replace(/&amp;/g, '');
        if (this.getFieldValue('MODE') === 'UNTIL') {
            if (!argument0.match(/^\w+$/)) {
                argument0 = '(' + argument0 + ')';
            }
            argument0 = '!' + argument0;
        }
        code += JST['controls_doWhile']({
            'argument0': argument0,
            'branch': branch
        }, window.programmingLanguage);
        return code;
    };
    Blockly.Blocks.controls_doWhile = {
        // Do/while loop.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        // helpUrl: RoboBlocks.URL_DOWHILE,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO'));
            this.appendValueInput('WHILE').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
                [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
            ]), 'MODE');
            // this.appendValueInput('WHILE').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_WHILE'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_TOOLTIP'));
        }
    };

    // Source: src/blocks/controls_execute/controls_execute.js
    /* global Blockly, profiles, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * controls_execute code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.controls_execute = function () {
        var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        content = content.replace(/^"/, '');
        content = content.replace(/"$/g, '');
        if ((window.programmingLanguage === 'cpp' && content.match(/^#include /)) ||
            (window.programmingLanguage === 'python' && content.match(/^import /))) {
            var include_code = JST['controls_execute']({
                'content': content
            }, window.programmingLanguage);
            if ('define_include' in Blockly.Arduino.definitions_) {
                Blockly.Arduino.definitions_['define_include'] += include_code;
            } else {
                Blockly.Arduino.definitions_['define_include'] = include_code;
            }
        } else {
            code += JST['controls_execute']({
                'content': content
            }, window.programmingLanguage);
        }
        return code;
    };
    /**
     * control_execute block definition
     * @type {Object}
     */
    Blockly.Blocks.controls_execute = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        // helpUrl: RoboBlocks.URL_SERIE,
        /**
         * controls_execute initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_EXECUTE'));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_EXECUTE_TOOLTIP'));
        }
    };

    // Source: src/blocks/controls_flow_statements/controls_flow_statements.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */

    /**
     * controls_flow_statements code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.controls_flow_statements = function () {
        // Flow statements: continue, break.
        switch (this.getFieldValue('FLOW')) {
            case 'BREAK':
                if (window.programmingLanguage === 'cpp') {
                    return 'break;\n';
                } else if (window.programmingLanguage === 'python') {
                    return 'break\n';
                } else if (window.programmingLanguage === 'js') {
                    return 'break;\n';
                }
                break;
            case 'CONTINUE':
                if (window.programmingLanguage === 'cpp') {
                    return 'continue;\n';
                } else if (window.programmingLanguage === 'python') {
                    return 'continue\n';
                } else if (window.programmingLanguage === 'js') {
                    return 'continue;\n';
                }
                break;
        }
        throw 'Unknown flow statement.';
    };


    Blockly.Blocks.controls_flow_statements = {
        // Flow statements: continue, break.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_FLOW_STATEMENTS,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            var dropdown = new Blockly.FieldDropdown(
                [
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK') || 'BREAK', 'BREAK'],
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE') || 'CONTINUE', 'CONTINUE']
                ]);
            this.appendDummyInput()
                .appendField(dropdown, 'FLOW')
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP'));
            this.setPreviousStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('FLOW');
                return Blockly.Blocks.controls_flow_statements.TOOLTIPS[op];
            });
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            var legal = false;
            // Is the block nested in a control statement?
            var block = this;
            do {
                if (block.type === 'controls_repeat' ||
                    block.type === 'controls_forEach' ||
                    block.type === 'controls_for' ||
                    block.type === 'controls_whileUntil') {
                    legal = true;
                    break;
                }
                block = block.getSurroundParent();
            } while (block);
            if (legal) {
                this.setWarningText(null);
            } else {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_WARNING'));
                } catch (err) {
                    console.log('Captured error: ', err);
                }
            }
        }
    };

    Blockly.Blocks.controls_flow_statements.TOOLTIPS = {
        BREAK: RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK'),
        CONTINUE: RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE')
    };

    // Source: src/blocks/controls_for/controls_for.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */
    /**
     * controls_for code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.controls_for = function () {
        var variable0 = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
        var argument0 = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
        var argument1 = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
            branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
        }

        var code = '';
        var a = RoboBlocks.findPinMode(variable0);
        code += a['code'];
        variable0 = a['pin'];

        a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        a = RoboBlocks.findPinMode(argument1);
        code += a['code'];
        argument1 = a['pin'];

        var up = parseFloat(argument0) <= parseFloat(argument1);
        if (window.programmingLanguage === 'cpp') {
            code += 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0 + (up ? '++' : '--') + ') {\n' + branch + '}\n';
        } else if (window.programmingLanguage === 'python') {
            code += 'for ' + variable0 + ' in range(' + argument0 + ', ' + (up ? argument1 + ' + 1' : argument1 + ' - 1') + ', ' + (up ? '1' : '-1') + '):\n';
            code += branch + '\n';
        } else if (window.programmingLanguage === 'js') {
            code += 'for (let ' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0 + (up ? '++' : '--') + ') {\n' + branch + '}\n';
        }

        return code;
    };
    Blockly.Blocks.controls_for = {
        // For loop.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_FOR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendValueInput('VAR').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'));
            // .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.appendValueInput('FROM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
            this.appendValueInput('TO').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
            this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                return RoboBlocks.LANG_CONTROLS_FOR_TOOLTIP.replace('%1', thisBlock.getFieldValue('VAR'));
            });
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        isVariable: function (varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            return false;
        },
        onchange: function () {
            try {
                if (this.isVariable(Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ATOMIC))) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_FROM_WARNING'));
                } else if (this.isVariable(Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ATOMIC))) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_TO_WARNING'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }


            // if (!this.workspace) {
            //     // Block has been deleted.
            //     return;
            // }
            // if (!this.last_variables){
            //     this.last_variables=Blockly.Variables.allVariables();
            // }
            // var variables=Blockly.Variables.allVariables();
            // for (var i in variables){
            //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
            //         try{
            //             this.removeInput('DUMMY');
            //             this.removeInput('FROM');
            //             this.removeInput('TO');
            //             this.removeInput('DO');
            //             this.appendDummyInput('DUMMY')
            //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'))
            //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
            //             this.appendValueInput('FROM')
            //                 .setCheck(Number)
            //                 .setAlign(Blockly.ALIGN_RIGHT)
            //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
            //             this.appendValueInput('TO')
            //                 .setCheck(Number)
            //                 .setAlign(Blockly.ALIGN_RIGHT)
            //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
            //             this.appendStatementInput('DO')
            //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO'));
            //         }catch(e){}
            //         this.last_variables=Blockly.Variables.allVariables();
            //     }
            // }
            // try {
            //     if (!this.exists()) {
            //         this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
            //     } else {
            //         this.setWarningText(null);
            //     }
            // } catch (e) {}
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
    };
    // Source: src/blocks/controls_if/controls_if.js
    /* global Blockly, JST,  RoboBlocks */
    /* jshint sub:true */

    /**
     * controls_if code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.controls_if = function () {
        // If/elseif/else condition.
        var n = 0;
        var argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
        argument = argument.replace(/&quot;/g, '"');

        var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);

        var code = '';
        var a = RoboBlocks.findPinMode(argument);
        code += a['code'];
        argument = a['pin'];

        code += JST['controls_if']({
            'argument': argument,
            'branch': branch
        }, window.programmingLanguage);


        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
            branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            // branch=branch.replace(/&amp;/g, '');

            code += JST['controls_elseif']({
                'argument': argument,
                'branch': branch
            }, window.programmingLanguage);
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'ELSE');
            // branch=branch.replace(/&amp;/g, '');

            code += JST['controls_else']({
                'argument': argument,
                'branch': branch
            }, window.programmingLanguage);
        }
        branch = branch.replace(/&quot;/g, '"');
        code = code.replace(/&quot;/g, '"');

        return code + '\n';
    };

    /**
     * controls_if block definition
     * @type {Object}
     */
    Blockly.Blocks.controls_if = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_IF,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendValueInput('IF0')
                .setCheck(Boolean)
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
            this.appendStatementInput('DO0')
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                'controls_if_else'
            ]));
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_1');
                } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_2');
                } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_3');
                } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_4');
                }
                return '';
            });
            this.elseifCount_ = 0;
            this.elseCount_ = 0;
        },
        mutationToDom: function () {
            if (!this.elseifCount_ && !this.elseCount_) {
                return null;
            }
            var container = document.createElement('mutation');
            if (this.elseifCount_) {
                container.setAttribute('elseif', this.elseifCount_);
            }
            if (this.elseCount_) {
                container.setAttribute('else', 1);
            }
            return container;
        },
        domToMutation: function (xmlElement) {
            this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
            this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
            for (var x = 1; x <= this.elseifCount_; x++) {
                this.appendValueInput('IF' + x)
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSEIF'));
                this.appendStatementInput('DO' + x)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
            if (this.elseCount_) {
                this.appendStatementInput('ELSE')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
        },
        decompose: function (workspace) {
            var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
            containerBlock.initSvg();
            var connection = containerBlock.getInput('STACK').connection;
            for (var x = 1; x <= this.elseifCount_; x++) {
                var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
                elseifBlock.initSvg();
                connection.connect(elseifBlock.previousConnection);
                connection = elseifBlock.nextConnection;
            }
            if (this.elseCount_) {
                var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
                elseBlock.initSvg();
                connection.connect(elseBlock.previousConnection);
            }
            return containerBlock;
        },
        compose: function (containerBlock) {
            // Disconnect the else input blocks and remove the inputs.
            if (this.elseCount_) {
                this.removeInput('ELSE');
            }
            this.elseCount_ = 0;
            // Disconnect all the elseif input blocks and remove the inputs.
            for (var x = this.elseifCount_; x > 0; x--) {
                this.removeInput('IF' + x);
                this.removeInput('DO' + x);
            }
            this.elseifCount_ = 0;
            // Rebuild the block's optional inputs.
            var clauseBlock = containerBlock.getInputTargetBlock('STACK');
            while (clauseBlock) {
                switch (clauseBlock.type) {
                    case 'controls_if_elseif':
                        this.elseifCount_++;
                        var ifInput = this.appendValueInput('IF' + this.elseifCount_)
                            .setCheck(Boolean)
                            .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSEIF'));
                        var doInput = this.appendStatementInput('DO' + this.elseifCount_);
                        doInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                            .setAlign(Blockly.ALIGN_RIGHT);
                        // Reconnect any child blocks.
                        if (clauseBlock.valueConnection_) {
                            ifInput.connection.connect(clauseBlock.valueConnection_);
                        }
                        if (clauseBlock.statementConnection_) {
                            doInput.connection.connect(clauseBlock.statementConnection_);
                        }
                        break;
                    case 'controls_if_else':
                        this.elseCount_++;
                        var elseInput = this.appendStatementInput('ELSE');
                        elseInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSE'))
                            .setAlign(Blockly.ALIGN_RIGHT);
                        // Reconnect any child blocks.
                        if (clauseBlock.statementConnection_) {
                            elseInput.connection.connect(clauseBlock.statementConnection_);
                        }
                        break;
                    default:
                        throw 'Unknown block type.';
                }
                clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            }
        },
        saveConnections: function (containerBlock) {
            // Store a pointer to any connected child blocks.
            var clauseBlock = containerBlock.getInputTargetBlock('STACK');
            var x = 1;
            while (clauseBlock) {
                switch (clauseBlock.type) {
                    case 'controls_if_elseif':
                        var inputIf = this.getInput('IF' + x);
                        var inputDo = this.getInput('DO' + x);
                        clauseBlock.valueConnection_ =
                            inputIf && inputIf.connection.targetConnection;
                        clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                        x++;
                        break;
                    case 'controls_if_else':
                        inputDo = this.getInput('ELSE');
                        clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                        break;
                    default:
                        throw 'Unknown block type.';
                }
                clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            }
        }
    };

    Blockly.Blocks.controls_if_if = {
        // If condition.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_IF_Field_IF'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendStatementInput('STACK');
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_IF_TOOLTIP'));
            this.contextMenu = false;
        }
    };

    Blockly.Blocks.controls_if_elseif = {
        // Else-If condition.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_TOOLTIP'));
            this.contextMenu = false;
        }
    };

    Blockly.Blocks.controls_if_else = {
        // Else condition.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.setPreviousStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_TOOLTIP'));
            this.contextMenu = false;
        }
    };



    // Source: src/blocks/controls_setupLoop/controls_setupLoop.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * controls_setup code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.controls_setupLoop = function () {
        // Add statements to setup.
        var branch = Blockly.Arduino.statementToCode(this, 'SETUP');
        branch = branch.replace(/&quot;/g, '"');

        Blockly.Arduino.setups_['X_SETUP'] = JST['controls_setupLoop']({
            'branch': branch
        }, window.programmingLanguage);

        var content = Blockly.Arduino.statementToCode(this, 'LOOP');
        content = content.replace(/&quot;/g, '"');
        content = JST['controls_setupLoop']({
            'branch': content
        }, window.programmingLanguage);

        return content;
    };
    Blockly.Blocks.controls_setupLoop = {
        // Setup statements.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        // helpUrl: RoboBlocks.URL_SETUP,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendStatementInput('SETUP').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE'));
            this.appendStatementInput('LOOP').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE'));
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_TOOLTIP'));
        }
    };

    // Source: src/blocks/controls_switch/controls_switch.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */

    /**
     * controls_switch code generation
     * @return {String} Code generated with block parameters
     */
    var indentSentences = function (sentences) {
        var splitted_sentences = sentences.split('\n');
        var final_sentences = '';
        for (var i in splitted_sentences) {
            final_sentences += '  ' + splitted_sentences[i] + '\n';
        }
        return final_sentences;
    };

    Blockly.Arduino.controls_switch = function () {
        // switch condition.
        var n = 0;
        var argument = Blockly.Arduino.valueToCode(this, 'IF0',
            Blockly.Arduino.ORDER_NONE) || '';
        var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
        branch = indentSentences(branch);
        // branch=branch.replace(/&amp;/g, '');

        var code = '';
        var a = RoboBlocks.findPinMode(argument);
        code += a['code'];
        argument = a['pin'];

        code += 'switch (' + argument + ')\n{';
        for (n = 1; n <= this.switchCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'SWITCH' + n, Blockly.Arduino.ORDER_NONE) || '';
            branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            branch = indentSentences(branch);
            branch = branch.substring(0, branch.length - 1);
            // branch=branch.replace(/&amp;/g, '');

            code += ' \n  case ' + argument + ': \n  {\n' + branch + '  break;\n  }';
        }
        if (this.defaultCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'DEFAULT');
            branch = indentSentences(branch);
            branch = branch.substring(0, branch.length - 1);
            // branch=branch.replace(/&amp;/g, '');

            code += '  \n  default:\n  {\n' + branch + '}';
        }
        return code + '\n}\n';
    };


    Blockly.Blocks.controls_switch = {
        // switch condition.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_SWITCH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendValueInput('IF0')
                .setCheck(Boolean)
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setMutator(new Blockly.Mutator(['controls_switch_case', 'controls_switch_default']));
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                if (!thisBlock.switchCount_ && !thisBlock.defaultCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_1');
                } else if (!thisBlock.switchCount_ && thisBlock.defaultCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_2');
                } else if (thisBlock.switchCount_ && !thisBlock.defaultCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_3');
                } else if (thisBlock.switchCount_ && thisBlock.defaultCount_) {
                    return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_4');
                }
                return '';
            });
            this.defaultCount_ = 0;
        },
        mutationToDom: function () {
            if (!this.switchCount_ && !this.defaultCount_) {
                return null;
            }
            var container = document.createElement('mutation');
            if (this.switchCount_) {
                container.setAttribute('case', this.switchCount_);
            }
            if (this.defaultCount_) {
                container.setAttribute('default', 1);
            }
            return container;
        },
        domToMutation: function (xmlElement) {
            this.switchCount_ = window.parseInt(xmlElement.getAttribute('case'), 10);
            this.defaultCount_ = window.parseInt(xmlElement.getAttribute('default'), 10);
            for (var x = 1; x <= this.switchCount_; x++) {
                this.appendValueInput('SWITCH' + x)
                    .setCheck(Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setInputsInline(true);
                this.appendStatementInput('DO' + x)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
            if (this.defaultCount_) {
                this.appendStatementInput('DEFAULT')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
        },
        decompose: function (workspace) {
            var containerBlock = Blockly.Block.obtain(workspace, 'controls_switch_switch');
            containerBlock.initSvg();
            var connection = containerBlock.getInput('STACK').connection;
            for (var x = 1; x <= this.switchCount_; x++) {
                var switchBlock = Blockly.Block.obtain(workspace, 'controls_switch_case');
                switchBlock.initSvg();
                connection.connect(switchBlock.previousConnection);
                connection = switchBlock.nextConnection;
            }
            if (this.defaultCount_) {
                var defaultBlock = Blockly.Block.obtain(workspace, 'controls_switch_default');
                defaultBlock.initSvg();
                connection.connect(defaultBlock.previousConnection);
            }
            return containerBlock;
        },
        compose: function (containerBlock) {
            // Disconnect the switch blocks and remove the inputs.
            if (this.defaultCount_) {
                this.removeInput('DEFAULT');
            }
            this.defaultCount_ = 0;
            // Disconnect all the switch input blocks and remove the inputs.
            for (var x = this.switchCount_; x > 0; x--) {
                this.removeInput('SWITCH' + x);
                this.removeInput('DO' + x);
            }
            this.switchCount_ = 0;
            // Rebuild the block's optional inputs.
            var clauseBlock = containerBlock.getInputTargetBlock('STACK');
            while (clauseBlock) {
                switch (clauseBlock.type) {
                    case 'controls_switch_case':
                        this.switchCount_++;
                        var case_lang;
                        if (this.switchCount_ === 1) {
                            case_lang = RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_IS');
                        } else {
                            case_lang = RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE');
                        }
                        var switchInput = this.appendValueInput('SWITCH' + this.switchCount_)
                            .setCheck(Number)
                            .appendField(case_lang)
                            .setAlign(Blockly.ALIGN_RIGHT);
                        this.setInputsInline(true);

                        var doInput = this.appendStatementInput('DO' + this.switchCount_);
                        doInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DO'))
                            .setAlign(Blockly.ALIGN_RIGHT);
                        // Reconnect any child blocks.
                        if (clauseBlock.valueConnection_) {
                            switchInput.connection.connect(clauseBlock.valueConnection_);
                        }
                        if (clauseBlock.statementConnection_) {
                            doInput.connection.connect(clauseBlock.statementConnection_);
                        }
                        break;
                    case 'controls_switch_default':
                        this.defaultCount_++;
                        var defaultInput = this.appendStatementInput('DEFAULT');
                        defaultInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                            .setAlign(Blockly.ALIGN_RIGHT);
                        // Reconnect any child blocks.
                        if (clauseBlock.statementConnection_) {
                            defaultInput.connection.connect(clauseBlock.statementConnection_);
                        }
                        break;
                    default:
                        throw 'Unknown block type.';
                }
                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }
        },
        saveConnections: function (containerBlock) {
            // Store a pointer to any connected child blocks.
            var clauseBlock = containerBlock.getInputTargetBlock('STACK');
            var x = 1;
            while (clauseBlock) {
                switch (clauseBlock.type) {
                    case 'controls_switch_case':
                        var inputSwitch = this.getInput('SWITCH' + x);
                        var inputDo = this.getInput('DO' + x);
                        clauseBlock.valueConnection_ =
                            inputSwitch && inputSwitch.connection.targetConnection;
                        clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                        x++;
                        break;
                    case 'controls_switch_default':
                        inputDo = this.getInput('DEFAULT');
                        clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                        break;
                    default:
                        throw 'Unknown block type.';
                }
                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }
        }
    };


    Blockly.Blocks.controls_switch_switch = {
        // If condition.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendStatementInput('STACK');
            this.setTooltip('Switch');
            this.contextMenu = false;
        }
    };

    Blockly.Blocks.controls_switch_case = {
        // case condition.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip('Switch case');
            this.contextMenu = false;
        }
    };

    Blockly.Blocks.controls_switch_default = {
        // default condition.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.setPreviousStatement(true);
            this.setTooltip('Switch default');
            this.contextMenu = false;
        }
    };
    // Source: src/blocks/controls_whileUntil/controls_whileUntil.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * controls_whileUntil code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.controls_whileUntil = function () {
        // Do while/until loop.
        var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_NONE) || '';
        argument0 = argument0.replace(/&quot;/g, '"');
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        branch = branch.replace(/&quot;/g, '"');

        var code = '';
        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
            branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            // branch = branch.substring(0, branch.length - 2);
        }
        // branch=branch.replace(/&amp;/g, '');

        if (this.getFieldValue('MODE') === 'UNTIL') {
            if (!argument0.match(/^\w+$/)) {
                argument0 = '(' + argument0 + ')';
            }
            argument0 = '!' + argument0;
        }
        code += JST['controls_whileUntil']({
            'argument0': argument0,
            'branch': branch
        }, window.programmingLanguage);
        return code;
    };
    Blockly.Blocks.controls_whileUntil = {
        // Do while/until loop.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
        helpUrl: RoboBlocks.URL_WHILE,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
            this.appendValueInput('BOOL').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
                [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
            ]), 'MODE');
            this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_INPUT_DO'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('MODE');
                return Blockly.Blocks.controls_whileUntil.TOOLTIPS[op];
            });
        }
    };
    Blockly.Blocks.controls_whileUntil.TOOLTIPS = {
        WHILE: RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE'),
        UNTIL: RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL')
    };
    // Source: src/blocks/inout_analog_read/inout_analog_read.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_analog_read code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.inout_analog_read = function () {
        var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';

        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        if (RoboBlocks.isVariable(dropdown_pin)) {
            code += JST['inout_analog_read_setups']({
                'dropdown_pin': dropdown_pin,
            }, window.programmingLanguage);
        } else {
            Blockly.Arduino.setups_['setup_green_analog_read' + dropdown_pin] = JST['inout_analog_read_setups']({
                'dropdown_pin': dropdown_pin,
            }, window.programmingLanguage);
        }
        code += JST['inout_analog_read']({
            'dropdown_pin': dropdown_pin,
        }, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    /**
     * inout_analog_read block definition
     * @type {Object}
     */
    Blockly.Blocks.inout_analog_read = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_analog_read initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ'));
            this.setOutput(true, Number);
            this.setInputsInline(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'));
        }
    };
    // Source: src/blocks/inout_analog_write/inout_analog_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_analog_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.inout_analog_write = function () {
        var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
        var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];

        var b = RoboBlocks.findPinMode(value_num);
        code += b['code'];
        value_num = b['pin'];


        if (RoboBlocks.isVariable(dropdown_pin)) {
            code += JST['inout_analog_write_setups']({
                'dropdown_pin': dropdown_pin,
                'value_num': value_num
            }, window.programmingLanguage);
        } else {
            Blockly.Arduino.setups_['setup_analog_write' + dropdown_pin] = JST['inout_analog_write_setups']({
                'dropdown_pin': dropdown_pin,
                'value_num': value_num
            }, window.programmingLanguage);
        }

        code += JST['inout_analog_write']({
            'dropdown_pin': dropdown_pin,
            'value_num': value_num
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_analog_write block definition
     * @type {Object}
     */
    Blockly.Blocks.inout_analog_write = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_analog_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE'));
            this.appendValueInput('NUM', Number).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE')).setCheck(Number);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'));
        }
    };
    // Source: src/blocks/inout_builtin_led/inout_builtin_led.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * inout_builtin_led code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.inout_builtin_led = function () {
        var dropdown_stat = this.getFieldValue('STAT');

        Blockly.Arduino.setups_['setup_green_led_13'] = JST['inout_builtin_led_setups']({}, window.programmingLanguage);

        var code = JST['inout_builtin_led']({
            'dropdown_stat': dropdown_stat
        }, window.programmingLanguage);

        return code;
    };

    /**
     * inout_builtin_led block definition
     * @type {Object}
     */
    Blockly.Blocks.inout_builtin_led = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_LED,
        /**
         * inout_builtin_led initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED'))
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_STATE'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_ON') || 'ON', 'HIGH'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_OFF') || 'OFF', 'LOW']
                ]), 'STAT');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOOLTIP'));
        }
    };

    // Source: src/blocks/inout_digital_read/inout_digital_read.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_read code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.inout_digital_read = function () {
        var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];
        if (RoboBlocks.isVariable(dropdown_pin)) {
            code += JST['inout_digital_read_setups']({
                'dropdown_pin': dropdown_pin,
            }, window.programmingLanguage);
        } else {
            Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
                'dropdown_pin': dropdown_pin,
            }, window.programmingLanguage);
        }
        code += JST['inout_digital_read']({
            'dropdown_pin': dropdown_pin,
        }, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    /**
     * inout_digital_read block definition
     * @type {Object}
     */
    Blockly.Blocks.inout_digital_read = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_read initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ'));
            this.setOutput(true, Boolean);
            this.setInputsInline(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
        }
    };
    // Source: src/blocks/inout_digital_write/inout_digital_write.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * inout_digital_write code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.inout_digital_write = function () {
        var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
        var dropdown_stat = this.getFieldValue('STAT');
        var code = '';
        var a = RoboBlocks.findPinMode(dropdown_pin);
        code += a['code'];
        dropdown_pin = a['pin'];
        if (RoboBlocks.isVariable(dropdown_pin)) {
            code += JST['inout_digital_write_setups']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            }, window.programmingLanguage);
        } else {
            Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            }, window.programmingLanguage);
        }
        code += JST['inout_digital_write']({
            'dropdown_pin': dropdown_pin,
            'dropdown_stat': dropdown_stat
        }, window.programmingLanguage);
        return code;
    };
    /**
     * inout_digital_write block definition
     * @type {Object}
     */
    Blockly.Blocks.inout_digital_write = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_digital_write initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE')).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN'));
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE')).appendField(new Blockly.FieldDropdown([
                [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_HIGH') || 'HIGH', 'HIGH'],
                [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_LOW') || 'LOW', 'LOW']
            ]), 'STAT');
            this.setPreviousStatement(true, null);
            this.setInputsInline(true);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
        }
    };
    // Source: src/blocks/inout_highlow/inout_highlow.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * inout_highlow code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.inout_highlow = function () {
        var bool_value = this.getFieldValue('BOOL');

        var code = JST['inout_highlow']({
            'bool_value': bool_value,
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * inout_highlow block definition
     * @type {Object}
     */
    Blockly.Blocks.inout_highlow = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        /**
         * inout_highlow initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendDummyInput('')
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_HIGH') || 'HIGH', 'HIGH'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_LOW') || 'LOW', 'LOW']
                ]), 'BOOL');
            this.setOutput(true, Boolean);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
        }
    };

    // Source: src/blocks/logic_boolean/logic_boolean.js
    /* global Blockly, RoboBlocks */

    /**
     * logic_null code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.logic_null = function () {
        return ['NULL', Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * logic_boolean code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.logic_boolean = function () {
        // Boolean values true and false.
        var booleanMap = {
            'cpp': { 'TRUE': 'true', 'FALSE': 'false' },
            'python': { 'TRUE': 'True', 'FALSE': 'False' },
            'js': { 'TRUE': 'True', 'FALSE': 'False' },
        };
        var code = booleanMap[window.programmingLanguage][this.getFieldValue('BOOL')];

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.logic_boolean = {
        // Boolean data type: true and false.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
        helpUrl: RoboBlocks.URL_LOGIC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
            this.setOutput(true, Boolean);
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE'), 'TRUE'],
                    [RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_FALSE'), 'FALSE']
                ]), 'BOOL');
            this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_TOOLTIP'));
        }
    };
    // Source: src/blocks/logic_compare/logic_compare.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * logic_compare code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.logic_compare = function () {
        // Comparison operator.
        var mode = this.getFieldValue('OP');
        var operator = Blockly.Arduino.logic_compare.OPERATORS[mode];
        var order = (operator === '==' || operator === '!=') ?
            Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
        var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
        var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';

        var code = '';

        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        a = RoboBlocks.findPinMode(argument1);
        code += a['code'];
        argument1 = a['pin'];

        code += JST['logic_compare']({
            'argument0': argument0,
            'argument1': argument1,
            'operator': operator
        }, window.programmingLanguage);

        return [code, order];
    };

    Blockly.Arduino.logic_compare.OPERATORS = {
        EQ: '==',
        NEQ: '!=',
        LT: '<',
        LTE: '<=',
        GT: '>',
        GTE: '>='
    };

    Blockly.Blocks.logic_compare = {
        // Comparison operator.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
        helpUrl: RoboBlocks.URL_LOGIC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
            this.setOutput(true, Boolean);
            this.appendValueInput('A');
            this.appendValueInput('B')
                .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
            this.setInputsInline(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('OP');
                return Blockly.Blocks.logic_compare.TOOLTIPS[op];
            });
        }
    };

    Blockly.Blocks.logic_compare.OPERATORS = [
        ['=', 'EQ'],
        ['\u2260', 'NEQ'],
        ['<', 'LT'],
        ['\u2264', 'LTE'],
        ['>', 'GT'],
        ['\u2265', 'GTE']
    ];

    Blockly.Blocks.logic_compare.TOOLTIPS = {
        EQ: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_EQ'),
        NEQ: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_NEQ'),
        LT: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LT'),
        LTE: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LTE'),
        GT: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GT'),
        GTE: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GTE')
    };

    // Source: src/blocks/logic_negate/logic_negate.js
    /* global Blockly, JST, RoboBlocks */

    /**
     * logic_negate code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.logic_negate = function () {
        // Negation.
        var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
        var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || 'false';
        var code = '';
        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        code += JST['logic_negate']({
            'argument0': argument0
        }, window.programmingLanguage);

        //'!' + argument0;
        return [code, order];
    };


    Blockly.Blocks.logic_negate = {
        // Negation.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
        helpUrl: RoboBlocks.URL_LOGIC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
            this.setOutput(true, Boolean);
            this.appendValueInput('BOOL')
                .setCheck(Boolean)
                .appendField(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_INPUT_NOT'));
            this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_TOOLTIP'));
        }
    };

    // Source: src/blocks/logic_operation/logic_operation.js
    /* global Blockly, RoboBlocks */
    /**
     * logic_operation code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.logic_operation = function () {
        // Operations 'and', 'or'.

        var operatorMap = {
            'cpp': { 'AND': '&&', 'OR': '||' },
            'python': { 'AND': 'and', 'OR': 'or' },
            'js': { 'AND': '&&', 'OR': '||' },
        };
        var operator = operatorMap[window.programmingLanguage][this.getFieldValue('OP')];

        var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : Blockly.Arduino.ORDER_LOGICAL_OR;
        var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
        var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';

        var code = '';
        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];
        a = RoboBlocks.findPinMode(argument1);
        code += a['code'];
        argument1 = a['pin'];

        code += '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';
        return [code, order];
    };
    Blockly.Blocks.logic_operation = {
        // Logical operations: 'and', 'or'.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
        helpUrl: RoboBlocks.URL_LOGIC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
            this.setOutput(true, Boolean);
            this.appendValueInput('A').setCheck(Boolean);
            this.appendValueInput('B').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
                [RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_AND') || 'AND', 'AND'],
                [RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_OR') || 'OR', 'OR']
            ]), 'OP');
            this.setInputsInline(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var op = thisBlock.getFieldValue('OP');
                return Blockly.Blocks.logic_operation.TOOLTIPS[op];
            });
        }
    };
    Blockly.Blocks.logic_operation.TOOLTIPS = {
        AND: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_AND'),
        OR: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_OR')
    };
    // Source: src/blocks/math_arithmetic/math_arithmetic.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * math_arithmetic code generation
     * @return {String} Code generated with block parameters
     */


    /**
     * math_number code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.math_number = function () {
        // Numeric value.
        var code = window.parseFloat(this.getFieldValue('NUM'));
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.math_arithmetic = function () {
        // Basic arithmetic operators, and power.
        var mode = this.getFieldValue('OP');
        var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
        var operator = tuple[0];
        var order = tuple[1];
        var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
        var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
        var code = '';
        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        a = RoboBlocks.findPinMode(argument1);
        code += a['code'];
        argument1 = a['pin'];
        if (!operator) {
            code = JST['math_arithmetic_pow']({
                'argument0': argument0,
                'argument1': argument1
            }, window.programmingLanguage);
            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        }
        code += JST['math_arithmetic']({
            'argument0': argument0,
            'argument1': argument1,
            'operator': operator
        }, window.programmingLanguage);
        return [code, order];
    };

    Blockly.Arduino.math_arithmetic.OPERATORS = {
        ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
        MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
        MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
        DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
        POWER: [null, Blockly.Arduino.ORDER_NONE]
    };




    Blockly.Blocks.math_arithmetic = {
        // Basic arithmetic operator.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.setOutput(true, Number);
            this.appendValueInput('A')
                .setCheck(Number);
            this.appendValueInput('B')
                .setCheck(Number)
                .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
            this.setInputsInline(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var mode = thisBlock.getFieldValue('OP');
                return Blockly.Blocks.math_arithmetic.TOOLTIPS[mode];
            });
        }
    };

    Blockly.Blocks.math_arithmetic.OPERATORS = [
        ['+', 'ADD'],
        ['-', 'MINUS'],
        ['\u00D7', 'MULTIPLY'],
        ['\u00F7', 'DIVIDE'],
        ['^', 'POWER']
    ];

    Blockly.Blocks.math_arithmetic.TOOLTIPS = {
        ADD: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_ADD'),
        MINUS: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MINUS'),
        MULTIPLY: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY'),
        DIVIDE: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE'),
        POWER: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_POWER')
    };

    // Source: src/blocks/math_array/math_array.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */

    /**
     * math_array code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.math_array = function () {
        // Numeric value.
        var code = '';
        code += (window.programmingLanguage === 'python' ? '[' : '{');
        code += window.parseFloat(this.getFieldValue('NUM0'));
        code += ',';
        code += window.parseFloat(this.getFieldValue('NUM1'));
        code += ',';
        code += window.parseFloat(this.getFieldValue('NUM2'));
        code += (window.programmingLanguage === 'python' ? ']' : '}');

        // -4.abs() returns -4 in Dart due to strange order of operation choices.
        // -4 is actually an operator and a number.  Reflect this in the order.
        // var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.math_array = {
        // Numeric value.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_ARRAY3'))
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_BRACKET3'))
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM0')
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_COMMA'));


            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM1')
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_COMMA'));

            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM2')
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_BRACKET4'));

            this.setOutput(true, Number);
            this.setInputsInline(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_TOOLTIP'));
        }
    };


    Blockly.Blocks.math_array.validator = function (text) {
        // Ensure that only a number may be entered.
        // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
        var n = window.parseFloat(text || 0);
        return window.isNaN(n) ? null : String(n);
    };
    // Source: src/blocks/math_modulo/math_modulo.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * math_modulo code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.math_modulo = function () {
        // Remainder computation.
        var argument0 = Blockly.Arduino.valueToCode(this, 'DIVIDEND',
            Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
        var argument1 = Blockly.Arduino.valueToCode(this, 'DIVISOR',
            Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
        var code = '';
        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];
        a = RoboBlocks.findPinMode(argument1);
        code += a['code'];
        argument1 = a['pin'];
        code += JST['math_modulo']({
            'argument0': argument0,
            'argument1': argument1
        }, window.programmingLanguage);

        //argument0 + ' % ' + argument1;
        return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
    };

    Blockly.Blocks.math_modulo = {
        // Remainder of a division.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.setOutput(true, Number);
            this.appendValueInput('DIVIDEND')
                .setCheck(Number)
                .appendField(RoboBlocks.locales.getKey('LANG_MATH_MODULO_INPUT_DIVIDEND'));
            this.appendValueInput('DIVISOR')
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('%');
            this.setInputsInline(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_MODULO_TOOLTIP'));
        }
    };

    // Source: src/blocks/math_random/math_random.js
    /* global Blockly, JST, RoboBlocks */

    /**
     * math_random code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.math_random = function () {
        var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
        var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(value_num);
        code += a['code'];
        value_num = a['pin'];

        window.programmingLanguage === 'python' && (Blockly.Arduino.definitions_['define_mod_math'] = JST['random_library']({}, window.programmingLanguage));

        a = RoboBlocks.findPinMode(value_dmax);
        code += a['code'];
        value_dmax = a['pin'];

        code += JST['math_random']({
            'value_num': value_num,
            'value_dmax': value_dmax
        }, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.math_random = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.appendValueInput('NUM', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM'))
                .setCheck(Number);
            this.appendValueInput('DMAX', Number)
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND'))
                .setCheck(Number);
            this.setInputsInline(true);
            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM_TOOLTIP'));
        }
    };

    // Source: src/blocks/math_single/math_single.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */

    /**
     * math_single code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.math_single = function () {
        // Math operators with single operand.
        var operator = this.getFieldValue('OP');
        var arg;
        var code = '';
        var a;

        if (window.programmingLanguage === 'python') {
            Blockly.Arduino.definitions_['define_mod_math'] = JST['math_library']({}, window.programmingLanguage);
        }

        if (operator === 'NEG') {
            // Negation is a special case given its different operator precedents.
            arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '';
            a = RoboBlocks.findPinMode(arg);
            code += a['code'];
            arg = a['pin'];
            if (arg[0] === '-') {
                // --3 is not legal in Dart.
                arg = ' ' + arg;
            }
            code += '-' + arg;
            return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
        } else if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
            arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            a = RoboBlocks.findPinMode(arg);
            code += a['code'];
            arg = a['pin'];
        } else if (operator === 'LOG10') {
            code = '';
        } else {
            arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
            a = RoboBlocks.findPinMode(arg);
            code += a['code'];
            arg = a['pin'];
        }
        var PI = 3.14159;
        // First, handle cases which generate values that don't need parentheses.
        switch (operator) {
            case 'ABS':
                code += 'abs(' + arg + ')';
                break;
            case 'ROOT':
                code += (window.programmingLanguage === 'python' ? 'math.sqrt(' : 'sqrt(') + arg + ')';
                break;
            case 'LN':
                code += (window.programmingLanguage === 'python' ? 'math.log(' : 'log(') + arg + ')';
                break;
            case 'EXP':
                code += (window.programmingLanguage === 'python' ? 'math.exp(' : 'exp(') + arg + ')';
                break;
            case 'POW10':
                code += (window.programmingLanguage === 'python' ? '10**' + arg : 'exp(10,' + arg + ')');
                break;
            case 'SIN':
                code += 'sin(' + arg + ' / 180 * ' + PI + ')';
                break;
            case 'COS':
                code += 'cos(' + arg + ' / 180 * ' + PI + ')';
                break;
            case 'TAN':
                code += 'tan(' + arg + ' / 180 * ' + PI + ')';
                break;
        }
        if (code) {
            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        }

        // Second, handle cases which generate values that may need parentheses.
        switch (operator) {
            case 'LOG10':
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
                code += (window.programmingLanguage === 'python' ? 'math.log(' + arg + ') / math.log(10)' : 'log(' + arg + ') / log(10)');
                break;
            case 'ASIN':
                code += 'asin(' + arg + ') / ' + PI + ' * 180';
                break;
            case 'ACOS':
                code += 'acos(' + arg + ') / ' + PI + ' * 180';
                break;
            case 'ATAN':
                code += 'atan(' + arg + ') / ' + PI + ' * 180';
                break;
            default:
                throw 'Unknown math operator: ' + operator;
        }
        return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
    };


    Blockly.Blocks.math_single = {
        // Advanced math operators with single operand.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.setOutput(true, Number);
            this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_MATH_SINGLE_OP_ROOT') || 'SQR ROOT', 'ROOT'],
                    [RoboBlocks.locales.getKey('LANG_MATH_SINGLE_OP_ABSOLUTE') || 'ABS', 'ABS'],
                    ['-', 'NEG'],
                    ['ln', 'LN'],
                    ['log10', 'LOG10'],
                    ['e^', 'EXP'],
                    ['10^', 'POW10']
                ]), 'OP');
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                var mode = thisBlock.getFieldValue('OP');
                return Blockly.Blocks.math_single.TOOLTIPS[mode];
            });
        }
    };

    Blockly.Blocks.math_single.TOOLTIPS = {
        ROOT: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ROOT'),
        ABS: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ABS'),
        NEG: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_NEG'),
        LN: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LN'),
        LOG10: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LOG10'),
        EXP: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_EXP'),
        POW10: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_POW10')
    };

    // Source: src/blocks/pin_analog/pin_analog.js
    /* global Blockly, profiles, RoboBlocks */

    /**
     * pin code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.pin_analog = function () {
        var pin = this.getFieldValue('PIN') || '';
        return [pin, Blockly.Arduino.ORDER_NONE];
    };

    Blockly.Blocks.pin_analog = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_ANALOG'))
                .appendField(new Blockly.FieldDropdown(profiles.default.analog), 'PIN');

            this.setInputsInline(true);
            this.setOutput(true, Number);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
        }
    };

    // Source: src/blocks/pin_digital/pin_digital.js
    /* global Blockly, profiles, RoboBlocks */

    /**
     * pin code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.pin_digital = function () {
        var pin = this.getFieldValue('PIN') || '';
        return [pin, Blockly.Arduino.ORDER_NONE];
    };

    Blockly.Blocks.pin_digital = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
        helpUrl: RoboBlocks.URL_PIN_FUNC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_DIGITAL'))
                .appendField(new Blockly.FieldDropdown(profiles.default.digital), 'PIN');

            this.setInputsInline(true);
            this.setOutput(true, Number);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            if (this.getFieldValue('PIN') === '0') {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_DIGITAL0'));
                } catch (e) { }
            } else {
                try {
                    this.setWarningText(null);
                } catch (e) { }
            }
        }
    };

    // Source: src/blocks/procedures_callnoreturn/procedures_callnoreturn.js
    /* global Blockly, JST, RoboBlocks */
    /**
     * procedures_callnoreturn code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.procedures_callnoreturn = function () {
        // Call a procedure with a return value.
        var funcName = this.getFieldValue('PROCEDURES');
        var args = [];
        var code = '';
        var a;
        try {
            for (var x = 0; x < this.getVariables(funcName).length; x++) {
                args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || '';
                a = RoboBlocks.findPinMode(args[x]);
                code += a['code'];
                args[x] = a['pin'];
            }
        } catch (e) { }
        var funcArgs = args.join(', ');
        code += JST['procedures_callnoreturn']({
            'funcName': funcName,
            'funcArgs': funcArgs
        }, window.programmingLanguage);
        return code;
    };
    Blockly.Blocks.procedures_callnoreturn = {
        // Variable getter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_PROC_NO_RET,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALLNORETURN_TOOLTIP'));
            this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
            this.quarkConnections_ = null;
            this.quarkArguments_ = null;
            this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
        },
        validName: function (name) {
            if (name && name.length > 0) {
                var i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                name = name.replace(/([ ])/g, '_');
                name = name.replace(/([áàâä])/g, 'a');
                name = name.replace(/([éèêë])/g, 'e');
                name = name.replace(/([íìîï])/g, 'i');
                name = name.replace(/([óòôö])/g, 'o');
                name = name.replace(/([úùûü])/g, 'u');
                name = name.replace(/([ñ])/g, 'n');
                name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
            }
            return name;
        },
        getProcedures: function () {
            var procedures = Blockly.Procedures.allProcedures();
            var procedures_dropdown = [];
            if (procedures[0].length > 0) {
                for (var i in procedures[0]) {
                    var proc_name = procedures[0][i][0];
                    proc_name = this.validName(proc_name);
                    procedures_dropdown.push([proc_name, proc_name]);
                }
            } else {
                procedures_dropdown.push([RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')]);
            }
            return procedures_dropdown;
        },
        maxVariableNumber: function () {
            var procedures = Blockly.Procedures.allProcedures();
            var procedures_dropdown = [];
            var max_num = 0;
            if (procedures[0].length > 0 || procedures[1].length > 0) {
                for (var i in procedures[0]) {
                    if (procedures[0][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                        max_num = procedures[0][i][1].length;
                    }
                }
                return max_num;
            } else {
                procedures_dropdown.push(['', '']);
            }
        },
        getVariables: function (funcName) {
            try {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][0] === funcName) {
                            return procedures[0][i][1];
                        }
                    }
                } else {
                    procedures_dropdown.push(['', '']);
                }
            } catch (e) { }
        },
        exists: function () {
            var procedures = Blockly.Procedures.allProcedures();
            if (procedures[0].length > 0) {
                for (var i in procedures[0]) {
                    if (procedures[0][i][0] === this.getFieldValue('PROCEDURES')) {
                        return true;
                    }
                }
            } else {
                return false;
            }
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                this.changeVariables();
                this.last_procedure = this.getFieldValue('PROCEDURES');
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                this.addVariables();
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.last_procedure = this.getFieldValue('PROCEDURES');
            }
            if (!this.exists()) {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                } catch (e) { }
            } else {
                try {
                    this.setWarningText(null);
                } catch (e) { }
            }
        },
        addVariables: function () {
            var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            var var_num = 0;
            if (func_variables) {
                if (!this.last_variables) {
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (func_variables.length >= this.last_variables.length) {
                    var_num = func_variables.length;
                } else if (this.last_variables) {
                    try {
                        var_num = this.last_variables.length;
                    } catch (e) { }
                }
                for (var x = 0; x < var_num; x++) {
                    if (this.getInput('ARG' + x) === null) {
                        this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                    } else {
                        if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                            this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                        } else {
                            this.removeInput('ARG' + x);
                        }
                    }
                }
                this.arguments_ = func_variables;
            }
        },
        renameProcedure: function (oldName, newName) {
            if (this.last_procedure) {
                var procedures = this.getProcedures();
                for (var i in procedures) {
                    if (Blockly.Names.equals(oldName, procedures[i][0])) {
                        this.removeInput('DUMMY');
                        this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                    }
                }
                if (this.last_procedure === oldName) {
                    this.last_procedure = newName;
                }
                try {
                    this.setFieldValue(this.last_procedure, 'PROCEDURES');
                } catch (e) { }
            }
        },
        changeVariables: function () {
            var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
            for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                if (this.getInput('ARG' + i) === null) {
                    break;
                }
                this.removeInput('ARG' + i);
            }
            for (var variable in func_variables) {
                this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
            }
            this.arguments_ = func_variables;
        },
        mutationToDom: function () {
            // Save the name and arguments (none of which are editable).
            var container = document.createElement('mutation');
            container.setAttribute('name', this.getFieldValue('PROCEDURES'));
            if (typeof this.arguments_ === 'undefined') {
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
            }
            if (typeof this.arguments_ === 'undefined') {
                this.arguments_ = [];
            }
            for (var x = 0; x < this.arguments_.length; x++) {
                var parameter = document.createElement('arg');
                parameter.setAttribute('name', this.arguments_[x]);
                container.appendChild(parameter);
            }
            return container;
        },
        domToMutation: function (xmlElement) {
            this.xmlElement = xmlElement;
            // Restore the name and parameters.
            var name = xmlElement.getAttribute('name');
            this.last_procedure = name;
            this.setFieldValue(name, 'PROCEDURES');
            for (var x = 0; x < xmlElement.childNodes.length; x++) {
                this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
            }
        }
    };
    // Source: src/blocks/procedures_callreturn/procedures_callreturn.js
    /* global Blockly, JST, RoboBlocks */
    /**
     * procedures_callreturn code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.procedures_callreturn = function () {
        // Call a procedure with a return value.
        var funcName = this.getFieldValue('PROCEDURES');
        var args = [];
        var a;
        var code = '';
        for (var x = 0; x < this.getVariables(funcName).length; x++) {
            args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'null';

            a = RoboBlocks.findPinMode(args[x]);
            code += a['code'];
            args[x] = a['pin'];
        }
        var funcArgs = args.join(', ');
        code += JST['procedures_callreturn']({
            'funcName': funcName,
            'funcArgs': funcArgs
        }, window.programmingLanguage);
        //funcName + '(' + args.join(', ') + ')';
        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    };
    Blockly.Blocks.procedures_callreturn = {
        // Variable getter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_PROC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALLRETURN_TOOLTIP'));
            this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
            this.quarkConnections_ = null;
            this.quarkArguments_ = null;
            this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
        },
        validName: function (name) {
            if (name && name.length > 0) {
                var i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                name = name.replace(/([ ])/g, '_');
                name = name.replace(/([áàâä])/g, 'a');
                name = name.replace(/([éèêë])/g, 'e');
                name = name.replace(/([íìîï])/g, 'i');
                name = name.replace(/([óòôö])/g, 'o');
                name = name.replace(/([úùûü])/g, 'u');
                name = name.replace(/([ñ])/g, 'n');
                name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                    var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                    if (name === reserved_words[j]) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                        name = '';
                        break;
                    } else {
                        this.setWarningText(null);
                    }
                }
            }
            return name;
        },
        getProcedures: function () {
            var procedures = Blockly.Procedures.allProcedures();
            var procedures_dropdown = [];
            if (procedures[1].length > 0) {
                for (var i in procedures[1]) {
                    var proc_name = procedures[1][i][0];
                    proc_name = this.validName(proc_name);
                    procedures_dropdown.push([proc_name, proc_name]);
                }
            } else {
                procedures_dropdown.push([RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')]);
            }
            return procedures_dropdown;
        },
        maxVariableNumber: function () {
            var procedures = Blockly.Procedures.allProcedures();
            var procedures_dropdown = [];
            var max_num = 0;
            if (procedures[1].length > 0) {
                for (var i in procedures[1]) {
                    if (procedures[1][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                        max_num = procedures[1][i][1].length;
                    }
                }
                return max_num;
            } else {
                procedures_dropdown.push(['', '']);
            }
        },
        getVariables: function (funcName) {
            try {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][0] === funcName) {
                            return procedures[1][i][1];
                        }
                    }
                } else {
                    procedures_dropdown.push(['', '']);
                }
            } catch (e) { }
        },
        exists: function () {
            var procedures = Blockly.Procedures.allProcedures();
            if (procedures[1].length > 0) {
                for (var i in procedures[1]) {
                    if (procedures[1][i][0] === this.getFieldValue('PROCEDURES')) {
                        return true;
                    }
                }
            } else {
                return false;
            }
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                this.changeVariables();
                this.last_procedure = this.getFieldValue('PROCEDURES');
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                this.addVariables();
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.last_procedure = this.getFieldValue('PROCEDURES');
            }
            if (!this.exists()) {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                } catch (e) { }
            } else {
                try {
                    this.setWarningText(null);
                } catch (e) { }
            }
        },
        addVariables: function () {
            var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            var var_num = 0;
            if (func_variables) {
                if (!this.last_variables) {
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (func_variables.length >= this.last_variables.length) {
                    var_num = func_variables.length;
                } else if (this.last_variables) {
                    try {
                        var_num = this.last_variables.length;
                    } catch (e) { }
                }
                for (var x = 0; x < var_num; x++) {
                    if (this.getInput('ARG' + x) === null) {
                        this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                    } else {
                        if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                            this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                        } else {
                            this.removeInput('ARG' + x);
                        }
                    }
                }
                this.arguments_ = func_variables;
            }
        },
        renameProcedure: function (oldName, newName) {
            if (this.last_procedure) {
                var procedures = this.getProcedures();
                for (var i in procedures) {
                    if (Blockly.Names.equals(oldName, procedures[i][0])) {
                        this.removeInput('DUMMY');
                        this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                    }
                }
                if (this.last_procedure === oldName) {
                    this.last_procedure = newName;
                }
                try {
                    this.setFieldValue(this.last_procedure, 'PROCEDURES');
                } catch (e) { }
            }
        },
        changeVariables: function () {
            var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
            for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                if (this.getInput('ARG' + i) === null) {
                    break;
                }
                this.removeInput('ARG' + i);
            }
            for (var variable in func_variables) {
                this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
            }
            this.arguments_ = func_variables;
        },
        mutationToDom: function () {
            // Save the name and arguments (none of which are editable).
            var container = document.createElement('mutation');
            container.setAttribute('name', this.getFieldValue('PROCEDURES'));
            if (typeof this.arguments_ === 'undefined') {
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
            }
            if (typeof this.arguments_ === 'undefined') {
                this.arguments_ = [];
            }
            for (var x = 0; x < this.arguments_.length; x++) {
                var parameter = document.createElement('arg');
                parameter.setAttribute('name', this.arguments_[x]);
                container.appendChild(parameter);
            }
            return container;
        },
        domToMutation: function (xmlElement) {
            this.xmlElement = xmlElement;
            // Restore the name and parameters.
            var name = xmlElement.getAttribute('name');
            this.last_procedure = name;
            this.setFieldValue(name, 'PROCEDURES');
            for (var x = 0; x < xmlElement.childNodes.length; x++) {
                this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
            }
        }
    };
    // Source: src/blocks/procedures_defnoreturn/procedures_defnoreturn.js
    /* global Blockly, JST, RoboBlocks */
    /**
     * procedures_defnoreturn code generation
     * @return {String} Code generated with block parameters
     */
    // Defining a procedure without a return value uses the same generator as
    // a procedure with a return value.
    Blockly.Arduino.procedures_defnoreturn = function () {
        // Define a procedure with a return value.
        var funcName = this.getFieldValue('NAME');
        var branch = Blockly.Arduino.statementToCode(this, 'STACK');
        branch = branch.replace(/&quot;/g, '"');
        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
            branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
        }
        // branch=branch.replace(/&amp;/g, '');

        var returnType = 'void';
        var args = this.paramString;
        var code = JST['procedures_defnoreturn']({
            'returnType': returnType,
            'funcName': funcName,
            'args': args,
            'branch': branch
        }, window.programmingLanguage);
        // code=code.replace(/&amp;/g, '');

        code = Blockly.Arduino.scrub_(this, code);
        Blockly.Arduino.definitions_[funcName] = code;
        return null;
    };
    Blockly.Blocks.procedures_defnoreturn = {
        // Define a procedure with no return value.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
        helpUrl: RoboBlocks.URL_PROC_NO_RET,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            var name = Blockly.Procedures.findLegalName(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), this);
            this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
            // this.appendDummyInput().appendField(new Blockly.FieldTextInput(name), 'NAME').appendField('', 'PARAMS');
            this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_DO'));
            this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
            this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_TOOLTIP'));
            this.arguments_ = [];
            this.type_arguments_ = [];
        },
        updateParams_: function () {
            // Check for duplicated arguments.
            var badArg = false;
            var hash = {};
            for (var x = 0; x < this.arguments_.length; x++) {
                if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
                    badArg = true;
                    break;
                }
                hash['arg_' + this.arguments_[x].toLowerCase()] = true;
            }
            if (badArg) {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEF_DUPLICATE_WARNING'));
                } catch (err) {
                    console.log('Captured error: ', err);
                }
            } else {
                this.setWarningText(null);
            }
            // Merge the arguments into a human-readable list.
            var params = [];
            for (var i in this.arguments_) {
                params.push(this.type_arguments_[i] + ' ' + this.arguments_[i]);
            }
            this.paramString = params.join(', ');
            this.setFieldValue(this.paramString, 'PARAMS');
        },
        mutationToDom: function () {
            var container = document.createElement('mutation');
            for (var x = 0; x < this.arguments_.length; x++) {
                var parameter = document.createElement('arg_name');
                parameter.setAttribute('name', this.arguments_[x]);
                container.appendChild(parameter);
                parameter = document.createElement('arg_type');
                parameter.setAttribute('name', this.type_arguments_[x]);
                container.appendChild(parameter);
            }
            return container;
        },
        domToMutation: function (xmlElement) {
            this.arguments_ = [];
            this.type_arguments_ = [];
            var childNode;
            for (var x = 0; x < xmlElement.childNodes.length; x++) {
                childNode = xmlElement.childNodes[x];
                if (childNode.nodeName.toLowerCase() === 'arg_name') {
                    this.arguments_.push(childNode.getAttribute('name'));
                }
                if (childNode.nodeName.toLowerCase() === 'arg_type') {
                    this.type_arguments_.push(childNode.getAttribute('name'));
                }
            }
            this.updateParams_();
        },
        decompose: function (workspace) {
            var containerBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorcontainer');
            containerBlock.initSvg();
            var connection = containerBlock.getInput('STACK').connection;
            for (var x = 0; x < this.arguments_.length; x++) {
                var paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
                paramBlock.initSvg();
                paramBlock.setFieldValue(this.type_arguments_[x], 'TYPE');
                paramBlock.setFieldValue(this.arguments_[x], 'NAME');
                // Store the old location.
                paramBlock.oldLocation = x;
                connection.connect(paramBlock.previousConnection);
                connection = paramBlock.nextConnection;
            }
            // Initialize procedure's callers with blank IDs.
            Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, null);
            Blockly.Procedures.mutateCallers(this.getFieldValue('TYPE'), this.workspace, this.type_arguments_, null);
            return containerBlock;
        },
        compose: function (containerBlock) {
            this.arguments_ = [];
            this.paramIds_ = [];
            this.type_arguments_ = [];
            var paramBlock = containerBlock.getInputTargetBlock('STACK');
            var varName;
            while (paramBlock) {
                varName = paramBlock.getFieldValue('NAME');
                this.type_arguments_.push(paramBlock.getFieldValue('TYPE'));
                this.arguments_.push(varName);
                this.paramIds_.push(paramBlock.id);
                paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
            }
            this.updateParams_();
            Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, this.paramIds_);
        },
        dispose: function () {
            var name = this.getFieldValue('NAME');
            var editable = this.editable;
            var workspace = this.workspace;
            // Call parent's destructor.
            Blockly.Block.prototype.dispose.apply(this, arguments);
            if (editable) {
                // Dispose of any callers.
                Blockly.Procedures.disposeCallers(name, workspace);
            }
        },
        getProcedureDef: function () {
            // Return the name of the defined procedure,
            // a list of all its arguments,
            // and that it DOES NOT have a return value.
            return [this.getFieldValue('NAME'), this.arguments_, false];
        },
        getVars: function () {
            return this.arguments_;
        },
        renameVar: function (oldName, newName) {
            var change = false;
            for (var x = 0; x < this.arguments_.length; x++) {
                if (Blockly.Names.equals(oldName, this.arguments_[x])) {
                    newName = this.validName(newName);
                    this.arguments_[x] = newName;
                    change = true;
                }
            }
            if (change) {
                this.updateParams_();
                // Update the mutator's variables if the mutator is open.
                if (this.mutator.isVisible_()) {
                    var blocks = this.mutator.workspace_.getAllBlocks();
                    var block;
                    for (x = 0; blocks.length; x++) {
                        block = blocks[x];
                        if (block.type === 'procedures_mutatorarg' && Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                            block.setFieldValue(newName, 'NAME');
                        }
                    }
                }
            }
        },
        validName: function (name) {
            if (name && name.length > 0) {
                var i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                name = name.replace(/([ ])/g, '_');
                name = name.replace(/([áàâä])/g, 'a');
                name = name.replace(/([éèêë])/g, 'e');
                name = name.replace(/([íìîï])/g, 'i');
                name = name.replace(/([óòôö])/g, 'o');
                name = name.replace(/([úùûü])/g, 'u');
                name = name.replace(/([ñ])/g, 'n');
                name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                    this.reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                    if (name === this.reserved_words[j]) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                        name = '';
                        break;
                    } else {
                        this.setWarningText(null);
                    }
                }
            }
            return name;
        },
        onchange: function () {
            if (this.last_procedure !== this.getFieldValue('NAME')) {
                var name = this.getFieldValue('NAME');
                name = this.validName(name);
                try {
                    this.setFieldValue(name, 'NAME');
                } catch (e) { }
                this.last_procedure = name;
            }
        }
    };
    Blockly.Blocks.procedures_mutatorcontainer = {
        // Procedure container (for mutator dialog).
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
            this.appendStatementInput('STACK');
            this.setTooltip('');
            this.contextMenu = false;
        }
    };
    Blockly.Blocks.procedures_mutatorarg = {
        // Procedure argument (for mutator dialog).
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORARG_Field')).appendField(new Blockly.FieldDropdown([
                ['int', 'int'],
                ['String', 'String']
            ]), 'TYPE').appendField(new Blockly.FieldTextInput('x', Blockly.Blocks.procedures_mutatorarg.validator), 'NAME');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip('');
            this.contextMenu = false;
        },
        onchange: function () {
            if (this.last_variable !== this.getFieldValue('NAME')) {
                var name = this.getFieldValue('NAME');
                name = this.validName(name);
                try {
                    this.setFieldValue(name, 'NAME');
                } catch (e) { }
                this.last_variable = name;
            }
        },
        validName: Blockly.Blocks.procedures_defnoreturn.validName
    };
    Blockly.Blocks.procedures_mutatorarg.validator = function (newVar) {
        // Merge runs of whitespace.  Strip leading and trailing whitespace.
        // Beyond this, all names are legal.
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        return newVar || null;
    };

    // Source: src/blocks/procedures_defreturn/procedures_defreturn.js
    /* global Blockly, JST, RoboBlocks */
    /**
     * procedures_defreturn code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.procedures_defreturn = function () {
        // Define a procedure with a return value.
        var funcName = this.getFieldValue('NAME');
        var branch = Blockly.Arduino.statementToCode(this, 'STACK');
        branch = branch.replace(/&quot;/g, '"');

        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
            branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
        }
        var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
        var code = '';

        returnValue = returnValue.replace(/&quot;/g, '"');
        var returnType = this.getReturnType();
        if (returnValue) {
            var a = RoboBlocks.findPinMode(returnValue);
            returnValue = a['code'];
            returnValue += (window.programmingLanguage === 'cpp' ? '  ' : '    ') + 'return ' + a['pin'] + ';\n';
        }

        var args = this.paramString;
        code += JST['procedures_defreturn']({
            'returnType': returnType,
            'funcName': funcName,
            'args': args,
            'branch': branch,
            'returnValue': returnValue
        }, window.programmingLanguage);

        // Adición para js
        if (window.programmingLanguage === 'js') {
            code = code.replace(/return [^;]*;/g, 'return ' + returnValue + ';'); // Asegúrate de devolver el valor correcto
        }

        code = Blockly.Arduino.scrub_(this, code);
        Blockly.Arduino.definitions_[funcName] = code;
        return null;
    };

    Blockly.Blocks.procedures_defreturn = {
        // Define a procedure with a return value.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Procedures are handled specially.
        helpUrl: RoboBlocks.URL_PROC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            var name = Blockly.Procedures.findLegalName(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), this);
            this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
            this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_DO'));
            this.appendValueInput('RETURN').setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
            this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
            this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_TOOLTIP'));
            this.arguments_ = [];
        },
        isVariable: function (varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            return false;
        },
        getReturnType: function () {
            var returnType;
            var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
            var a = RoboBlocks.findPinMode(returnValue);
            // code+=a['code'];
            returnValue = a['pin'];

            var isFunction = false;

            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(returnValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (!returnValue) {
                returnType = 'void';
            }
            if (returnValue.search('"') >= 0) {
                returnType = 'String';
            } else if (isFunction) { //returnValue.search('\\(') >= 0 && returnValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(returnValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                returnType = 'int *';
                            } else {
                                returnType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            returnType = 'String';
                        } else {
                            returnType = '';
                        }
                    }
                }
            } else if (this.isVariable(returnValue)) {
                returnType = RoboBlocks.variables[returnValue][0];
            } else if ((returnValue.search('analogRead') >= 0) || (returnValue.search('digitalRead') >= 0) || (returnValue.search('Distanc') >= 0) || (!isNaN(parseFloat(returnValue)) || (returnValue.search('random') >= 0)) || (returnValue.search('map') >= 0) || returnValue.search('\\[') >= 0 || (returnValue.search('abs') >= 0) || (returnValue.search('sqrt') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('exp') >= 0) || (returnValue.search('pow') >= 0)) {
                returnType = 'int';
            } else if (returnValue.search('readJoystick') >= 0 || returnValue[0] === '{') {
                returnType = 'int *';
            } else {
                returnType = 'void';
            }
            return returnType;
        },
        updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
        decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
        compose: Blockly.Blocks.procedures_defnoreturn.compose,
        dispose: Blockly.Blocks.procedures_defnoreturn.dispose,
        getProcedureDef: function () {
            // Return the name of the defined procedure,
            // a list of all its arguments,
            // and that it DOES have a return value.
            return [this.getFieldValue('NAME'), this.arguments_, true];
        },
        getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
        renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
        mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
        domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
        validName: Blockly.Blocks.procedures_defnoreturn.validName,
        onchange: Blockly.Blocks.procedures_defnoreturn.onchange
    };

    // Source: src/blocks/procedures_ifreturn/procedures_ifreturn.js
    /* global Blockly, RoboBlocks */

    /**
     * procedures_ifreturn code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.procedures_ifreturn = function () {
        // Obtener la condición desde el bloque
        var condition = Blockly.Arduino.valueToCode(this, 'CONDITION', Blockly.Arduino.ORDER_NONE) || '';
        var code = '';

        // Buscar la configuración del pin en función de la condición
        var pinConfig = RoboBlocks.findPinMode(condition);
        code += pinConfig['code'];
        condition = pinConfig['pin'];

        // Generar código en C++
        if (window.programmingLanguage === 'cpp') {
            code += 'if (' + condition + ') {\n';
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            pinConfig = RoboBlocks.findPinMode(value);
            code += pinConfig['code'];
            code += '  return (' + value + ');\n';
            code += '}\n';
        }
        // Generar código en Python
        else if (window.programmingLanguage === 'python') {
            code += 'if ' + condition + ':\n';
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            pinConfig = RoboBlocks.findPinMode(value);
            code += pinConfig['code'];
            code += '    return ' + value + '\n';
        }
        // Generar código en JavaScript
        else if (window.programmingLanguage === 'js') {
            code += 'if (' + condition + ') {\n';
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            pinConfig = RoboBlocks.findPinMode(value);
            code += pinConfig['code'];
            code += '  return ' + value + ';\n';
            code += '}\n';
        }

        return code;
    };

    Blockly.Blocks.procedures_ifreturn = {
        // Conditionally return value from a procedure.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
        helpUrl: RoboBlocks.URL_PROC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            this.appendValueInput('CONDITION')
                .setCheck(Boolean)
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
            this.appendValueInput('VALUE');
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_TOOLTIP'));
            this.hasReturnValue_ = true;
        },
        mutationToDom: function () {
            // Save whether this block has a return value.
            var container = document.createElement('mutation');
            container.setAttribute('value', Number(this.hasReturnValue_));
            return container;
        },
        domToMutation: function (xmlElement) {
            // Restore whether this block has a return value.
            var value = xmlElement.getAttribute('value');
            this.hasReturnValue_ = (value === 1);
            // if (!this.hasReturnValue_) {
            //     this.removeInput('VALUE');
            // }
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            var legal = false;
            // Is the block nested in a procedure?
            var block = this;
            do {
                if (block.type === 'procedures_defreturn') {
                    legal = true;
                    break;
                }
                block = block.getSurroundParent();
            } while (block);
            if (legal) {
                // If needed, toggle whether this block has a return value.
                // if (block.type === 'procedures_defnoreturn' && this.hasReturnValue_) {
                //     this.removeInput('VALUE');
                //     this.hasReturnValue_ = false;
                // } else if (block.type === 'procedures_defreturn' && !this.hasReturnValue_) {
                //     this.appendValueInput('VALUE');
                //     this.hasReturnValue_ = true;
                // }
                this.setWarningText(null);
            } else {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                } catch (err) {
                    console.log('Captured error: ', err);
                }
            }
        }
    };

    // Source: src/blocks/procedures_return/procedures_return.js
    /* global Blockly, RoboBlocks */

    /**
     * procedures_ifreturn code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.procedures_return = function () {
        // Conditionally return value from a procedure.
        var code = '';
        var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
        var a = RoboBlocks.findPinMode(value);
        code += a['code'];

        if (window.programmingLanguage === 'cpp') {
            code += 'return (' + value + ');\n';
        } else if (window.programmingLanguage === 'python') {
            code += 'return ' + value + '\n';
        } else if (window.programmingLanguage === 'js') {
            code += 'return ' + value + ';\n';
        }

        return code;
    };

    Blockly.Blocks.procedures_return = {
        // Conditionally return value from a procedure.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
        helpUrl: RoboBlocks.URL_PROC,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_RETURN'));
            this.appendValueInput('VALUE');
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_RETURN_TOOLTIP'));
            this.hasReturnValue_ = true;
        },
        mutationToDom: function () {
            // Save whether this block has a return value.
            var container = document.createElement('mutation');
            container.setAttribute('value', Number(this.hasReturnValue_));
            return container;
        },
        domToMutation: function (xmlElement) {
            // Restore whether this block has a return value.
            var value = xmlElement.getAttribute('value');
            this.hasReturnValue_ = (value === 1);
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            var legal = false;
            // Is the block nested in a procedure?
            var block = this;
            do {
                if (block.type === 'procedures_defreturn') {
                    legal = true;
                    break;
                }
                block = block.getSurroundParent();
            } while (block);
            if (legal) {
                this.setWarningText(null);
            } else {
                try {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                } catch (err) {
                    console.log('Captured error: ', err);
                }
            }
        }
    };

    // Source: src/blocks/serial_available/serial_available.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * serial_available code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.serial_available = function () {
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        branch = branch.replace(/&quot;/g, '"');
        // branch=branch.replace(/&amp;/g, '');

        var code = JST['serial_available']({
            'branch': branch
        }, window.programmingLanguage);
        return code;
    };

    /**
     * serial_available block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_available = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],

        /**
         * serial_available initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE'));
            this.appendStatementInput('DO')
                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'));
        }
    };

    // Source: src/blocks/serial_parseint/serial_parseint.js
    /* global Blockly, profiles, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * serial_parseint code generation
     * @return {Number} First valid (long) integer number from the serial buffer
     */

    Blockly.Arduino.serial_parseint = function () {
        Blockly.Arduino.setups_['setup_serial'] = JST['serial_parseint_setups']({
            'bitrate': profiles.default.serial
        }, window.programmingLanguage);
        var code = 'Serial.parseInt()'; // JST['serial_parseint']({});

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * serial_parseint block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_parseint = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],

        /**
         * serial_paraseint initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT'));
            this.setOutput(true, Number);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'));
        }
    };

    // Source: src/blocks/serial_print/serial_print.js
    /* global Blockly, profiles, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * serial_print code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.serial_print = function () {
        var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(content);
        code += a['code'];
        content = a['pin'];

        if (window.programmingLanguage === 'cpp') {
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_print_setups']({
                'bitrate': profiles.
                    default.serial
            }, window.programmingLanguage);
        }

        code += JST['serial_print']({
            'content': content
        }, window.programmingLanguage);
        return code;
    };
    /**
     * serial_print block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_print = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],
        /**
         * serial_print initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINT'));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'));
        }
    };
    // Source: src/blocks/serial_println/serial_println.js
    /* global Blockly, profiles, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * serial_println code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.serial_println = function () {
        var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
        var code = '';
        var a = RoboBlocks.findPinMode(content);
        code += a['code'];
        content = a['pin'];
        Blockly.Arduino.setups_['setup_serial'] = JST['serial_println_setups']({
            'bitrate': profiles.
                default.serial
        }, window.programmingLanguage);
        code += JST['serial_println']({
            'content': content
        }, window.programmingLanguage);
        return code;
    };
    /**
     * serial_println block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_println = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],
        /**
         * serial_println initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN'));
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'));
        }
    };
    // Source: src/blocks/serial_read/serial_read.js
    /* global Blockly, profiles, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * serial_read code generation
     * @return {int} Code generated with block parameters
     */

    Blockly.Arduino.serial_read = function () {

        Blockly.Arduino.setups_['setup_serial'] = JST['serial_read_setups']({
            'bitrate': profiles.default.serial
        }, window.programmingLanguage);
        var code = JST['serial_read']({}, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * serial_read block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_read = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],

        /**
         * serial_read initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READ'));
            this.setOutput(true, String);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READ_TOOLTIP'));
        }
    };

    // Source: src/blocks/serial_readstring/serial_readstring.js
    /* global Blockly, profiles, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * serial_readstring code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.serial_readstring = function () {

        Blockly.Arduino.setups_['setup_serial'] = JST['serial_readstring_setups']({
            'bitrate': profiles.default.serial
        }, window.programmingLanguage);
        var code = JST['serial_readstring']({}, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * serial_readstring block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_readstring = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],

        /**
         * serial_readstring initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING'));
            this.setOutput(true, String);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'));
        }
    };

    // Source: src/blocks/serial_special/serial_special.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */

    /**
     * serial_special code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.serial_special = function () {
        var char = this.getFieldValue('CHAR');
        var code = JST['serial_special']({
            'char': char
        }, window.programmingLanguage);
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    /**
     * serial_special block definition
     * @type {Object}
     */
    Blockly.Blocks.serial_special = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
        helpUrl: RoboBlocks.URL_SERIE,
        tags: ['serial'],

        /**
         * serial_special initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
            this.appendDummyInput('')
                .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL'))
                .appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TAB') || 'TAB', '\\t'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN') || 'CARRIAGE RETURN', '\\r'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED') || 'LINE FEED', '\\n']
                ]), 'CHAR');
            this.setOutput(true, String);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'));
        }
    };

    // Source: src/blocks/text/text.js
    /* global Blockly, RoboBlocks */

    /**
     * text code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.text = function () {
        // Text value.
        var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.text = {
        // Text value.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
        helpUrl: RoboBlocks.URL_TEXT,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendDummyInput()
                .appendField('"')
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField('"');
            this.setOutput(true, String);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_TEXT_TOOLTIP'));
        }
    };

    // Source: src/blocks/text_append/text_append.js
    /* global Blockly, RoboBlocks */
    /**
     * text_append code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.text_append = function () {
        // Append to a variable in place.
        var varName = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
        var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';

        var code = '';

        var a = RoboBlocks.findPinMode(varName);
        code += a['code'];
        varName = a['pin'];
        a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        window.programmingLanguage === 'python' ?
            (code += varName + ' += str(' + argument0 + ');\n') :
            (window.programmingLanguage === 'cpp' ? (code += varName + ' += String(' + argument0 + ');\n') : null);
        return code;
    };
    Blockly.Blocks.text_append = {
        // Append to a variable in place.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
        helpUrl: RoboBlocks.URL_TEXT,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendValueInput('VAR')
                // .appendField(new Blockly.FieldVariable(' '), 'VAR')
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TO'));
            this.appendValueInput('TEXT').appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setInputsInline(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TOOLTIP'));
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            // if (!this.last_variables){
            //     this.last_variables=Blockly.Variables.allVariables();
            // }
            // var variables=Blockly.Variables.allVariables();
            // for (var i in variables){
            //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
            //         try{
            //             this.removeInput('TEXT');
            //             this.appendValueInput('TEXT')
            //                 .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TO'))
            //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
            //                 .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
            //             this.setInputsInline(true);
            //         }catch(e){}
            //         this.last_variables=Blockly.Variables.allVariables();
            //     }
            // }
        }
    };
    // Source: src/blocks/text_equalsIgnoreCase/text_equalsIgnoreCase.js
    /* global Blockly, JST, RoboBlocks */

    /**
     * text_equalsIgnoreCase code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.text_equalsIgnoreCase = function () {
        var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
        string1 = string1.replace(/&quot;/g, '"');
        var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
        string2 = string2.replace(/&quot;/g, '"');

        var code = '';

        var a = RoboBlocks.findPinMode(string1);
        code += a['code'];
        string1 = a['pin'];

        a = RoboBlocks.findPinMode(string2);
        code += a['code'];
        string2 = a['pin'];

        code += JST['text_equalsIgnoreCase']({
            'string1': string1,
            'string2': string2
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.text_equalsIgnoreCase = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
        helpUrl: RoboBlocks.URL_TEXT,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendValueInput('STRING1')
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_IS'));

            this.appendValueInput('STRING2')
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_EQUAL'))
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_QUESTION'));

            this.setInputsInline(true);

            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'));
        }
    };
    // Source: src/blocks/text_join/text_join.js
    /* global Blockly, RoboBlocks */

    /**
     * text_join code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.text_join = function () {
        // Create a string made up of any number of elements of any type.
        var code = '';
        var a;
        var final_line = '';
        if (this.itemCount_ === 0) {
            return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
        } else if (this.itemCount_ === 1) {
            var argument0 = Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
            a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            if (window.programmingLanguage === 'python') {
                code += 'str(' + argument0 + ')';
            } else if (window.programmingLanguage === 'cpp') {
                code += 'String(' + argument0 + ')';
            } else if (window.programmingLanguage === 'js') {
                code += 'String(' + argument0 + ')';
            }

            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        } else {
            var i = (Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE) || '');
            a = RoboBlocks.findPinMode(i);
            code = a['code'];
            i = a['pin'];

            if (window.programmingLanguage === 'python') {
                final_line = 'str(' + i;
            } else if (window.programmingLanguage === 'cpp' || window.programmingLanguage === 'js') {
                final_line = 'String(' + i;
            }

            for (var n = 1; n < this.itemCount_; n++) {
                i = (Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE) || '');
                a = RoboBlocks.findPinMode(i);
                code += a['code'];
                i = a['pin'];

                if (window.programmingLanguage === 'python') {
                    final_line += ') + str(' + i;
                } else if (window.programmingLanguage === 'cpp' || window.programmingLanguage === 'js') {
                    final_line += ') + String(' + i;
                }
            }

            code += final_line + ')';

            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        }
    };

    Blockly.Blocks.text_join = {
        // Create a string made up of any number of elements of any type.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
        helpUrl: RoboBlocks.URL_TEXT,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendValueInput('ADD0')
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
            this.appendValueInput('ADD1');
            this.setOutput(true, String);
            this.setMutator(new Blockly.Mutator(['text_create_join_item']));
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_TOOLTIP'));
            this.itemCount_ = 2;
        },
        mutationToDom: function () {
            var container = document.createElement('mutation');
            container.setAttribute('items', this.itemCount_);
            return container;
        },
        domToMutation: function (xmlElement) {
            for (var x = 0; x < this.itemCount_; x++) {
                this.removeInput('ADD' + x);
            }
            this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
            for (x = 0; x < this.itemCount_; x++) {
                var input = this.appendValueInput('ADD' + x);
                if (x === 0) {
                    input.appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                }
            }
            if (this.itemCount_ === 0) {
                this.appendDummyInput('EMPTY')
                    .appendField(new Blockly.FieldImage(resources.images.quote0, resources.dimensions.quote0.width * options.zoom, resources.dimensions.quote0.height * options.zoom))
                    .appendField(new Blockly.FieldImage(resources.images.quote1, resources.dimensions.quote1.width * options.zoom, resources.dimensions.quote1.height * options.zoom));
            }
        },
        decompose: function (workspace) {
            var containerBlock = Blockly.Block.obtain(workspace, 'text_create_join_container');
            containerBlock.initSvg();
            var connection = containerBlock.getInput('STACK').connection;
            for (var x = 0; x < this.itemCount_; x++) {
                var itemBlock = Blockly.Block.obtain(workspace, 'text_create_join_item');
                itemBlock.initSvg();
                connection.connect(itemBlock.previousConnection);
                connection = itemBlock.nextConnection;
            }
            return containerBlock;
        },
        compose: function (containerBlock) {
            // Disconnect all input blocks and remove all inputs.
            if (this.itemCount_ === 0) {
                this.removeInput('EMPTY');
            } else {
                for (var x = this.itemCount_ - 1; x >= 0; x--) {
                    this.removeInput('ADD' + x);
                }
            }
            this.itemCount_ = 0;
            // Rebuild the block's inputs.
            var itemBlock = containerBlock.getInputTargetBlock('STACK');
            while (itemBlock) {
                var input = this.appendValueInput('ADD' + this.itemCount_);
                if (this.itemCount_ === 0) {
                    input.appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                }
                // Reconnect any child blocks.
                if (itemBlock.valueConnection_) {
                    input.connection.connect(itemBlock.valueConnection_);
                }
                this.itemCount_++;
                itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            }
            if (this.itemCount_ === 0) {
                this.appendDummyInput('EMPTY')
                    .appendField(new Blockly.FieldImage(resources.images.quote0, resources.dimensions.quote0.width * options.zoom, resources.dimensions.quote0.height * options.zoom))
                    .appendField(new Blockly.FieldImage(resources.images.quote1, resources.dimensions.quote1.width * options.zoom, resources.dimensions.quote1.height * options.zoom));
            }
        },
        saveConnections: function (containerBlock) {
            // Store a pointer to any connected child blocks.
            var itemBlock = containerBlock.getInputTargetBlock('STACK');
            var x = 0;
            while (itemBlock) {
                var input = this.getInput('ADD' + x);
                itemBlock.valueConnection_ = input && input.connection.targetConnection;
                x++;
                itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            }
        }
    };



    Blockly.Blocks.text_create_join_container = {
        // Container.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_Field_JOIN'));
            this.appendStatementInput('STACK');
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
            this.contextMenu = false;
        }
    };

    Blockly.Blocks.text_create_join_item = {
        // Add items.
        init: function () {
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_Field_ITEM'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
            this.contextMenu = false;
        }
    };


    Blockly.Blocks.text_create_join_container = {
        // Container.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TITLE_JOIN'));
            this.appendStatementInput('STACK');
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
            this.contextMenu = false;
        }
    };

    Blockly.Blocks.text_create_join_item = {
        // Add items.
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM'));
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
            this.contextMenu = false;
        }
    };



    // Source: src/blocks/text_length/text_length.js
    /* global Blockly, JST, RoboBlocks */

    /**
     * text_length code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.text_length = function () {
        // String length.
        var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
        var code = '';
        var a = RoboBlocks.findPinMode(argument0);
        code += a['code'];
        argument0 = a['pin'];

        code += JST['text_length']({
            'argument0': argument0
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    };

    Blockly.Blocks.text_length = {
        // String length.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
        helpUrl: RoboBlocks.URL_TEXT,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendValueInput('VALUE')
                .setCheck([String, Array])
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_LENGTH_INPUT_LENGTH'));
            this.setOutput(true, Number);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_LENGTH_TOOLTIP'));
        }
    };
    // Source: src/blocks/text_substring/text_substring.js
    /* global Blockly, JST, RoboBlocks */

    /**
     * text_substring code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.text_substring = function () {
        var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
        var from = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_NONE);
        var to = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_NONE);
        var code = '';
        var a = RoboBlocks.findPinMode(string1);
        code += a['code'];
        string1 = a['pin'];

        a = RoboBlocks.findPinMode(from);
        code += a['code'];
        from = a['pin'];

        a = RoboBlocks.findPinMode(to);
        code += a['code'];
        to = a['pin'];

        code += JST['text_substring']({
            'string1': string1,
            'from': from,
            'to': to
        }, window.programmingLanguage);

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Blocks.text_substring = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
        helpUrl: RoboBlocks.URL_TEXT,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
            this.appendValueInput('STRING1')
                // .setCheck(String)
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING'));

            this.appendValueInput('FROM')
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_FROM'))
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT);

            this.appendValueInput('TO')
                .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TO'))
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT);
            // this.appendDummyInput()
            //     .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_QUESTION'));

            this.setInputsInline(true);

            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TOOLTIP'));
        }
    };
    // Source: src/blocks/variables_get/variables_get.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */
    /**
     * variables_get code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.variables_get = function () {
        // Variable setter.
        var varName = this.getFieldValue('VAR') || '';
        if (RoboBlocks.variables[this.getFieldValue('VAR')] !== undefined) {
            this.var_type = RoboBlocks.variables[this.getFieldValue('VAR')][0];
        }
        return [varName, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Blocks.variables_get = {
        // Variable setter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                .appendField(new Blockly.FieldVariable(' '), 'VAR');
            this.setOutput(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GET_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            // if (!this.workspace) {
            //     // Block has been deleted.
            //     return;
            // }
            // this.last_variable=this.getFieldValue('VAR');
            // if (!this.last_variables){
            //     this.last_variables=Blockly.Variables.allVariables();
            // }
            // var variables=Blockly.Variables.allVariables();
            // for (var i in variables){
            //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
            //         try{
            //             this.removeInput('DUMMY');
            //         }catch(e){}
            //         this.appendDummyInput('DUMMY')
            //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
            //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
            //         this.setFieldValue(this.last_variable, 'VAR');
            //         this.last_variables=Blockly.Variables.allVariables();
            //     }
            // }
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };
    // Source: src/blocks/variables_global/variables_global.js
    /* global Blockly,  RoboBlocks */
    /* jshint sub:true */
    /**
     * variables_global code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.variables_global = function () {
        // Variable setter.
        var varType;
        var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
        var varName = this.getFieldValue('VAR') || '';
        var isFunction = false;

        var a = RoboBlocks.findPinMode(varValue);
        Blockly.Arduino.setups_['pinMode' + varValue] = a['code'];
        varValue = a['pin'];

        for (var i in Blockly.Arduino.definitions_) {
            if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                isFunction = true;
                break;
            }
        }

        if (varValue.search(/["']/) >= 0 || varValue.search('substring\\(') >= 0) {
            varType = 'String';
        } else if (isFunction) {
            for (i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                    if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') {
                        varType = 'int';
                    } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                        varType = 'String';
                    } else {
                        varType = '';
                    }
                    break;
                }
            }
        } else if (varValue[0] === '{') {
            varType = 'int *';
            varValue = varValue.replace('{', '').replace('}', '').split(',');
            Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + '[0]=' + varValue[0] + ';\n' + varName + '[1]=' + varValue[1] + ';\n' + varName + '[2]=' + varValue[2] + ';\n';
        } else if (this.isVariable(varValue)) {
            varType = RoboBlocks.variables[varValue][0];
        } else if (varValue.search('readJoystick') >= 0) {
            varType = 'int *';
            Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
        } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue)) || (varValue.search('random') >= 0)) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
            varType = 'int';
        } else {
            varType = 'unknown';
        }

        // Declara la variable en función del lenguaje de programación
        if (window.programmingLanguage === 'python') {
            Blockly.Arduino.definitions_['declare_var' + varName] = varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + '\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + ' = ' + varValue + '\n';
        } else if (window.programmingLanguage === 'cpp') {
            Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + ' = ' + varValue + ';\n';
        } else if (window.programmingLanguage === 'js') {
            Blockly.Arduino.setups_['define_var' + varName] = 'var ' + varName + ' = ' + varValue + ';\n';
        }

        // Actualiza el objeto de variables
        RoboBlocks.variables[varName] = [varType, 'global'];
        RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
        RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

        return '';
    };

    Blockly.Blocks.variables_global = {
        // Variable setter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setFieldValue(newName, 'VAR');
            }
        },
        isVariable: function (varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            return false;
        },
        validName: function (name) {
            if (name && name.length > 0) {
                var i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                name = name.replace(/([ ])/g, '_');
                name = name.replace(/([áàâä])/g, 'a');
                name = name.replace(/([éèêë])/g, 'e');
                name = name.replace(/([íìîï])/g, 'i');
                name = name.replace(/([óòôö])/g, 'o');
                name = name.replace(/([úùûü])/g, 'u');
                name = name.replace(/([ñ])/g, 'n');
                name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                    var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                    if (name === reserved_words[j]) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                        name = '';
                        break;
                    } else {
                        this.setWarningText(null);
                    }
                }
            }
            return name;
        },
        onchange: function () {
            if (this.last_variable !== this.getFieldValue('VAR')) {
                var name = this.getFieldValue('VAR');
                name = this.validName(name);
                try {
                    this.setFieldValue(name, 'VAR');
                } catch (e) { }
                this.last_variable = name;
            }
        }
    };

    // Source: src/blocks/variables_global_type/variables_global_type.js
    /* global Blockly,  RoboBlocks */
    /* jshint sub:true */
    /**
     * variables_global_type code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.variables_global_type = function () {
        // Variable setter.
        var varType = this.getFieldValue('VAR_TYPE');
        var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
        var varName = this.getFieldValue('VAR') || '';
        var code = '';

        var a = RoboBlocks.findPinMode(varValue);
        code += a['code'];
        varValue = a['pin'];

        // Definición de variables
        window.programmingLanguage === 'python' ?
            (Blockly.Arduino.definitions_['declare_var' + varName] = varName + ': ' + {
                'String': 'str',
                'int': 'int',
                'long': 'int',
                'byte': 'int',
                'float': 'float'
            }[varType] + '\n') :
            (window.programmingLanguage === 'cpp' ?
                (Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n') :
                (window.programmingLanguage === 'js' ?
                    (Blockly.Arduino.definitions_['declare_var' + varName] = 'let ' + varName + ';\n') : null
                )
            );

        // Inicialización de variables
        window.programmingLanguage === 'python' ?
            (Blockly.Arduino.setups_['define_var' + varName] = varName + ' = ' + varValue + '\n') :
            (window.programmingLanguage === 'cpp' ?
                (Blockly.Arduino.setups_['define_var' + varName] = varName + (varValue ? ' = ' + varValue + ';' : ';') + '\n') :
                (window.programmingLanguage === 'js' ?
                    (Blockly.Arduino.setups_['define_var' + varName] = varName + ' = ' + varValue + ';\n') : null
                )
            );

        RoboBlocks.variables[varName] = [varType, 'global'];
        RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
        RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

        return '';
    };

    Blockly.Blocks.variables_global_type = {
        // Variable setter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setFieldValue(newName, 'VAR');
            }
        },
        isVariable: function (varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            return false;
        },
        validName: function (name) {
            if (name && name.length > 0) {
                var i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                name = name.replace(/([ ])/g, '_');
                name = name.replace(/([áàâä])/g, 'a');
                name = name.replace(/([éèêë])/g, 'e');
                name = name.replace(/([íìîï])/g, 'i');
                name = name.replace(/([óòôö])/g, 'o');
                name = name.replace(/([úùûü])/g, 'u');
                name = name.replace(/([ñ])/g, 'n');
                name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                i = 0;
                while (i < name.length) {
                    if (!isNaN(parseFloat(name[i]))) {
                        name = name.substring(1, name.length);
                    } else {
                        break;
                    }
                }
                for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                    var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                    if (name === reserved_words[j]) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                        name = '';
                        break;
                    } else {
                        this.setWarningText(null);
                    }
                }
            }
            return name;
        },
        onchange: function () {
            if (this.last_variable !== this.getFieldValue('VAR')) {
                var name = this.getFieldValue('VAR');
                name = this.validName(name);
                try {
                    this.setFieldValue(name, 'VAR');
                } catch (e) { }
                this.last_variable = name;
            }
        }
    };

    // Source: src/blocks/variables_local/variables_local.js
    /* global Blockly,  RoboBlocks */
    /* jshint sub:true */
    /**
     * variable code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.variables_local = function () {
        // Variable setter.
        var varType;
        var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
        var varName = this.getFieldValue('VAR') || '';
        var sufix = '';
        var code = '';
        var isFunction = false;


        var a = RoboBlocks.findPinMode(varValue);
        code += a['code'];
        varValue = a['pin'];


        for (var i in Blockly.Arduino.definitions_) {
            if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                isFunction = true;
                break;
            }
        }

        if (varValue.search(/["']/) >= 0 || varValue.search('substring\\(') >= 0) {
            varType = 'String';
            if (window.programmingLanguage === 'python') {
                code += varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + '\n';
            } else if (window.programmingLanguage === 'cpp') {
                code += varType + ' ' + varName + ' = ' + varValue + ';\n';
            } else if (window.programmingLanguage === 'js') {
                code += 'let ' + varName + ' = ' + varValue + ';\n';
            }
        } else if (isFunction) {
            for (i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                    if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') {
                        if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                            varType = 'int *';
                        } else {
                            varType = 'int';
                        }
                    } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                        varType = 'String';
                    } else {
                        varType = '';
                    }
                    if (window.programmingLanguage === 'python') {
                        code += varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + ';\n';
                    } else if (window.programmingLanguage === 'cpp') {
                        code += varType + ' ' + varName + ' = ' + varValue + ';\n';
                    } else if (window.programmingLanguage === 'js') {
                        code += 'let ' + varName + ' = ' + varValue + ';\n';
                    }
                }
            }
        } else if (varValue[0] === '{') {
            varType = 'int *';
            varValue = varValue.replace('{', '').replace('}', '').split(',');
            code += varType + varName + ' = (int*)malloc(3*sizeof(int));\n';
            code += varName + '[0] = ' + varValue[0] + ';\n' + varName + '[1] = ' + varValue[1] + ';\n' + varName + '[2] = ' + varValue[2] + ';\n';
        } else if (this.isVariable(varValue)) {
            varType = RoboBlocks.variables[varValue][0];
            if (window.programmingLanguage === 'python') {
                code += varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + '\n';
            } else if (window.programmingLanguage === 'cpp') {
                code += varType + ' ' + varName + ' = ' + varValue + ';\n';
            } else if (window.programmingLanguage === 'js') {
                code += 'let ' + varName + ' = ' + varValue + ';\n';
            }
        } else if (varValue.search('readJoystick') >= 0) {
            varType = 'int *';
            code += varType + varName + ' = (int*)malloc(3*sizeof(int));\n';
            if (window.programmingLanguage === 'python') {
                code += varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + '\n';
            } else if (window.programmingLanguage === 'cpp') {
                code += varType + ' ' + varName + ' = ' + varValue + ';\n';
            } else if (window.programmingLanguage === 'js') {
                code += 'let ' + varName + ' = ' + varValue + ';\n';
            }
        } else if (
            varValue.search('analogRead') >= 0 ||
            varValue.search('digitalRead') >= 0 ||
            varValue.search('Distanc') >= 0 ||
            !isNaN(parseFloat(varValue)) ||
            varValue.search('random') >= 0 ||
            varValue.search('map') >= 0 ||
            varValue.search('\\[') >= 0 ||
            varValue.search('abs') >= 0 ||
            varValue.search('sqrt') >= 0 ||
            varValue.search('log') >= 0 ||
            varValue.search('exp') >= 0 ||
            varValue.search('pow') >= 0 ||
            varValue.search('\\+') >= 0
        ) {
            varType = 'int';
            if (window.programmingLanguage === 'python') {
                code += varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + '\n';
            } else if (window.programmingLanguage === 'cpp') {
                code += varType + ' ' + varName + ' = ' + varValue + ';\n';
            } else if (window.programmingLanguage === 'js') {
                code += 'let ' + varName + ' = ' + varValue + ';\n';
            }
        } else {
            varType = 'unknown';
            if (window.programmingLanguage === 'python') {
                code += varName + ': ' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + '\n';
            } else if (window.programmingLanguage === 'cpp') {
                code += varType + ' ' + varName + ' = ' + varValue + ';\n';
            } else if (window.programmingLanguage === 'js') {
                code += 'let ' + varName + ' = ' + varValue + ';\n';
            }
        }

        RoboBlocks.variables[varName] = [varType, 'local'];
        RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'local'];
        RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

        return code;
    };
    Blockly.Blocks.variables_local = {
        // Variable setter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS'));
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setFieldValue(newName, 'VAR');
            }
        },
        isVariable: Blockly.Blocks.variables_global.isVariable,
        onchange: Blockly.Blocks.variables_global.onchange,
        validName: Blockly.Blocks.variables_global.validName
    };
    // Source: src/blocks/variables_local_type/variables_local_type.js
    /* global Blockly,  RoboBlocks */
    /* jshint sub:true */
    /**
     * variable code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.variables_local_type = function () {
        // Variable setter.
        var varType = this.getFieldValue('VAR_TYPE');
        var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
        var varName = this.getFieldValue('VAR') || '';
        var code = '';

        var a = RoboBlocks.findPinMode(varValue);
        code += a['code'];
        varValue = a['pin'];

        if (window.programmingLanguage === 'python') {
            code += varName + ':' + { 'String': 'str', 'int': 'int', 'long': 'int', 'byte': 'int', 'float': 'float' }[varType] + ' = ' + varValue + ';\n';
        } else if (window.programmingLanguage === 'cpp') {
            code += varType + ' ' + varName + ' = ' + varValue + ';\n';
        } else if (window.programmingLanguage === 'js') {
            code += 'let ' + varName + ' = ' + varValue + ';\n';
        }

        RoboBlocks.variables[varName] = [varType, 'local'];
        RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'local'];
        RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

        return code;
    };
    Blockly.Blocks.variables_local_type = {
        // Variable setter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
        },
        getVars: function () {
            return [this.getFieldValue('VAR')];
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setFieldValue(newName, 'VAR');
            }
        },
        isVariable: Blockly.Blocks.variables_global.isVariable,
        onchange: Blockly.Blocks.variables_global.onchange,
        validName: Blockly.Blocks.variables_global.validName
    };

    // Source: src/blocks/variables_set/variables_set.js
    /* global Blockly, JST, RoboBlocks */
    /* jshint sub:true */
    /**
     * variables_set code generation
     * @return {String} Code generated with block parameters
     */
    Blockly.Arduino.variables_set = function () {
        // Variable setter.
        var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
        var varName = this.getFieldValue('VAR') || '';
        var code = '';

        var a = RoboBlocks.findPinMode(varValue);
        code += a['code'];
        varValue = a['pin'];


        code += JST['variables_set']({
            'varName': varName,
            'varValue': varValue
        }, window.programmingLanguage);
        return code;
    };
    Blockly.Blocks.variables_set = {
        // Variable setter.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_VAR,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
            this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_SET'))
                // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                .appendField(new Blockly.FieldVariable(' '), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_SET_AS')).setAlign(Blockly.ALIGN_RIGHT);
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_SET_TOOLTIP'));
        },
        getVariables: function () {
            var variables = Blockly.Variables.allVariables();
            var dropdown = [];
            if (variables.length > 0) {
                for (var i in variables) {
                    dropdown.push([variables[i], variables[i]]);
                }
            } else {
                dropdown.push(['', '']);
            }
            return dropdown;
        },
        onchange: function () {
            if (!this.workspace) {
                // Block has been deleted.
                return;
            }
            try {
                if (!this.exists()) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                } else {
                    this.setWarningText(null);
                }
            } catch (e) { }
        },
        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            }
        },
        exists: function () {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                    return true;
                }
            }
            return false;
        }
    };

    // Raspberry a futuro
    Blockly.Arduino.raspberry_send = function () {
        var statement_send = Blockly.Arduino.valueToCode(this, 'SNT', Blockly.Arduino.ORDER_ATOMIC) || '';

        var code = '';
        var a = RoboBlocks.findPinMode(statement_send);
        code += a['code'];
        statement_send = a['pin'];

        code += JST['raspberry_send']({
            'statement_send': statement_send
        }, window.programmingLanguage);

        return code;
    };

    // Source: src/blocks/math_number/math_number.js
    /* global Blockly, RoboBlocks */
    /* jshint sub:true */

    /**
     * math_number code generation
     * @return {String} Code generated with block parameters
     */

    Blockly.Arduino.math_integer_dc = function () {
        // Numeric value.
        var code = window.parseFloat(this.getFieldValue('NUM'));
        // -4.abs() returns -4 in Dart due to strange order of operation choices.
        // -4 is actually an operator and a number.  Reflect this in the order.
        var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
        return [code, order];
    };

    Blockly.Blocks.math_integer_dc = {
        // Numeric value.
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
        helpUrl: RoboBlocks.URL_MATH,
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_MATH);
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_dc.validator), 'NUM');
            this.setOutput(true, Number);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
        }
    };

    Blockly.Blocks.math_integer_dc.validator = function (text) {
        // Ensure that only a valid integer with up to 4 digits may be entered.
        var n = window.parseInt(text || 0, 10);

        // Check if it's a valid integer with up to 4 digits.
        if (Number.isInteger(n) && n >= 0 && n <= 255) {
            return String(n);
        } else {
            return null;
        }
    };

    /**
     * bq_bluetooth_send block definition
     * @type {Object}
     */
    Blockly.Blocks.raspberry_send = {
        category: RoboBlocks.locales.getKey('LANG_CATEGORY_RASPBERRY'),
        tags: ['raspberry'],
        helpUrl: RoboBlocks.URL_BT,
        /**
         * bq_bluetooth_send initialization
         */
        init: function () {
            this.setColour(RoboBlocks.LANG_COLOUR_RASPBERRY);
            this.appendDummyInput()
                .appendField(RoboBlocks.locales.getKey('LANG_RASPBERRY_SEND'));
            this.appendValueInput('SNT')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(RoboBlocks.locales.getKey('LANG_RASPBERRY_SEND'));
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_RASPBERRY_SEND'));
        }
    };
    return Blockly.Blocks;
};

// Definición del objeto RoboBlocks
var RoboBlocks = {
    load: load,
    language: null // Aquí se almacenará el idioma seleccionado
};

// Exponer RoboBlocks globalmente si se ejecuta en el navegador
if (typeof window !== 'undefined') {
    window.RoboBlocks = RoboBlocks;
}

// Exportar RoboBlocks como un módulo ES6
export { RoboBlocks };