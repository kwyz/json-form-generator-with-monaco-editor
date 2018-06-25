import rules from "../validation/rules";
import CodeEditor from '../../CodeEditor'

export default {
    props: {
        schema: Object,
        jsonPath: String
    },
    beforeMount() {
        if (!this.schema.title) this.schema.title = "missing title";
    },
    data() {
        return {
            model: "",
        }
    },
    computed: {
        dataJsonPath() {
            return this.schema.dataJsonPath;
        },
        validationRules() {
            return rules.methods.getComponentValidator(this.schema, this.model)
        }
    },
    methods: {
        findByPath() {
            CodeEditor.methods.findByPath(this.dataJsonPath);
        }
    }
};
