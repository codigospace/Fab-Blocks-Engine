
import { register } from '../registry.js';

export function registerPython() {
    register('python', 'advanced_conversion', (obj) => {
        let __p = '';
        let __t;
        __p += `change_base = lambda number, base_destiny: format(int(number), {"DEC": "d", "HEX": "x", "OCT": "o", "BIN": "b"}[base_destiny])\n` +
            `change_base(${obj.value_num || ''},${obj.convertion || ''})`;
        return __p;
    });

    register('python', 'advanced_map', (obj) => {
        let __p = '';
        let __t;
        __p += `map_value = lambda num, from_min, from_max, to_min, to_max: (num - from_min) * (to_max - to_min) / (from_max - from_min) + to_min\n` +
            `map_value(${obj.num || ''},${obj.from_min || ''},${obj.from_max || ''},${obj.to_min || ''},${obj.to_max || ''})`;
        return __p;
    });

    register('python', 'base_delay', (obj) => {
        let __p = '';
        let __t;
        __p += 'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'time_library', (obj) => {
        let __p = '';
        let __t;
        __p += 'import time\n';
        return __p;
    });

    register('python', 'math_library', (obj) => {
        let __p = '';
        let __t;
        __p += 'import math\n';
        return __p;
    });

    register('python', 'random_library', (obj) => {
        let __p = '';
        let __t;
        __p += 'import random\n';
        return __p;
    });

    register('python', 'analog_library', (obj) => {
        let __p = '';
        let __t;
        __p += 'from gpiozero import MCP3008\n';
        return __p;
    });

    register('python', 'base_map', (obj) => {
        let __p = '';
        let __t;
        __p += 'def base_map(value_num, value_dmax):\n' +
                '    return (value_num / 1023) * value_dmax\n' +
                'base_map(' +
                ((__t = (obj.value_num)) == null ? '' : __t) +
                ',' +
                ((__t = (obj.value_dmax)) == null ? '' : __t) +
                ')';
        return __p;
    });

    register('python', 'base_millis', (obj) => {
        let __p = '';
        let __t;
        __p += 'import time\n' +
                'millis = int(time.time() * 1000)\n'; // En Python, millis puede representarse como tiempo en milisegundos
        return __p;
    });

    register('python', 'bq_bat', (obj) => {
        let __p = '';
        let __t;
        __p += 'distance = Distance(' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'bq_bat_definitions_distance', (obj) => {
        let __p = '';
        let __t;
        __p += `def Distance(trigger_pin, echo_pin):\n` +
                `    microseconds = TP_init(trigger_pin, echo_pin)\n` +
                `    distance = microseconds / 29 / 2\n` +
                `    if distance == 0:\n` +
                `        distance = 999\n` +
                `    return distance\n`;
        return __p;
    });

    register('python', 'bq_bat_definitions_tp_init', (obj) => {
        let __p = '';
        let __t;
        __p += `def TP_init(trigger_pin, echo_pin):\n` +
                `    digitalWrite(trigger_pin, LOW)\n` +
                `    delayMicroseconds(2)\n` +
                `    digitalWrite(trigger_pin, HIGH)\n` +
                `    delayMicroseconds(10)\n` +
                `    digitalWrite(trigger_pin, LOW)\n` +
                `    microseconds = pulseIn(echo_pin, HIGH)\n` +
                `    return microseconds\n`;
        return __p;
    });

    register('python', 'bq_bat_setups_echo', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ', GPIO.IN)\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_bat_setups_trigger', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ', GPIO.OUT)\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_bluetooth_def_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'import serial\n'; // Asumiendo que se usará la librería pySerial
        return __p;
    });

    register('python', 'bq_bluetooth_def_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.IN)\n  GPIO.setup(' +
            ((__t = (obj.NextPIN)) == null ? '' : __t) +
            ', GPIO.OUT)\n  blueToothSerial = serial.Serial(\n' +
            `    port='COM_PORT',\n    ` + // Reemplaza con el puerto real
            ((__t = (obj.baud_rate)) == null ? '' : __t) +
            ',\n    timeout=1)\n';
        return __p;
    });

    register('python', 'bq_bluetooth_receive', (obj) => {
        let __p = '';
        let __t;
        __p += 'blueToothSerial.read()';
        return __p;
    });

    register('python', 'bq_bluetooth_send', (obj) => {
        let __p = '';
        let __t;
        __p += 'blueToothSerial.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'bq_button', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.input(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_button_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.PULL_UP)\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_buttons', (obj) => {
        let __p = '';
        let __t;
        __p += '  adc_key_in = analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n  key = get_key(adc_key_in)\n  if key != oldkey:\n' +
            '    time.sleep(0.05)\n    adc_key_in = analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n    key = get_key(adc_key_in)\n    if key != oldkey:\n' +
            '        oldkey = key\n' +
            '        if key >= 0:\n' +
            '            if key == 0:\n' +
            '                ' + ((__t = (obj.code_btn1)) == null ? '' : __t) + '\n' +
            '            elif key == 1:\n' +
            '                ' + ((__t = (obj.code_btn2)) == null ? '' : __t) + '\n' +
            '            elif key == 2:\n' +
            '                ' + ((__t = (obj.code_btn3)) == null ? '' : __t) + '\n' +
            '            elif key == 3:\n' +
            '                ' + ((__t = (obj.code_btn4)) == null ? '' : __t) + '\n' +
            '            elif key == 4:\n' +
            '                ' + ((__t = (obj.code_btn5)) == null ? '' : __t) + '\n';
        return __p;
    });

    register('python', 'bq_infrared', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.input(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_infrared_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.IN)\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_joystick_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'def readJoystick_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '():\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            ' = []\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '.append(analogRead(' +
            ((__t = (obj.pinx)) == null ? '' : __t) +
            '))\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '.append(analogRead(' +
            ((__t = (obj.piny)) == null ? '' : __t) +
            '))\n' +
            '    _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '.append(GPIO.input(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            '))\n' +
            '    return _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'bq_joystick_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ', GPIO.PULL_UP)\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_led', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.output(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ')\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_led_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.OUT)\n'; // Asumiendo que se usa la librería RPi.GPIO
        return __p;
    });

    register('python', 'bq_photoresistor', (obj) => {
        let __p = '';
        let __t;
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que hay una función análoga en Python
        return __p;
    });

    register('python', 'bq_piezo_buzzer', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.output(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ')\n' + // Asumiendo que hay un método para manejar el buzzer
            'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'bq_piezo_buzzerav', (obj) => {
        let __p = '';
        let __t;
        __p += 'GPIO.output(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.Buzztone)) == null ? '' : __t) +
            ')\n' +
            'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'bq_potentiometer', (obj) => {
        let __p = '';
        let __t;
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que hay una función análoga en Python
        return __p;
    });

    register('python', 'controls_doWhile', (obj) => {
        let __p = '';
        let __t;
        __p += 'while True:\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n    if (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '):\n        break\n';
        return __p;
    });

    register('python', 'controls_else', (obj) => {
        let __p = '';
        let __t;
        __p += 'else:\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'controls_elseif', (obj) => {
        let __p = '';
        let __t;
        __p += 'elif (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'controls_if', (obj) => {
        let __p = '';
        let __t;
        __p += 'if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '';
        return __p;
    });

    register('python', 'controls_whileUntil', (obj) => {
        let __p = '';
        let __t;
        __p += 'while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'logic_negate', (obj) => {
        let __p = '';
        let __t;
        __p += 'not ' +
            ((__t = (obj.argument0)) == null ? '' : __t);
        return __p;
    });

    register('python', 'logic_operation', (obj) => {
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

    register('python', 'math_arithmetic', (obj) => {
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

    register('python', 'math_arithmetic_pow', (obj) => {
        let __p = '';
        let __t;
        __p += 'pow(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.argument1)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('python', 'math_modulo', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (obj.argument1)) == null ? '' : __t);
        return __p;
    });

    register('python', 'math_random', (obj) => {
        let __p = '';
        let __t;
        __p += 'random.randint(' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('python', 'procedures_callnoreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'procedures_callreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'procedures_defnoreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            'def ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.args)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'procedures_defreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            'def ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.args)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n' +
            ((__t = (obj.returnValue)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'serial_available', (obj) => {
        let __p = '';
        let __t;
        __p += 'if serial.in_waiting > 0:\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
        return __p;
    });

    register('python', 'serial_parseint', (obj) => {
        let __p = '';
        let __t;
        __p += 'int(serial.readline().decode().strip())\n'; // Simulando Serial.parseInt()
        return __p;
    });

    register('python', 'serial_print', (obj) => {
        let __p = '';
        let __t;
        __p += 'print(' + obj.content + ')\n';
        return __p;
    });

    register('python', 'serial_println', (obj) => {
        let __p = '';
        let __t;
        __p += 'print(' + obj.content + ')\n';
        return __p;
    });

    register('python', 'serial_read', (obj) => {
        let __p = '';
        let __t;
        __p += 'serial.read()'; // Simulando Serial.read()
        return __p;
    });

    register('python', 'serial_readstring', (obj) => {
        let __p = '';
        let __t;
        __p += 'serial.read()'; // Simulando Serial.readString()
        return __p;
    });

    register('python', 'serial_special', (obj) => {
        let __p = '';
        let __t;
        __p += (
            (obj.char) == null ? '' : obj.char);
        return __p;
    });

    register('python', 'servo_cont', (obj) => {
        let __p = '';
        let __t;
        __p += 'servos[' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (obj.value_degree)) == null ? '' : __t) +
            ')\n' +
            'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
        return __p;
    });

    register('python', 'text_equalsIgnoreCase', (obj) => {
        let __p = '';
        let __t;
        __p += 'compare_texts = lambda a, b: a.lower() == b.lower()\n' +
            'compare_texts(' + ((__t = (obj.string1)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.string2)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('python', 'text_length', (obj) => {
        let __p = '';
        let __t;
        __p += 'len(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('python', 'text_substring', (obj) => {
        let __p = '';
        let __t;
        __p += 'recort_text = lambda text, start, end: text[start:end]\n' +
            'recort_text(' + ((__t = (obj.string1)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.from)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.to)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('python', 'bq_test_setups', (obj) => {
        let __p = '';
        let __t;
        __p += ((__t = (obj.name_mod)) == null ? '' : __t) +
            '.init()\n';
        return __p;
    });

    register('python', 'bq_test_def_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'import pymodular\n';
        return __p;
    });

    register('python', 'mod_def_declare', (obj) => {
        let __p = '';
        let __t;
        __p += obj.name_mod + ' = pymodular.' + obj.dropdown_mod + '(' + obj.dropdown_pin + ')\n';
        return __p;
    });

    register('python', 'test_inout_digital_write', (obj) => {
        let __p = '';
        let __t;
        let statValue = (obj.dropdown_stat === 'HIGH') ? '1' : '0';
        __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' + statValue + ')\n';
        return __p;
    });

    register('python', 'betto_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'import Betto\n';
        return __p;
    });

    register('python', 'mod_def_declare_betto', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto = Betto()\n';
        return __p;
    });

    register('python', 'betto_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto.init()\n'; // Sin punto y coma para Python
        return __p;
    });

    register('python', 'betto_home', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto.home()\n'; // Sin punto y coma para Python
        return __p;
    });

    register('python', 'declare_betto_movement', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto.' + action + '()\n'; // Python: llamar al método
        return __p;
    });

    register('python', 'carlitto_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'import Carlitto\n';
        return __p;
    });

    register('python', 'mod_def_declare_carlitto', (obj) => {
        let __p = '';
        let __t;
        __p += 'carlitto = Carlitto(' + obj.MOT_LEFT + ',' + obj.POT_LEFT + ',' + obj.MOT_RIGHT + ',' + obj.POT_RIGHT + ',' + obj.POT + ')\n';
        return __p;
    });

    register('python', 'carlitto_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'carlitto.init()\n'; // Sin punto y coma para Python
        return __p;
    });

    register('python', 'carlitto_stop', (obj) => {
        let __p = '';
        let __t;
        __p += 'carlitto.stop()\n'; // Sin punto y coma para Python
        return __p;
    });

    register('python', 'raspberry_send', (obj) => {
        let __p = '';
        let __t;
        __p += 'rasp.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ')\n';
        return __p;
    });
}
