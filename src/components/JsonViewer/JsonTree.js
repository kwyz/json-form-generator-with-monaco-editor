import CodeEditor from '../CodeEditor'
import JsonPathGenerator from '../JsonPathGenerator';

var elementInstance;
var oldElement;
var elementCount = 1;

function parse(data, depth = 0, last = true, key = undefined) {
    let kv = {
        depth,
        last,
        primitive: true,
        key: key
    }

    if ((typeof data === "object" || typeof data === "array") && kv.type != "object" && kv.key != "items" && kv.key != "properties") {
        if (data.type != undefined) {
            let jsonPath = JsonPathGenerator.methods.getJsonPathAt(elementCount);
            Object.assign(kv, {
                path: jsonPath
            })
            elementCount++;
        }
    }
    if (typeof data !== 'object') {
        return Object.assign(kv, {
            type: typeof data,
            value: JSON.stringify(data)
        })
    } else if (data === null) {
        return Object.assign(kv, {
            type: 'null',
            value: 'null'
        })
    } else if (Array.isArray(data)) {
        let value = data.map((item, index) => {
            return parse(item, depth, index === data.length)
        })
        return Object.assign(kv, {
            primitive: false,
            type: 'array',
            value
        })
    } else {
        let keys = Object.keys(data)
        let value = keys.map((key, index) => {
            return parse(data[key], depth + 1, index === keys.length - 1, key)
        })
        return Object.assign(kv, {
            primitive: false,
            type: 'object',
            value
        })
    }
}

export default {
    name: 'json-tree',
    props: {
        level: {
            type: Number,
            default: Infinity
        },
        kv: {
            type: Object
        },
        raw: {
            type: String
        },
        data: {},
        jsonPaths: Array,
    },

    data() {
        return {
            expanded: true,
            schema: {}
        }
    },
    computed: {
        parsed() {
            if (elementCount)
                elementCount = 0;
            if (this.kv) {
                return this.kv
            }
            let result
            try {
                if (this.raw) {
                    result = JSON.parse(this.raw)
                } else if (typeof this.data !== 'undefined') {
                    result = this.data
                    this.schema = result;
                } else {
                    result = '[Vue JSON Tree] No data passed.'
                    console.warn(result)
                }
            } catch (e) {
                result = '[Vue JSON Tree] Invalid raw JSON.'
                console.warn(result)
            } finally {
                return parse(result)
            }
        }
    },
    methods: {
        format(n) {
            if (n > 1) return `${n} items`
            return n ? '1 item' : 'no items'
        },
        // Function that call method from CodeEditor module for searching the parent of curent json path
        findByPath(schema) {
            if (schema.path != undefined)
                CodeEditor.methods.findByPath(schema.path);
        },
        // Function that highlight the current selected object from code editor in case if its find this line in json tree
        selectLineByValue(lineValue) {
            try {
                if (elementInstance != undefined && elementInstance != null) {
                    elementInstance.style.backgroundColor = "white";
                }
                if (lineValue != undefined && lineValue != null) {
                    lineValue = lineValue.replace('"dataJsonPath":', '').replace(/\s/g, '').split(".");
                    for (let index = 1; index < lineValue.length; index++) {
                        elementInstance = this.getElemet(('"' + lineValue[index].replace('"', '') + '"'));
                    }
                    elementInstance.style.backgroundColor = "lightblue"
                }
            } catch (e) {}
        },
        // Function that highlight the current selected object from code editor in case if its find this object reference in FormBuidel      
        selectField(lineValue) {
            try {
                lineValue = lineValue.split(':');
                if (oldElement != null && oldElement != undefined) {
                    oldElement.style.backgroundColor = "white"
                }
                let elements = document.getElementsByTagName('input')
                for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                    if (lineValue[1] != undefined && lineValue[1] != null) {
                        lineValue[1] = lineValue[1].replace(/"/g, '').replace(/\s/g, '');
                        if (elements[elementIndex].getAttribute('data-json-path') == lineValue[1]) {
                            elements[elementIndex].style.backgroundColor = "rgb(190, 190, 190, 0.2)"
                            oldElement = elements[elementIndex];
                        }
                    }
                }
            } catch (e) {}
        },
        // Function that scroll to the current selected element
        getElemet(value) {
            try {
                let elements = document.getElementsByClassName("jsontreekey");
                for (let elementIndex in elements) {
                    if (elements[elementIndex]) {
                        let child = elements[elementIndex];
                        if (child.textContent == value) {
                            child.scrollIntoView();
                            return child
                        }
                    }
                }
            } catch (e) {}
        }
    },
    // Function that is call automatically when module is created to expand all json tree structure
    created() {
        this.expanded = true
    }
}
