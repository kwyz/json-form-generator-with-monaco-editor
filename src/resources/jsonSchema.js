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
            "maxLength": 255,
            "minLength": 13,
            "maLength": 13,
            "1": "number",
            "2": "Suma datoriilor (MDL)",
            "3": "number",
            "4": "Suma datoriilor (MDL)",
            "6": "number",
            "5": "Suma datoriilor (MDL)",
            "8": "number",
            "9": "Suma datoriilor (MDL)"
        },
        "debt_summmmm": {
            "type": "number",
            "title": "Suma datoriilor (MDL)",
            "maxLength": 255,
            "minimum": 0,
            "maximum": 150
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
