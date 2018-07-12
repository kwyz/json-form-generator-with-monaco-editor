const _ = require("lodash");
const stack = require("json-stack");

var jsonSchemaJsonPathArray = [];
var lineIndex = 0;

export default {
    methods: {
        generateJsonPath: function (jsonSchema) {
            jsonSchemaJsonPathArray = [];
            let path = stack.horizontal(jsonSchema);
            for (let key in _.keys(path)) {

                let keyValue = _.keys(path)[key];
                if (keyValue != "" && !keyValue.includes('required') && !keyValue.includes('items')&& keyValue.includes('type')) {

                    keyValue = "$." + keyValue.substring(0, keyValue.lastIndexOf("."));
                    if (!jsonSchemaJsonPathArray.includes(keyValue)) {
                        jsonSchemaJsonPathArray.push(keyValue);
                    }
                }
            }
            return jsonSchemaJsonPathArray;
        },
        pass() {
            lineIndex++;
        },
        getCurentLineIndex() {
            return lineIndex;
        },
        getJsonPath() {
            let curentIndex = this.getCurentLineIndex();
            this.pass();
            return this.getJsonPathAt(curentIndex);
        },
        getJsonPathAt(lineIndex) {
            let jsonPath = jsonSchemaJsonPathArray[lineIndex];
            lineIndex++;
            return jsonPath;
        },
        getAllJsonPaths() {
            return jsonSchemaJsonPathArray;
        },
        clearCount() {
            lineIndex = 0;
        },
        disposeAll() {
            lineIndex = 0;
            jsonSchemaJsonPathArray = [];
        }
    }
};
