import CodeEditor from '../CodeEditor'
import {
    isBoolean
} from 'util';

var elementInstance;
var oldElement;

function parse(data, depth = 0, last = true, key = undefined) {
    let kv = {
        depth,
        last,
        primitive: true,
        key: JSON.stringify(key)
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
        data: {}
    },

    data() {
        return {
            expanded: true,
            schema: {}
        }
    },
    computed: {
        parsed() {
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
        recursiveGetJsonPath(schema) {
            for (var index = 0; index < schema.value.length; index++) {
                if (schema.value[index].value instanceof Array) {
                    this.recursiveGetJsonPath(schema.value[index])
                } else {
                    if ((schema.value[index].value != undefined) && schema.value[index].value.includes("$")) {
                        return schema.value[index].value
                    }
                }
            }
            return false;
        },
        findByPath(schema) {
            var jsonPath = this.recursiveGetJsonPath(schema);
            if (!isBoolean(jsonPath)) {
                CodeEditor.methods.findByPath(jsonPath);
            };
        },

        selectLineByValue(lineValue) {
            try {
                if (elementInstance != undefined && elementInstance != null) {
                    elementInstance.style.backgroundColor = "white";
                }
                if (lineValue != undefined && lineValue != null) {
                    lineValue = lineValue.replace('"dataJsonPath":', '').replace(/\s/g, '').split(".");
                    for (var index = 1; index < lineValue.length; index++) {
                        var value = '"' + lineValue[index].replace('"', '') + '"';
                        elementInstance = this.getElemet(value)
                    }
                    elementInstance.style.backgroundColor = "lightblue"


                }
            } catch (e) {

            }
        },
        selectField(lineValue) {
            try {
                lineValue = lineValue.split(':');
                if (oldElement != null && oldElement != undefined) {
                    oldElement.style.backgroundColor = "white"

                }
                var elems = document.getElementsByTagName('input')
                for (var index = 0; index < elems.length; index++) {
                    if (lineValue[1] != undefined && lineValue[1] != null) {
                        lineValue[1] = lineValue[1].replace(/"/g, '').replace(/\s/g, '');
                        if (elems[index].getAttribute('data-json-path') == lineValue[1]) {
                            elems[index].style.backgroundColor = "rgb(190, 190, 190, 0.2)"
                            oldElement = elems[index];
                        }
                    }
                }
            } catch (e) {}
        },
        getElemet(value) {
            try {
                var doc = document.getElementsByClassName("jsontreekey");
                for (var i in doc) {
                    if (i) {
                        var child = doc[i];
                        if (child.textContent == value) {
                            child.scrollIntoView();
                            return child
                        }
                    }
                }
            } catch (e) {}
        }
    },

    created() {
        this.expanded = true
    }
}
