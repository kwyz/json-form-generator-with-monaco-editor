export default {
    data() {
        return {
            schema: {
                "type": "object",
                "properties": {
                    "street_address": {
                        "type": "string"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string"
                    }
                },
                "required": ["street_address", "city", "state"]
            },

            model: {}
        }
    }
}
