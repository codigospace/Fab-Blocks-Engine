
import { register } from '../registry.js';

export function registerJavascript() {
    register('js', 'advanced_conversion', (obj) => {
        let __p = '';
        let __t;
        __p += `var changeBase = (number, base) => number.toString(base);\n` +
            `changeBase(${obj.value_num || ''}, ${obj.convertion || ''})`;
        return __p;
    });

    register('js', 'advanced_map', (obj) => {
        let __p = '';
        let __t;
        __p += `var mapValue = (num, fromMin, fromMax, toMin, toMax) => (num - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;\n` +
            `mapValue(${obj.num || ''}, ${obj.from_min || ''}, ${obj.from_max || ''}, ${obj.to_min || ''}, ${obj.to_max || ''})`;
        return __p;
    });

    register('js', 'base_delay', (obj) => {
        let __p = '';
        let __t;
        __p += 'setTimeout(() => {}, ' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'time_library', (obj) => {
        let __p = '';
        let __t;
        __p += '// No need to import time library in js\n';
        return __p;
    });

    register('js', 'math_library', (obj) => {
        let __p = '';
        let __t;
        __p += '// No need to import math library in js\n';
        return __p;
    });

    register('js', 'random_library', (obj) => {
        let __p = '';
        let __t;
        __p += '// No need to import random library in js\n';
        return __p;
    });

    register('js', 'analog_library', (obj) => {
        let __p = '';
        let __t;
        __p += '// For analog input, you may use an appropriate library like Johnny-Five or similar in js\n';
        return __p;
    });

    register('js', 'base_map', (obj) => {
        let __p = '';
        let __t;
        __p += `var baseMap = (valueNum, valueDmax) => (valueNum / 1023) * valueDmax;\n` +
            `baseMap(` +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            `, ` +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            `);\n`;
        return __p;
    });

    register('js', 'base_millis', (obj) => {
        let __p = '';
        let __t;
        __p += 'Date.now();\n'; // En js, se puede usar Date.now() para obtener el tiempo en milisegundos
        return __p;
    });

    register('js', 'bq_bat', (obj) => {
        let __p = '';
        let __t;
        __p += `getDistance(` +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            `, ` +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            `);\n`; // Suponiendo que hay una función getDistance en js
        return __p;
    });

    register('js', 'bq_bat_definitions_distance', (obj) => {
        let __p = '';
        let __t;
        __p += `function getDistance(triggerPin, echoPin) {\n` +
                `    let microseconds = TPInit(triggerPin, echoPin);\n` +
                `    let distance = microseconds / 29 / 2;\n` +
                `    if (distance === 0) {\n` +
                `        distance = 999;\n` +
                `    }\n` +
                `    return distance;\n` +
                `}\n`;
        return __p;
    });

    register('js', 'bq_bat_definitions_tp_init', (obj) => {
        let __p = '';
        let __t;
        __p += `function TPInit(triggerPin, echoPin) {\n` +
                `    digitalWrite(triggerPin, LOW);\n` +
                `    delayMicroseconds(2);\n` +
                `    digitalWrite(triggerPin, HIGH);\n` +
                `    delayMicroseconds(10);\n` +
                `    digitalWrite(triggerPin, LOW);\n` +
                `    let microseconds = pulseIn(echoPin, HIGH);\n` +
                `    return microseconds;\n` +
                `}\n`;
        return __p;
    });

    register('js', 'bq_bat_setups_echo', (obj) => {
        let __p = '';
        let __t;
        __p += `pinMode(${(__t = (obj.echo_pin)) == null ? '' : __t}, INPUT);\n`;
        return __p;
    });

    register('js', 'bq_bat_setups_trigger', (obj) => {
        let __p = '';
        let __t;
        __p += `pinMode(${(__t = (obj.trigger_pin)) == null ? '' : __t}, OUTPUT);\n`;
        return __p;
    });

    register('js', 'bq_bluetooth_def_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += `var SerialPort = require('serialport');\n`; // Si se utiliza Node.js
        return __p;
    });

    register('js', 'bq_bluetooth_def_setups', (obj) => {
        let __p = '';
        let __t;
        __p += `pinMode(${(__t = (obj.dropdown_pin)) == null ? '' : __t}, INPUT);\n` +
            `pinMode(${(__t = (obj.NextPIN)) == null ? '' : __t}, OUTPUT);\n` +
            `var blueToothSerial = new SerialPort({\n` +
            `    path: 'COM_PORT', // Reemplaza con el puerto real\n` +
            `    baudRate: ${(__t = (obj.baud_rate)) == null ? '' : __t}\n` +
            `});\n`;
        return __p;
    });

    register('js', 'bq_bluetooth_receive', (obj) => {
        let __p = '';
        let __t;
        __p += 'blueToothSerial.read(); // Leer el dato del puerto serie\n';
        return __p;
    });

    register('js', 'bq_bluetooth_send', (obj) => {
        let __p = '';
        let __t;
        __p += 'blueToothSerial.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'bq_button', (obj) => {
        let __p = '';
        let __t;
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'bq_button_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
        return __p;
    });

    register('js', 'bq_buttons', (obj) => {
        let __p = '';
        let __t;
        __p += '  adc_key_in = analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n  key = get_key(adc_key_in);\n  if (key !== oldkey) {\n' +
            '    delay(50);\n    adc_key_in = analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n    key = get_key(adc_key_in);\n    if (key !== oldkey) {\n' +
            '      oldkey = key;\n      if (key >= 0) {\n        switch(key) {\n' +
            '          case 0:\n            ' + ((__t = (obj.code_btn1)) == null ? '' : __t) + '\n            break;\n' +
            '          case 1:\n            ' + ((__t = (obj.code_btn2)) == null ? '' : __t) + '\n            break;\n' +
            '          case 2:\n            ' + ((__t = (obj.code_btn3)) == null ? '' : __t) + '\n            break;\n' +
            '          case 3:\n            ' + ((__t = (obj.code_btn4)) == null ? '' : __t) + '\n            break;\n' +
            '          case 4:\n            ' + ((__t = (obj.code_btn5)) == null ? '' : __t) + '\n            break;\n' +
            '        }\n      }\n    }\n  }\n';
        return __p;
    });

    register('js', 'bq_infrared', (obj) => {
        let __p = '';
        let __t;
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'bq_infrared_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', INPUT);\n';
        return __p;
    });

    register('js', 'bq_joystick_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'function readJoystick_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '() {\n' +
            '    let _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            ' = [];\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '[0] = analogRead(' +
            ((__t = (obj.pinx)) == null ? '' : __t) +
            ');\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '[1] = analogRead(' +
            ((__t = (obj.piny)) == null ? '' : __t) +
            ');\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '[2] = digitalRead(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ');\n' +
            '    return _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            ';\n}\n';
        return __p;
    });

    register('js', 'bq_joystick_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
        return __p;
    });

    register('js', 'bq_led', (obj) => {
        let __p = '';
        let __t;
        __p += 'digitalWrite(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'bq_led_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', OUTPUT);\n';
        return __p;
    });

    register('js', 'bq_photoresistor', (obj) => {
        let __p = '';
        let __t;
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'bq_piezo_buzzer', (obj) => {
        let __p = '';
        let __t;
        __p += 'tone(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'bq_piezo_buzzerav', (obj) => {
        let __p = '';
        let __t;
        __p += 'tone(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.Buzztone)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n\n';
        return __p;
    });

    register('js', 'bq_potentiometer', (obj) => {
        let __p = '';
        let __t;
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'controls_doWhile', (obj) => {
        let __p = '';
        let __t;
        __p += 'do {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n} while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'controls_else', (obj) => {
        let __p = '';
        let __t;
        __p += 'else {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('js', 'controls_elseif', (obj) => {
        let __p = '';
        let __t;
        __p += 'else if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('js', 'controls_if', (obj) => {
        let __p = '';
        let __t;
        __p += 'if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('js', 'controls_whileUntil', (obj) => {
        let __p = '';
        let __t;
        __p += 'while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('js', 'logic_operation', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
        return __p;
    });

    register('js', 'math_arithmetic', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
        return __p;
    });

    register('js', 'math_arithmetic_pow', (obj) => {
        let __p = '';
        let __t;
        __p += 'Math.pow(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.argument1)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('js', 'math_modulo', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (obj.argument1)) == null ? '' : __t);
        return __p;
    });

    register('js', 'math_random', (obj) => {
        let __p = '';
        let __t;
        __p += 'Math.floor(Math.random() * (' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ' - ' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ' + 1)) + ' +   
            ((__t = (obj.value_num)) == null ? '' : __t);
        return __p;
    });

    register('js', 'procedures_callnoreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'procedures_callreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');';
        return __p;
    });

    register('js', 'procedures_defnoreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            'function ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (obj.args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('js', 'procedures_defreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            'function ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (obj.args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n' +  
            ((__t = (obj.returnValue)) == null ? '' : __t) +
            ';\n' +
            '}\n';
        return __p;
    });

    register('js', 'serial_print', (obj) => {
        let __p = '';
        let __t;
        __p += 'console.log(' + obj.content + ');\n';
        return __p;
    });

    register('js', 'serial_println', (obj) => {
        let __p = '';
        let __t;
        __p += 'console.log(' + obj.content + ');\n';
        return __p;
    });

    register('js', 'serial_read', (obj) => {
        let __p = '';
        let __t;
        __p += 'serial.read()'; // Simulando Serial.read()
        return __p;
    });

    register('js', 'serial_readstring', (obj) => {
        let __p = '';
        let __t;
        __p += 'serial.read()'; // Simulando Serial.readString()
        return __p;
    });

    register('js', 'serial_special', (obj) => {
        let __p = '';
        let __t;
        __p += (
            (obj.char) == null ? '' : obj.char);
        return __p;
    });

    register('js', 'servo_cont', (obj) => {
        let __p = '';
        let __t;
        __p += 'servos[' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (obj.value_degree)) == null ? '' : __t) +
            ');\nsetTimeout(() => {}, ' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'text_equalsIgnoreCase', (obj) => {
        let __p = '';
        let __t;
        __p += 'String.prototype.equalsIgnoreCase = function (str) {\n' +
            '    return this.toLowerCase() === str.toLowerCase();\n' +
            '};\n' +
            'let result = ' + 
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.equalsIgnoreCase(' +
            ((__t = (obj.string2)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('js', 'text_length', (obj) => {
        let __p = '';
        let __t;
        __p += 'String(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ').length';
        return __p;
    });

    register('js', 'text_substring', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.substring(' +
            ((__t = (obj.from)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.to)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('js', 'bq_test_setups', (obj) => {
        let __p = '';
        let __t;
        __p += ((__t = (obj.name_mod)) == null ? '' : __t) +
            '.init()\n';
        return __p;
    });

    register('js', 'bq_test_def_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'import { Modular } from "modular";\n';
        return __p;
    });

    register('js', 'mod_def_declare', (obj) => {
        let __p = '';
        let __t;
        __p += 'var ' + obj.name_mod + ' = new Modular.' + obj.dropdown_mod + '(' + obj.dropdown_pin + ');\n';
        return __p;
    });

    register('js', 'raspberry_send', (obj) => {
        let __p = '';
        let __t;
        __p += 'rasp.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ');\n';
        return __p;
    });
}
