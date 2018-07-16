export default {
    "type": "object",
    "title": "$",
    "properties": {
        "idnp": {
            "type": "string",
            "format": "idnp",
            "title": "properties.idnp",
            "minLength": 13,
            "maxLength": 13
        },
        "last_name": {
            "type": "string",
            "title": "properties.last_name",
            "maxLength": 255
        },
        "first_name": {
            "type": "string",
            "title": "properties.last_name",
            "maxLength": 255
        },
        "object": {
            "type": "object",
            "title": "$.properties.object",
            "properties": {
                "idnp": {
                    "type": "string",
                    "format": "idnp",
                    "title": "properties.idnp",
                    "minLength": 13,
                    "maxLength": 13
                }
            }
        },
        "debt_sum_1": {
            "type": "object",
            "title": "$.properties.debt_sum_1",
            "properties": {
                "IDNP": {
                    "type": "string",
                    "title": "properties.IDNP"
                },
                "idnpp": {
                    "type": "string",
                    "title": "properties.idnpp"
                },
                "idnp": {
                    "type": "string",
                    "title": "properties.idnp"
                },
                "additionalName": {
                    "type": "array",
                    "items": {
                        "title": "properties.additionalName",
                        "type": "string"
                    }
                },
                "honorificPrefix": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "title": "properties.honorificPrefix"
                    }
                },
                "honorificSuffix": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "title": "properties.honorificSuffix"
                    }
                }
            },
            "required": [
                "idnp",
                "IDNP",
                "honorificPrefix"
            ]
        },
        "debt_sum_2": {
            "type": "object",
            "title": "$.properties.debt_sum_2",
            "properties": {
                "idnp": {
                    "type": "string",
                    "format": "idnp",
                    "title": "peorperties.idnp",
                    "minLength": 13,
                    "maxLength": 13
                },
                "debt_sum": {
                    "type": "object",
                    "title": "$.properties.debt_sum.properties.debt_sum",
                    "properties": {
                        "IDNP": {
                            "type": "string",
                            "title": "properties.IDNP"
                        },
                        "idnpp": {
                            "type": "string",
                            "title": "properties.idnpp"
                        },
                        "idnp": {
                            "type": "string",
                            "title": "properties.idnp"
                        }
                    },
                    "required": [
                        "idnp",
                        "IDNP"
                    ]
                }
            }
        }
    },
    "required": [
        "idnp",
        "first_name"
    ]
}
