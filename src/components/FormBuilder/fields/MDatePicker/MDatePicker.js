import rules from "../../validation/rules";
import CodeEditor from '../../../CodeEditor'
import FormBuilder from '../../FormBuilder'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
    // Defautl properties for this module
    /**
     * @param schema { object } - property that contains json schema from monaco edtitor
     * @param jsonPath { string } - property that contains json path for curent field
     */
    props: {
        name: String,
        schema: Object,
        jsonPath: String,
        required: Boolean,
    },
    data() {
        return {
            date: new Date(),
            options: {
                format: 'DD/MM/YYYY h:mm:ss',
                useCurrent: false,
                showClear: true,
                showClose: true,
            }
        }
    },
    computed: {
        // Function that return json path property from JSON schema
        dataJsonPath() {
            var jsonPath = FormBuilder.methods.getJsonPath()
            return jsonPath;
        },
        fieldTitle() {
            if (!this.schema.title) this.schema.title = this.name;
            return this.schema.title
        },
        // Function that return validation rules for current JSON object from JSON schema
        validationRules() {
            return rules.methods.getComponentValidator(this.schema, this.model, this.required)
        }
    },
    methods: {
        //Function that call another function to find parent element in monaco editor for current json path
        findByPath() {
            CodeEditor.methods.findByPath(this.dataJsonPath);
        },
    }
};
