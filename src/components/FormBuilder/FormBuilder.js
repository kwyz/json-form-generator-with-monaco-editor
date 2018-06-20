import fileds from "./fields/"
import rules from "./validation/rules";
import CodeEditor from '../CodeEditor'

export default {
    components: fileds,
    props: {
        schema: Object,
    },
    data() {
        return {
            currentLanguage: "ro",
        }
    },
    methods: {
        build() {},
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
                    break
            }
        },
        changeLanguage() {
            this.currentLanguage = rules.methods.getCurrentLanguage();
        },
        triggerElement(elementId) {
                CodeEditor.methods.goToWord(elementId)
        }
    }
}
