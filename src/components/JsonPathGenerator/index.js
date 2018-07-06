const _ = require("lodash");
const stack = require("json-stack");

var jsonSchemaJsonPathArray = [];
var lineIndex = 0;

export default {
    methods: {
        generateJsonPath: function (jsonSchema) {
            jsonSchemaJsonPathArray = [];
            var path = stack.horizontal(jsonSchema);
            for (var key in _.keys(path)) {
                var keyValue = _.keys(path)[key];
                if (keyValue != "") {
                    keyValue =
                        "$." + keyValue.substring(0, keyValue.lastIndexOf("."));
                    if (!jsonSchemaJsonPathArray.includes(keyValue))
                        jsonSchemaJsonPathArray.push(keyValue);
                }
            }
            
            console.log(jsonSchemaJsonPathArray);
            return jsonSchemaJsonPathArray;
        },
        pass() {
            lineIndex++;
        },
        getCurentLineIndex() {
            return lineIndex;
        },
        getJsonPathAt(lineIndex) {
            var jsonPath = jsonSchemaJsonPathArray[lineIndex];
            lineIndex++;
            return jsonPath;
        },
        disposeAll() {
            lineIndex = 0;
            jsonSchemaJsonPathArray = [];
        }
    }
};
