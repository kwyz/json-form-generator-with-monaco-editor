export default {
    /**
     * Default propertyes for this module
     * @property {schema} - { object } - the schema from the monaco code editor
     * @property { model } - { array } - the array with entire form completed fields
     */
    name: "JsonSchemaOutput",
    props: {
        schema: Object,
        model: Array,
    },
    data: function () {
        return {
            formContent: [],
            jsonData: [],
        };
    },
    // Function that check if schema have title 
    // And check if model is not null, otherwise method throw and warn that he cannot create json output schema
    beforeMount: function () {
        if (!this.schema.title)
            this.schema.title = "Misisng Schema"
        if (!this.model)
            console.warn("Cannot crate Json Schema Output View, schema model is empty!");
    }
}
