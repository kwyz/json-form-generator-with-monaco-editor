import fileds from "./fields/"; // Import folder from project structure with all type of fields
import FormBuilder from "../FormBuilder"; // Import itself for specific structure. Ex. object
import JsonPathGenerator from '../JsonPathGenerator/index'

export default {
    components: fileds,
    // Default property for curent model
    /**
     * @param schema { object } - property that contains schema from monaco editor
     */
    props: {
        schema: Object,
    },
    data() {
        return {
            isNotChange: true
        };
    },
    computed: {
        // Function that return some description text to 
        getSchemaTitle() {
            return this.schema.title || this.schema.description
        },
    },
    methods: {
        // Function that get key type from json schema and return specific module for this type
        getComponentName(schema) {
            try {
                if (!schema || !schema.type) return null;
                switch (schema.type) {
                    case "string":
                    case "number":
                    case "integer":
                        return "m-text-box";
                    case "boolean":
                        return "m-check-box"
                    case "date-time":
                        return "m-date-picker"
                    case "array":
                        this.getComponentName(Object.values(schema)[0]);
                        break;
                    case "object":
                        return FormBuilder
                }
            }catch(e){

            }
        },
        getJsonPath() {
            return JsonPathGenerator.methods.getJsonPath();
        }
    }
};
