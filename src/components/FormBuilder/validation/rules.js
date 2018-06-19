var Ajv = require('ajv');
var ajv = new Ajv();

var localize = require('ajv-i18n');
var localize_ro = require('../locale/ro');

var currentLanguage = "ro";



ajv.addFormat('idnp', function (data) {
    function isIDNP(data) {
        var crc = 0;
        for (var i = 0; i < 12; i++) {
            crc += (data[i] - "0") * (i % 3 === 0 ? 7 : i % 3 === 1 ? 3 : 1);
        }
        return crc % 10 === data[12] - "0"
    }
    return (data.length == 13 && !(data[12] < "0" || data[12] > "9") && isIDNP(data))
});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default {
    methods: {
        getComponentValidator: function (schema, data) {
            if (!schema || !schema.type || data == "") return true;
            var validate = ajv.compile(schema);
            var valid = validate(data);
            if (!valid) {
                switch (currentLanguage) {
                    case "en":
                        localize.en(validate.errors)
                        break;
                    case "ru":
                        localize.ru(validate.errors)
                        break;
                    case "ro":
                        localize_ro(validate.errors)
                        break;
                }

                return validate.errors[0].message.toString().capitalize();
            };
            return true;
        },
        getCurrentLanguage: function () {
            switch (currentLanguage) {
                case "ro":
                    currentLanguage = "en"
                    break;
                case "en":
                    currentLanguage = "ru"
                    break;
                case "ru":
                    currentLanguage = "ro"
                    break;
            }return currentLanguage;
        }
    },
}