import fileds from "./fields/"
import FormBuilder from '../FormBuilder'

export default {
    components: fileds,
    props: {
        schema: Object,
    },
    data() {
        return {
            jsonScheme: {}
        };
    },
    methods: {
        getComponentName(schema) {
            if (!schema || !schema.type) return ""
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
    }
}
