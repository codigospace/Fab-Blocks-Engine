var JST = {};

JST["advanced_conversion"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += `${obj.value_num || ''},${obj.convertion || ''}`;
    } else if (programmingLanguage === 'python') {
        __p += `change_base = lambda number, base_destiny: format(int(number), {"DEC": "d", "HEX": "x", "OCT": "o", "BIN": "b"}[base_destiny])\n` +
            `change_base(${obj.value_num || ''},${obj.convertion || ''})`;
    } else if (programmingLanguage === 'js') {
        __p += `var changeBase = (number, base) => number.toString(base);\n` +
            `changeBase(${obj.value_num || ''}, ${obj.convertion || ''})`;
    }

    return __p;
};

JST["advanced_map"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += `map(${obj.num || ''},${obj.from_min || ''},${obj.from_max || ''},${obj.to_min || ''},${obj.to_max || ''})`;
    } else if (programmingLanguage === 'python') {
        __p += `map_value = lambda num, from_min, from_max, to_min, to_max: (num - from_min) * (to_max - to_min) / (from_max - from_min) + to_min\n` +
            `map_value(${obj.num || ''},${obj.from_min || ''},${obj.from_max || ''},${obj.to_min || ''},${obj.to_max || ''})`;
    } else if (programmingLanguage === 'js') {
        __p += `var mapValue = (num, fromMin, fromMax, toMin, toMax) => (num - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;\n` +
            `mapValue(${obj.num || ''}, ${obj.from_min || ''}, ${obj.from_max || ''}, ${obj.to_min || ''}, ${obj.to_max || ''})`;
    }

    return __p;
};


// Añade más plantillas JST según sea necesario...
// Time
JST["base_delay"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'delay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'setTimeout(() => {}, ' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
    }
    return __p;
};

// Libraries
JST["time_library"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'python') {
        __p += 'import time\n';
    } else if (programmingLanguage === 'js') {
        __p += '// No need to import time library in js\n';
    }

    return __p;
};

JST["math_library"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'python') {
        __p += 'import math\n';
    } else if (programmingLanguage === 'js') {
        __p += '// No need to import math library in js\n';
    }

    return __p;
};

JST["random_library"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'python') {
        __p += 'import random\n';
    } else if (programmingLanguage === 'js') {
        __p += '// No need to import random library in js\n';
    }

    return __p;
};

JST["analog_library"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'python') {
        __p += 'from gpiozero import MCP3008\n';
    } else if (programmingLanguage === 'js') {
        __p += '// For analog input, you may use an appropriate library like Johnny-Five or similar in js\n';
    }

    return __p;
};

JST["base_map"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'map(' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ',0,1023,0,' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'def base_map(value_num, value_dmax):\n' +
                '    return (value_num / 1023) * value_dmax\n' +
                'base_map(' +
                ((__t = (obj.value_num)) == null ? '' : __t) +
                ',' +
                ((__t = (obj.value_dmax)) == null ? '' : __t) +
                ')';
    } else if (programmingLanguage === 'js') {
        __p += `var baseMap = (valueNum, valueDmax) => (valueNum / 1023) * valueDmax;\n` +
            `baseMap(` +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            `, ` +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            `);\n`;
    }

    return __p;
};

JST["base_millis"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'millis();\n';
    } else if (programmingLanguage === 'python') {
        __p += 'import time\n' +
                'millis = int(time.time() * 1000)\n'; // En Python, millis puede representarse como tiempo en milisegundos
    } else if (programmingLanguage === 'js') {
        __p += 'Date.now();\n'; // En js, se puede usar Date.now() para obtener el tiempo en milisegundos
    }

    return __p;
};

JST["bq_bat"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Distance(' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'distance = Distance(' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += `getDistance(` +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            `, ` +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            `);\n`; // Suponiendo que hay una función getDistance en js
    }

    return __p;
};

JST["bq_bat_definitions_distance"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'long Distance(int trigger_pin, int echo_pin)\n{\n  long microseconds = TP_init(trigger_pin, echo_pin);\n  long distance;\n  distance = microseconds/29/2;\n  if (distance == 0){\n    distance = 999;\n  }\n  return distance;\n}\n';
    } else if (programmingLanguage === 'python') {
        __p += `def Distance(trigger_pin, echo_pin):\n` +
                `    microseconds = TP_init(trigger_pin, echo_pin)\n` +
                `    distance = microseconds / 29 / 2\n` +
                `    if distance == 0:\n` +
                `        distance = 999\n` +
                `    return distance\n`;
    } else if (programmingLanguage === 'js') {
        __p += `function getDistance(triggerPin, echoPin) {\n` +
                `    let microseconds = TPInit(triggerPin, echoPin);\n` +
                `    let distance = microseconds / 29 / 2;\n` +
                `    if (distance === 0) {\n` +
                `        distance = 999;\n` +
                `    }\n` +
                `    return distance;\n` +
                `}\n`;
    }

    return __p;
};

JST["bq_bat_definitions_tp_init"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += '//bqBAT\nlong TP_init(int trigger_pin, int echo_pin)\n{\n  digitalWrite(trigger_pin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigger_pin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigger_pin, LOW);\n  long microseconds = pulseIn(echo_pin ,HIGH);\n  return microseconds;\n}\n';
    } else if (programmingLanguage === 'python') {
        __p += `def TP_init(trigger_pin, echo_pin):\n` +
                `    digitalWrite(trigger_pin, LOW)\n` +
                `    delayMicroseconds(2)\n` +
                `    digitalWrite(trigger_pin, HIGH)\n` +
                `    delayMicroseconds(10)\n` +
                `    digitalWrite(trigger_pin, LOW)\n` +
                `    microseconds = pulseIn(echo_pin, HIGH)\n` +
                `    return microseconds\n`;
    } else if (programmingLanguage === 'js') {
        __p += `function TPInit(triggerPin, echoPin) {\n` +
                `    digitalWrite(triggerPin, LOW);\n` +
                `    delayMicroseconds(2);\n` +
                `    digitalWrite(triggerPin, HIGH);\n` +
                `    delayMicroseconds(10);\n` +
                `    digitalWrite(triggerPin, LOW);\n` +
                `    let microseconds = pulseIn(echoPin, HIGH);\n` +
                `    return microseconds;\n` +
                `}\n`;
    }

    return __p;
};

JST["bq_bat_setups_echo"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode( ' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ' , INPUT );\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.echo_pin)) == null ? '' : __t) +
            ', GPIO.IN)\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += `pinMode(${(__t = (obj.echo_pin)) == null ? '' : __t}, INPUT);\n`;
    }

    return __p;
};

JST["bq_bat_setups_trigger"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode( ' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ' , OUTPUT );\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.trigger_pin)) == null ? '' : __t) +
            ', GPIO.OUT)\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += `pinMode(${(__t = (obj.trigger_pin)) == null ? '' : __t}, OUTPUT);\n`;
    }

    return __p;
};

JST["bq_bluetooth_def_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += '#include <SoftwareSerial.h>\n';
    } else if (programmingLanguage === 'python') {
        __p += 'import serial\n'; // Asumiendo que se usará la librería pySerial
    } else if (programmingLanguage === 'js') {
        __p += `var SerialPort = require('serialport');\n`; // Si se utiliza Node.js
    }

    return __p;
};

JST["bq_bluetooth_def_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',INPUT);\n  pinMode(' +
            ((__t = (obj.NextPIN)) == null ? '' : __t) +
            ', OUTPUT);\n  blueToothSerial.begin(' +
            ((__t = (obj.baud_rate)) == null ? '' : __t) +
            ');\n  blueToothSerial.flush();\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.IN)\n  GPIO.setup(' +
            ((__t = (obj.NextPIN)) == null ? '' : __t) +
            ', GPIO.OUT)\n  blueToothSerial = serial.Serial(\n' +
            `    port='COM_PORT',\n    ` + // Reemplaza con el puerto real
            ((__t = (obj.baud_rate)) == null ? '' : __t) +
            ',\n    timeout=1)\n';
    } else if (programmingLanguage === 'js') {
        __p += `pinMode(${(__t = (obj.dropdown_pin)) == null ? '' : __t}, INPUT);\n` +
            `pinMode(${(__t = (obj.NextPIN)) == null ? '' : __t}, OUTPUT);\n` +
            `var blueToothSerial = new SerialPort({\n` +
            `    path: 'COM_PORT', // Reemplaza con el puerto real\n` +
            `    baudRate: ${(__t = (obj.baud_rate)) == null ? '' : __t}\n` +
            `});\n`;
    }

    return __p;
};

JST["bq_bluetooth_receive"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'blueToothSerial.read()';
    } else if (programmingLanguage === 'python') {
        __p += 'blueToothSerial.read()';
    } else if (programmingLanguage === 'js') {
        __p += 'blueToothSerial.read(); // Leer el dato del puerto serie\n';
    }

    return __p;
};

JST["bq_bluetooth_send"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'blueToothSerial.write( ' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ' );\n';
    } else if (programmingLanguage === 'python') {
        __p += 'blueToothSerial.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'blueToothSerial.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bq_button"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.input(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bq_button_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.PULL_UP)\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
    }

    return __p;
};

JST["bq_buttons"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
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
    } else if (programmingLanguage === 'python') {
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
    } else if (programmingLanguage === 'js') {
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
    }

    return __p;
};

JST["bq_buttons_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += 'int get_key(unsigned int input)\n  {\n    int k;\n    for (k = 0; k < NUM_KEYS; k++)\n    {\n      if (input < adc_key_val[k])\n      {\n        return k;\n      }\n    }\n    if (k >= NUM_KEYS)k = -1;\n      return k;\n}\n';

    return __p;
};

JST["bq_buttons_definitions_variables"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += '//bqButtons\nint adc_key_val[5] ={20,50, 100, 200, 600 }\nint NUM_KEYS = 5;\nint adc_key_in;\nint key=-1;\nint oldkey=-1;\n';

    return __p;
};

JST["bq_infrared"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.input(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'digitalRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bq_infrared_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode( ' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ' , INPUT);\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.IN)\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', INPUT);\n';
    }

    return __p;
};

JST["bq_joystick"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'readJoystick_' +
        ((__t = (obj.name)) == null ? '' : __t) +
        '()';

    return __p;
};

JST["bq_joystick_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
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
    } else if (programmingLanguage === 'python') {
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
    } else if (programmingLanguage === 'js') {
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
    }

    return __p;
};

JST["bq_joystick_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ', GPIO.PULL_UP)\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'pinMode(' +
            ((__t = (obj.pinbutton)) == null ? '' : __t) +
            ', INPUT_PULLUP);\n';
    }

    return __p;
};

JST["bq_led"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'digitalWrite(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.output(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ')\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'digitalWrite(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bq_led_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', OUTPUT);\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.setup(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', GPIO.OUT)\n'; // Asumiendo que se usa la librería RPi.GPIO
    } else if (programmingLanguage === 'js') {
        __p += 'pinMode(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ', OUTPUT);\n';
    }

    return __p;
};

JST["bq_photoresistor"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que hay una función análoga en Python
    } else if (programmingLanguage === 'js') {
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bq_piezo_buzzer"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'tone(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.output(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ')\n' + // Asumiendo que hay un método para manejar el buzzer
            'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'tone(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bq_piezo_buzzerav"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'tone(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.Buzztone)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n\n';
    } else if (programmingLanguage === 'python') {
        __p += 'GPIO.output(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.Buzztone)) == null ? '' : __t) +
            ')\n' +
            'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'tone(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.Buzztone)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n\n';
    }

    return __p;
};

JST["bq_potentiometer"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ')\n'; // Asumiendo que hay una función análoga en Python
    } else if (programmingLanguage === 'js') {
        __p += 'analogRead(' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["bt_serial_available"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'if (blueToothSerial.available() > 0) {\n' +
        ((__t = (obj.branch)) == null ? '' : __t) +
        '\n}\n';

    return __p;
};

JST["controls_doWhile"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'do {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n} while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'while True:\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n    if (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '):\n        break\n';
    } else if (programmingLanguage === 'js') {
        __p += 'do {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n} while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ');\n';
    }
    return __p;
};

JST["controls_execute"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p +=
        ((__t = (obj.content)) == null ? '' : __t) +
        '\n';

    return __p;
};

JST["controls_else"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'else {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    } else if (programmingLanguage === 'python') {
        __p += 'else:\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
    } else if (programmingLanguage === 'js') {
        __p += 'else {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    }
    return __p;
};

JST["controls_elseif"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'else if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    } else if (programmingLanguage === 'python') {
        __p += 'elif (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
    } else if (programmingLanguage === 'js') {
        __p += 'else if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    }
    return __p;
};
JST["controls_if"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    } else if (programmingLanguage === 'python') {
        __p += 'if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '';
    } else if (programmingLanguage === 'js') {
        __p += 'if (' +
            ((__t = (obj.argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    }
    return __p;
};

JST["controls_setupLoop"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p +=
        ((__t = (obj.branch)) == null ? '' : __t) +
        '\n';

    return __p;
};

JST["controls_whileUntil"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    } else if (programmingLanguage === 'python') {
        __p += 'while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
    } else if (programmingLanguage === 'js') {
        __p += 'while (' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    }
    return __p;
};

JST["inout_analog_read"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'analogRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ')';

    return __p;
};

JST["inout_analog_read_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', INPUT);\n';

    return __p;
};

JST["inout_analog_write"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'analogWrite(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.value_num)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["inout_analog_write_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', OUTPUT);\n';

    return __p;
};

JST["inout_builtin_led"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalWrite(13, ' +
        ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
        ');\n';

    return __p;
};
JST["inout_builtin_led_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += 'pinMode(13, OUTPUT);\n';

    return __p;
};

JST["inout_digital_read"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ')';

    return __p;
};

JST["inout_digital_read_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', INPUT);\n';

    return __p;
};

JST["inout_digital_write"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalWrite(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["inout_digital_write_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', OUTPUT);\n';

    return __p;
};

JST["inout_highlow"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p +=
        ((__t = (obj.bool_value)) == null ? '' : __t);

    return __p;
};

JST["lcd_clear"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += 'lcd.clear();\n';

    return __p;
};

JST["lcd_def_declare"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'LiquidCrystal lcd(' +
        ((__t = (obj.lcd_1)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.lcd_2)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.lcd_3)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.lcd_4)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.lcd_5)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.lcd_6)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["lcd_def_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += '#include <Wire.h>\n#include <LiquidCrystal.h>\n';

    return __p;
};
JST["lcd_def_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += 'lcd.begin(16, 2);\nlcd.clear();\n';

    return __p;
};

JST["lcd_print"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'lcd.print(' +
        ((__t = (obj.val)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["lcd_print_pos"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'lcd.setCursor(' +
        ((__t = (obj.ycoor)) == null ? '' : __t) +
        ',' +
        ((__t = (obj.xcoor)) == null ? '' : __t) +
        ');\nlcd.print(' +
        ((__t = (obj.val)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["lcd_setBacklight"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'lcd.setBacklight(' +
        ((__t = (obj.state)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["logic_compare"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p +=
        ((__t = (obj.argument0)) == null ? '' : __t) +
        ' ' +
        ((__t = (obj.operator)) == null ? '' : __t) +
        ' ' +
        ((__t = (obj.argument1)) == null ? '' : __t);

    return __p;
};

JST["logic_negate"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += '!' +
            ((__t = (obj.argument0)) == null ? '' : __t);
    } else if (programmingLanguage === 'python') {
        __p += 'not ' +
            ((__t = (obj.argument0)) == null ? '' : __t);
    }
    return __p;
};

JST["logic_operation"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    } else if (programmingLanguage === 'python') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    } else if (programmingLanguage === 'js') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    }

    return __p;
};

JST["math_arithmetic"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            '' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    } else if (programmingLanguage === 'python') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    } else if (programmingLanguage === 'js') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    }

    return __p;
};

JST["math_arithmetic_pow"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'pow(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.argument1)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'pow(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.argument1)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'js') {
        __p += 'Math.pow(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.argument1)) == null ? '' : __t) +
            ')';
    }

    return __p;
};

JST["math_modulo"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    } else if (programmingLanguage === 'python') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    } else if (programmingLanguage === 'js') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (obj.argument1)) == null ? '' : __t);
    }

    return __p;
};

JST["math_random"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'random(' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'random.randint(' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'js') {
        __p += 'Math.floor(Math.random() * (' +
            ((__t = (obj.value_dmax)) == null ? '' : __t) +
            ' - ' +
            ((__t = (obj.value_num)) == null ? '' : __t) +
            ' + 1)) + ' +   
            ((__t = (obj.value_num)) == null ? '' : __t);
    }

    return __p;
};

JST["procedures_callnoreturn"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["procedures_callreturn"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p +=
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.funcArgs)) == null ? '' : __t) +
            ');';
    }

    return __p;
};

JST["procedures_defnoreturn"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.returnType)) == null ? '' : __t) +
            ' ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (obj.args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    } else if (programmingLanguage === 'python') {
        __p +=
            'def ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (obj.args)) == null ? '' : __t) +
            '):\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
    } else if (programmingLanguage === 'js') {
        __p +=
            'function ' +
            ((__t = (obj.funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (obj.args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '}\n';
    }

    return __p;
};
JST["procedures_defreturn"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
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
    } else if (programmingLanguage === 'python') {
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
    } else if (programmingLanguage === 'js') {
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
    }

    return __p;
};

JST["serial_available"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'if (Serial.available() > 0) {\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n}\n';
    } else if (programmingLanguage === 'python') {
        __p += 'if serial.in_waiting > 0:\n' +
            ((__t = (obj.branch)) == null ? '' : __t) +
            '\n';
    }

    return __p;
};

JST["serial_parseint"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Serial.parseInt();\n';
    } else if (programmingLanguage === 'python') {
        __p += 'int(serial.readline().decode().strip())\n'; // Simulando Serial.parseInt()
    }

    return __p;
};

JST["serial_parseint_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'Serial.begin(' +
        ((__t = (obj.bitrate)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["serial_print"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Serial.print(' +
            ((__t = (obj.content)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'print(' + obj.content + ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'console.log(' + obj.content + ');\n';
    }

    return __p;
};

JST["serial_print_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'Serial.begin(' +
        ((__t = (obj.bitrate)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["serial_println"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Serial.println(' +
            ((__t = (obj.content)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'print(' + obj.content + ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'console.log(' + obj.content + ');\n';
    }

    return __p;
};
JST["serial_println_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'Serial.begin(' +
        ((__t = (obj.bitrate)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["serial_read"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Serial.read()';
    } else if (programmingLanguage === 'python') {
        __p += 'serial.read()'; // Simulando Serial.read()
    } else if (programmingLanguage === 'js') {
        __p += 'serial.read()'; // Simulando Serial.read()
    }

    return __p;
};

JST["serial_read_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'Serial.begin(' +
        ((__t = (obj.bitrate)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["serial_readstring"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Serial.readString()\n';
    } else if (programmingLanguage === 'python') {
        __p += 'serial.read()'; // Simulando Serial.readString()
    } else if (programmingLanguage === 'js') {
        __p += 'serial.read()'; // Simulando Serial.readString()
    }

    return __p;
};

JST["serial_readstring_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'Serial.begin(' +
        ((__t = (obj.bitrate)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["serial_special"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.char)) == null ? '' : __t);
    } else if (programmingLanguage === 'python') {
        __p += (
            (obj.char) == null ? '' : obj.char);
    } else if (programmingLanguage === 'js') {
        __p += (
            (obj.char) == null ? '' : obj.char);
    }

    return __p;
};

JST["servo_cont"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'servos[' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (obj.value_degree)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'servos[' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (obj.value_degree)) == null ? '' : __t) +
            ')\n' +
            'time.sleep(' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'servos[' +
            ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (obj.value_degree)) == null ? '' : __t) +
            ');\nsetTimeout(() => {}, ' +
            ((__t = (obj.delay_time)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};
JST["servo_cont_definitions_include"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += '#include <Servo.h>\n\nServo servos[13];';

    return __p;
};

JST["servo_cont_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'servos[' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        '].attach(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["servo_move"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'servos[' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        '].write(' +
        ((__t = (obj.value_degree)) == null ? '' : __t) +
        ');\ndelay(' +
        ((__t = (obj.delay_time)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["servo_move_definitions_include"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += '#include <Servo.h>\n\nServo servos[13];';

    return __p;
};

JST["servo_move_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'servos[' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        '].attach(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["text_equalsIgnoreCase"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.equalsIgnoreCase(' +
            ((__t = (obj.string2)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'compare_texts = lambda a, b: a.lower() == b.lower()\n' +
            'compare_texts(' + ((__t = (obj.string1)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.string2)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'js') {
        __p += 'String.prototype.equalsIgnoreCase = function (str) {\n' +
            '    return this.toLowerCase() === str.toLowerCase();\n' +
            '};\n' +
            'let result = ' + 
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.equalsIgnoreCase(' +
            ((__t = (obj.string2)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};

JST["text_length"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.argument0)) == null ? '' : __t) +
            '.length()';
    } else if (programmingLanguage === 'python') {
        __p += 'len(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'js') {
        __p += 'String(' +
            ((__t = (obj.argument0)) == null ? '' : __t) +
            ').length';
    }

    return __p;
};
JST["text_substring"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p +=
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.substring(' +
            ((__t = (obj.from)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.to)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'python') {
        __p += 'recort_text = lambda text, start, end: text[start:end]\n' +
            'recort_text(' + ((__t = (obj.string1)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.from)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.to)) == null ? '' : __t) +
            ')';
    } else if (programmingLanguage === 'js') {
        __p +=
            ((__t = (obj.string1)) == null ? '' : __t) +
            '.substring(' +
            ((__t = (obj.from)) == null ? '' : __t) +
            ',' +
            ((__t = (obj.to)) == null ? '' : __t) +
            ')';
    }

    return __p;
};

JST["variables_set"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p +=
        ((__t = (obj.varName)) == null ? '' : __t) +
        ' = ' +
        ((__t = (obj.varValue)) == null ? '' : __t) +
        ';\n';

    return __p;
};

JST["zum_button"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ')';

    return __p;
};

JST["zum_button_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', INPUT_PULLUP);\n';

    return __p;
};

JST["zum_follower"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'if(digitalRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ') == HIGH)\n{\n  ' +
        ((__t = (obj.code_btn1)) == null ? '' : __t) +
        '\n}\nif(digitalRead(' +
        ((__t = (obj.NextPIN)) == null ? '' : __t) +
        ') == HIGH)\n{\n  ' +
        ((__t = (obj.code_btn2)) == null ? '' : __t) +
        '\n}\n';

    return __p;
};

JST["zum_follower_setups_nextpin"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.NextPIN)) == null ? '' : __t) +
        ', INPUT);\n';

    return __p;
};

JST["zum_follower_setups_pin"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', INPUT);\n';

    return __p;
};
JST["zum_infrared"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ')';

    return __p;
};

JST["zum_infrared_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', INPUT);\n';

    return __p;
};

JST["zum_led"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalWrite(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["zum_led_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'pinMode(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', OUTPUT);\n';

    return __p;
};

JST["zum_photoresistor"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'analogRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ')';

    return __p;
};

JST["zum_piezo_buzzer"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'tone(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.delay_time)) == null ? '' : __t) +
        ');\ndelay(' +
        ((__t = (obj.delay_time)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["zum_piezo_buzzerav"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'tone(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.Buzztone)) == null ? '' : __t) +
        ', ' +
        ((__t = (obj.delay_time)) == null ? '' : __t) +
        ');\ndelay(' +
        ((__t = (obj.delay_time)) == null ? '' : __t) +
        ');\n\n';

    return __p;
};
JST["zum_potentiometer"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'analogRead(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ')';

    return __p;
};

JST["bq_test_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += ((__t = (obj.name_mod)) == null ? '' : __t) +
            '.init();\n';
    } else if (programmingLanguage === 'python') {
        __p += ((__t = (obj.name_mod)) == null ? '' : __t) +
            '.init()\n';
    }  else if (programmingLanguage === 'js') {
        __p += ((__t = (obj.name_mod)) == null ? '' : __t) +
            '.init()\n';
    }

    return __p;
};

JST["bq_test"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += 'digitalWrite(' +
        ((__t = (obj.dropdown_pin)) == null ? '' : __t) +
        ', HIGH);\n';  // Asegúrate de especificar el estado aquí, por ejemplo, HIGH o LOW.

    return __p;
};

JST["bq_test_definition"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    __p += obj.dropdown_mod + ' ' + obj.name_mod + '(' + obj.dropdown_pin + ');\n';

    return __p;
};

// Modular
JST["bq_test_def_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';
    
    if (programmingLanguage === 'cpp') {
        __p += '#include <Modular.h>\n';
    } else if (programmingLanguage === 'python') {
        __p += 'import pymodular\n';
    } else if (programmingLanguage === 'js') {
        __p += 'import { Modular } from "modular";\n';
    }
    
    return __p;
};

JST["mod_def_declare"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += obj.dropdown_mod + ' ' + obj.name_mod + '(' + obj.dropdown_pin + ');\n';
    } else if (programmingLanguage === 'python') {
        __p += obj.name_mod + ' = pymodular.' + obj.dropdown_mod + '(' + obj.dropdown_pin + ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'var ' + obj.name_mod + ' = new Modular.' + obj.dropdown_mod + '(' + obj.dropdown_pin + ');\n';
    }

    return __p;
};

JST["test_inout_digital_read"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += ((__t = (obj.var_mod)) == null ? '' : __t) + '.read()';

    return __p;
};

JST["test_inout_digital_write"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' +
            ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
            ');\n';
    } else if (programmingLanguage === 'python') {
        let statValue = (obj.dropdown_stat === 'HIGH') ? '1' : '0';
        __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' + statValue + ')\n';
    }
    return __p;
};

JST["test_inout_digital_write_bool"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' +
        ((__t = (obj.dropdown_stat)) == null ? '' : __t) +
        ');\n';
    return __p;
};

JST["test_motor_stepper"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' +
        ((__t = (obj.dropdown_num)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["test_motor_servo"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' +
        ((__t = (obj.dropdown_num)) == null ? '' : __t) +
        ');\n';

    return __p;
};

JST["test_motor_dc"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    __p += ((__t = (obj.dropdown_pin)) == null ? '' : __t) + '.write(' +
        ((__t = (obj.dropdown_dir)) == null ? '' : __t) + ',' + 
        ((__t = (obj.dropdown_velo)) == null ? '' : __t) + ');\n';

    return __p;
};

// BETTO
JST["betto_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += '#include <Betto.h>\n';
    } else if (programmingLanguage === 'python') {
        __p += 'import Betto\n';
    }

    return __p;
};

JST["mod_def_declare_betto"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Betto betto;\n';
    } else if (programmingLanguage === 'python') {
        __p += 'betto = Betto()\n';
    }
    return __p;
};

JST["betto_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'betto.init();\n'; // Agregar punto y coma para C++
    } else if (programmingLanguage === 'python') {
        __p += 'betto.init()\n'; // Sin punto y coma para Python
    }
    
    return __p;
};

JST["betto_home"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'betto.home();\n'; // Agregar punto y coma para C++
    } else if (programmingLanguage === 'python') {
        __p += 'betto.home()\n'; // Sin punto y coma para Python
    }
    
    return __p;
};

JST["declare_betto_movement"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    // Se espera que 'action' sea parte de obj, asegurando que se use correctamente.
    var action = obj.action || 'move'; // Usa 'move' como valor predeterminado

    if (programmingLanguage === 'cpp') {
        __p += 'betto.' + action + '();\n'; // C++: llamar al método
    } else if (programmingLanguage === 'python') {
        __p += 'betto.' + action + '()\n'; // Python: llamar al método
    }
    
    return __p;
};

// CARLITTO
JST["carlitto_definitions"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += '#include <Carlitto.h>\n';
    } else if (programmingLanguage === 'python') {
        __p += 'import Carlitto\n';
    }

    return __p;
};

JST["mod_def_declare_carlitto"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'Carlitto carlitto(' + obj.MOT_LEFT + ',' + obj.POT_LEFT + ',' + obj.MOT_RIGHT + ',' + obj.POT_RIGHT + ',' + obj.POT + ');\n';
    } else if (programmingLanguage === 'python') {
        __p += 'carlitto = Carlitto(' + obj.MOT_LEFT + ',' + obj.POT_LEFT + ',' + obj.MOT_RIGHT + ',' + obj.POT_RIGHT + ',' + obj.POT + ')\n';
    }
    return __p;
};

JST["carlitto_setups"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'carlitto.init();\n'; // Agregar punto y coma para C++
    } else if (programmingLanguage === 'python') {
        __p += 'carlitto.init()\n'; // Sin punto y coma para Python
    }
    
    return __p;
};

JST["carlitto_stop"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'carlitto.stop();\n'; // Agregar punto y coma para C++
    } else if (programmingLanguage === 'python') {
        __p += 'carlitto.stop()\n'; // Sin punto y coma para Python
    }
    
    return __p;
};

// Raspberry
JST["raspberry_send"] = function (obj, programmingLanguage) {
    obj = obj || {};
    let __t, __p = '';

    if (programmingLanguage === 'cpp') {
        __p += 'rasp.write( ' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ' );\n';
    } else if (programmingLanguage === 'python') {
        __p += 'rasp.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ')\n';
    } else if (programmingLanguage === 'js') {
        __p += 'rasp.write(' +
            ((__t = (obj.statement_send)) == null ? '' : __t) +
            ');\n';
    }

    return __p;
};
export var JST;