import rules from "../validation/rules";
import CodeEditor from '../../CodeEditor'

var fieldNames = [];
export default {
    // Defautl properties for this module
    /**
     * @param schema { object } - property that contains json schema from monaco edtitor
     * @param jsonPath { string } - property that contains json path for curent field
     */
    props: {
        schema: Object,
        jsonPath: String
    },
    beforeMount() {
        // If given schema, has not title, return warning message
        if (!this.schema.title) this.schema.title = "missing title";
    },
    data() {
        return {
            model: "",
        }
    },
    watch: {
        // Event that is triggered when value of model is modified
        model: function (val) {
            // Create new object that contains field name and field value
            var field = [{
                "name": Object.values(this.schema.dataJsonPath.split(".").splice(-1))[0],
                "value": val
            }];
            // Check if array with all field have object with the same name
            // If it contains only updates the secondary property of the object (field Value)
            // If it has'nt add this object to array
            if (fieldNames.find(o => o.name === field[0].name))
                fieldNames = fieldNames.map(obj => field.find(o => o.name === obj.name) || obj);
            else
                fieldNames.push(field[0])
        }
    },
    computed: {
        // Function that return json path property from JSON schema
        dataJsonPath() {
            return this.schema.dataJsonPath;
        },
        // Function that return validation rules for current JSON object from JSON schema
        validationRules() {
            return rules.methods.getComponentValidator(this.schema, this.model)
        }
    },
    methods: {
        //Function that call another function to find parent element in monaco editor for current json path
        findByPath() {
            CodeEditor.methods.findByPath(this.dataJsonPath);
        },
        // The function that returns the field values
        getThisModel() {
            return fieldNames;
        }
    }
};
