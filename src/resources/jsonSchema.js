export default {
    "type": "object",
    "title": "PhysicalPersonList",
    "properties": {
        "idnp": {
            "type": "string",
            "format": "idnp",
            "title": "Your identification number",
            "minLength": 13,
            "maxLength": 13
        },
        "last_name": {
            "type": "string",
            "title": "Nume",
            "maxLength": 255
        },
        "first_name": {
            "type": "string",
            "title": "Prenume",
            "maxLength": 255
        },
        "object": {
            "type": "object",
            "title": "Object",
            "properties": {
                "idnp": {
                    "type": "string",
                    "format": "idnp",
                    "title": "Your identification number",
                    "minLength": 13,
                    "maxLength": 13
                }
            }
        },
        "debt_sum": {
            "type": "number",
            "title": "Suma datoriilor (MDL)",
            "maxLength": 255,
            "minimum": 0,
            "maximum": 150
        }
    },
    "required": [
        "idnp",
        "debt_sum"
    ]
}
