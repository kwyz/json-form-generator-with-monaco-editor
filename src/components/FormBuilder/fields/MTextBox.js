import rules from '../validation/rules'
import FormBuilder from '../FormBuilder'

export default {
    props: {
        schema: Object
    },
    beforeMount() {
        if (!this.schema.title) this.schema.title = "missing title"
    },
    mounted() {
        //
    },
    data() {
        return {
            model: "",
        }
    },
    methods: {
        clearModel() {
            this.model = null
        },
        clearErrors() {
            this.errors = []
        },
        getErrors() {
            return rules.methods.getComponentValidator(this.schema, this.model)
        },
        triggerElement(event) {
            window.onclick = e => {
                FormBuilder.methods.triggerElement(e.target.id);
            }
        }

    }
}
