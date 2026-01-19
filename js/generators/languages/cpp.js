
import { register } from '../registry.js';

export function registerCpp() {
    register('cpp', 'advanced_conversion', (obj) => {
        let __p = '';
        let __t;
        __p += `${obj.value_num || ''},${obj.convertion || ''}`;
        return __p;
    });

    register('cpp', 'advanced_map', (obj) => {
        let __p = '';
        let __t;
        __p += `map(${obj.num || ''},${obj.from_min || ''},${obj.from_max || ''},${obj.to_min || ''},${obj.to_max || ''})`;
        return __p;
    });

    register('cpp', 'base_delay', (obj) => {
        let __p = '';
        let __t;
        __p += 'delay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'base_map', (obj) => {
        let __p = '';
        let __t;
        __p += 'map(' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ',0,1023,0,' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'base_millis', (obj) => {
        let __p = '';
        let __t;
        __p += 'millis();\n';
        return __p;
    });

    register('cpp', 'bq_bat', (obj) => {
        let __p = '';
        let __t;
        __p += 'Distance(' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'bq_bat_definitions_distance', (obj) => {
        let __p = '';
        let __t;
        __p += 'long Distance(int trigger_pin, int echo_pin)\n{\n  long microseconds = TP_init(trigger_pin, echo_pin);\n  long distance;\n  distance = microseconds/29/2;\n  if (distance == 0){\n    distance = 999;\n  }\n  return distance;\n}\n';
        return __p;
    });

    register('cpp', 'bq_bat_definitions_tp_init', (obj) => {
        let __p = '';
        let __t;
        __p += '//bqBAT\nlong TP_init(int trigger_pin, int echo_pin)\n{\n  digitalWrite(trigger_pin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigger_pin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigger_pin, LOW);\n  long microseconds = pulseIn(echo_pin ,HIGH);\n  return microseconds;\n}\n';
        return __p;
    });

    register('cpp', 'bq_bat_setups_echo', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode( ' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ' , INPUT );\n';
        return __p;
    });

    register('cpp', 'bq_bat_setups_trigger', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode( ' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ' , OUTPUT );\n';
        return __p;
    });

    register('cpp', 'bq_bluetooth_def_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += '#include <SoftwareSerial.h>\n';
        return __p;
    });

    register('cpp', 'bq_bluetooth_def_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',INPUT);\n  pinMode(' +
            ((__t = (obj.NextPIN)) == null ? '' : __t) +
            ', OUTPUT);\n  blueToothSerial.begin(' +
            ((__t = (obj.baud_rate)) == null ? '' : __t) +
            ');\n  blueToothSerial.flush();\n';
        return __p;
    });

    register('cpp', 'bq_bluetooth_receive', (obj) => {
        let __p = '';
        let __t;
        __p += 'blueToothSerial.read()';
        return __p;
    });

    register('cpp', 'bq_bluetooth_send', (obj) => {
        let __p = '';
        let __t;
        __p += 'blueToothSerial.write( ' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ' );\n';
        return __p;
    });

    register('cpp', 'bq_button', (obj) => {
        let __p = '';
        let __t;
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'bq_button_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
        return __p;
    });

    register('cpp', 'bq_buttons', (obj) => {
        let __p = '';
        let __t;
        __p += '  adc_key_in = analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n  key = get_key(adc_key_in);\n  if (key != oldkey)\n  {\n    delay(50);\n    adc_key_in = analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n    key = get_key(adc_key_in);\n    if (key != oldkey)\n    {\n      oldkey = key;\n      if (key >=0){\n        switch(key)\n        {\n          case 0:\n           ' +
            ((__t = (obj.code_btn1)) == null ? '' : __t) +
            '\n          break;\n          case 1:\n           ' +
            ((__t = (obj.code_btn2)) == null ? '' : __t) +
            '\n          break;\n          case 2:\n           ' +
            ((__t = (obj.code_btn3)) == null ? '' : __t) +
            '\n          break;\n          case 3:\n           ' +
            ((__t = (obj.code_btn4)) == null ? '' : __t) +
            '\n          break;  \n          case 4:\n           ' +
            ((__t = (obj.code_btn5)) == null ? '' : __t) +
            '\n          break;\n        }      \n      }\n    }\n  }\n';
        return __p;
    });

    register('cpp', 'bq_infrared', (obj) => {
        let __p = '';
        let __t;
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'bq_infrared_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode( ' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ' , INPUT);\n';
        return __p;
    });

    register('cpp', 'bq_joystick_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += 'int * readJoystick_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '(){\n  _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '[0]=analogRead(' +
            ((__t = (obj.pinx)) == null ? '' : __t) +
            ');\n  _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '[1]=analogRead(' +
            ((__t = (obj.piny)) == null ? '' : __t) +
            ');\n  _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            '[2]=digitalRead(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ');\n  return _internal_readJoystick_array_' +
            ((__t = (obj.name)) == null ? '' : __t) +
            ';\n}';
        return __p;
    });

    register('cpp', 'bq_joystick_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
        return __p;
    });

    register('cpp', 'bq_led', (obj) => {
        let __p = '';
        let __t;
        __p += 'digitalWrite(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'bq_led_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', OUTPUT);\n';
        return __p;
    });

    register('cpp', 'bq_photoresistor', (obj) => {
        let __p = '';
        let __t;
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'bq_piezo_buzzer', (obj) => {
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

    register('cpp', 'bq_piezo_buzzerav', (obj) => {
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

    register('cpp', 'bq_potentiometer', (obj) => {
        let __p = '';
        let __t;
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'controls_doWhile', (obj) => {
        let __p = '';
        let __t;
        __p += 'do {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n} while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'controls_else', (obj) => {
        let __p = '';
        let __t;
        __p += 'else {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('cpp', 'controls_elseif', (obj) => {
        let __p = '';
        let __t;
        __p += 'else if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('cpp', 'controls_if', (obj) => {
        let __p = '';
        let __t;
        __p += 'if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('cpp', 'controls_whileUntil', (obj) => {
        let __p = '';
        let __t;
        __p += 'while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('cpp', 'logic_negate', (obj) => {
        let __p = '';
        let __t;
        __p += '!' +
            ((__t = (obj.argument0)) == null ? '' : __t);
        return __p;
    });

    register('cpp', 'logic_operation', (obj) => {
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

    register('cpp', 'math_arithmetic', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            '' +
            ((__t = (obj.argument1)) == null ? '' : __t);
        return __p;
    });

    register('cpp', 'math_arithmetic_pow', (obj) => {
        let __p = '';
        let __t;
        __p += 'pow(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.argument1)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'math_modulo', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (obj.argument1)) == null ? '' : __t);
        return __p;
    });

    register('cpp', 'math_random', (obj) => {
        let __p = '';
        let __t;
        __p += 'random(' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'procedures_callnoreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'procedures_callreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'procedures_defnoreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.returnType)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (obj.args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('cpp', 'procedures_defreturn', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.returnType)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (obj.args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n' +
            ((__t = (obj.returnValue)) == null ? '' : __t) +
            '}\n';
        return __p;
    });

    register('cpp', 'serial_available', (obj) => {
        let __p = '';
        let __t;
        __p += 'if (Serial.available() > 0) {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n}\n';
        return __p;
    });

    register('cpp', 'serial_parseint', (obj) => {
        let __p = '';
        let __t;
        __p += 'Serial.parseInt();\n';
        return __p;
    });

    register('cpp', 'serial_print', (obj) => {
        let __p = '';
        let __t;
        __p += 'Serial.print(' +
            ((__t = (obj.content)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'serial_println', (obj) => {
        let __p = '';
        let __t;
        __p += 'Serial.println(' +
            ((__t = (obj.content)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'serial_read', (obj) => {
        let __p = '';
        let __t;
        __p += 'Serial.read()';
        return __p;
    });

    register('cpp', 'serial_readstring', (obj) => {
        let __p = '';
        let __t;
        __p += 'Serial.readString()\n';
        return __p;
    });

    register('cpp', 'serial_special', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.char)) == null ? '' : __t);
        return __p;
    });

    register('cpp', 'servo_cont', (obj) => {
        let __p = '';
        let __t;
        __p += 'servos[' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (obj.value_degree)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'text_equalsIgnoreCase', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.equalsIgnoreCase(' +
            ((__t = (obj.string2)) == null ? '' : __t) +
            ')';
        return __p;
    });

    register('cpp', 'text_length', (obj) => {
        let __p = '';
        let __t;
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '.length()';
        return __p;
    });

    register('cpp', 'text_substring', (obj) => {
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

    register('cpp', 'bq_test_setups', (obj) => {
        let __p = '';
        let __t;
        __p += ((__t = (obj.name_mod)) == null ? '' : __t) +
            '.init();\n';
        return __p;
    });

    register('cpp', 'bq_test_def_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += '#include <Modular.h>\n';
        return __p;
    });

    register('cpp', 'mod_def_declare', (obj) => {
        let __p = '';
        let __t;
        __p += obj.dropdown_mod + ' ' + obj.name_mod + '(' + obj.dropdown_pin + ');\n';
        return __p;
    });

    register('cpp', 'test_inout_digital_write', (obj) => {
        let __p = '';
        let __t;
        __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ');\n';
        return __p;
    });

    register('cpp', 'betto_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += '#include <Betto.h>\n';
        return __p;
    });

    register('cpp', 'mod_def_declare_betto', (obj) => {
        let __p = '';
        let __t;
        __p += 'Betto betto;\n';
        return __p;
    });

    register('cpp', 'betto_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto.init();\n'; // Agregar punto y coma para C++
        return __p;
    });

    register('cpp', 'betto_home', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto.home();\n'; // Agregar punto y coma para C++
        return __p;
    });

    register('cpp', 'declare_betto_movement', (obj) => {
        let __p = '';
        let __t;
        __p += 'betto.' + action + '();\n'; // C++: llamar al método
        return __p;
    });

    register('cpp', 'carlitto_definitions', (obj) => {
        let __p = '';
        let __t;
        __p += '#include <Carlitto.h>\n';
        return __p;
    });

    register('cpp', 'mod_def_declare_carlitto', (obj) => {
        let __p = '';
        let __t;
        __p += 'Carlitto carlitto(' + obj.MOT_LEFT + ',' + obj.POT_LEFT + ',' + obj.MOT_RIGHT + ',' + obj.POT_RIGHT + ',' + obj.POT + ');\n';
        return __p;
    });

    register('cpp', 'carlitto_setups', (obj) => {
        let __p = '';
        let __t;
        __p += 'carlitto.init();\n'; // Agregar punto y coma para C++
        return __p;
    });

    register('cpp', 'carlitto_stop', (obj) => {
        let __p = '';
        let __t;
        __p += 'carlitto.stop();\n'; // Agregar punto y coma para C++
        return __p;
    });

    register('cpp', 'raspberry_send', (obj) => {
        let __p = '';
        let __t;
        __p += 'rasp.write( ' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ' );\n';
        return __p;
    });
}
