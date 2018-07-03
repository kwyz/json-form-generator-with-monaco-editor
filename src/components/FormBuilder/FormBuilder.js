import fileds from "./fields/";  // Import folder from project structure with all type of fields
import FormBuilder from "../FormBuilder";   // Import itself for specific structure. Ex. object
import JsonSchemaOutput from "../JsonSchemaOutput"; // Import module for creating json output view
export default {
    components: fileds,
    // Default property for curent model
    /**
     * @param schema { object } - property that contains schema from monaco editor
     */
    props: {
        schema: Object
    },
    data() {
        return {
            jsonScheme: {},
            formModel: {}
        };
    },
    methods: {
        // Function that get key type from json schema and return specific module for this type
        getComponentName(schema) {
            if (!schema || !schema.type) return null;
            switch (schema.type) {
                case "string":
                case "number":
                    return "m-text-box";
                case "boolean":
                    break;
                case "array":
                    this.getComponentName(Object.values(schema)[0]);
                    break;
                case "object":
                    return FormBuilder;
            }
        },
        // Function that return an array with all completed content from form
        getFormModel() {
            return (JsonSchemaOutput.data.formContent = fileds[
                Object.keys(fileds)[0]
            ].methods.getThisModel());
        }
    }
};
