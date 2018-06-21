import rules from "../validation/rules";
import FormBuilder from "../FormBuilder";

export default {
    props: {
        schema: Object,
        jsonPath: Array,
        Index: Number,
    },
    beforeMount() {
        if (!this.schema.title) this.schema.title = "missing title";
    },

    data() {
        return {
            index: ""
        };
    },
    computed: {
        getIndex: function () {
            return this.index
        }
    },
    created: function () {
        var elementIndex = FormBuilder.methods.manageElementCount("increment");
        this.index = this.jsonPath[elementIndex];

    },
    methods: {
        getElementIndex() {
            console.log(FormBuilder.methods.manageElementCount("get"));
        },
        getElementJsonPath() {
            console.log("Call getElementJsonPath");
            FormBuilder.methods.manageElementCount("get");
        }
    }
};
