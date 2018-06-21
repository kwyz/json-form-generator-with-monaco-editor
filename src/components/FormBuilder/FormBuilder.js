import fileds from "./fields/"
import FormBuilder from '../FormBuilder'

var elementCount = -1;
export default {
    components: fileds,
    props: {
        schema: Object,
        jsonPath: Array
    },
    data() {
        return {
            index: "0"
        };
    },
    created(){
            this.manageElementCount("object")
    },
    methods: {
        getComponentName(schema) {
            if (!schema || !schema.type) return null
            switch (schema.type) {
                case "string":
                case "number":
                    return "m-text-box"
                case "boolean":
                    break
                case "array":
                    break
                case "object":
                    return FormBuilder
            }
        },
        manageElementCount(mode) {
            switch (mode) {
                case "increment":
                    return elementCount++;
                case "object":
                    return (elementCount ++);
                case "get":
                    return elementCount;
                case "reset":
                    elementCount = 0;
            }
        },
        getElementIndex(){
            return elementCount
        }
    }
}
