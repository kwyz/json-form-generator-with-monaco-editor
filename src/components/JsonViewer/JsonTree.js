import CodeEditor from '../CodeEditor/codeEditor'


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
            return parse(item, depth + 1, index === data.length - 1)
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
            expanded: false,
            hovered: false,
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
        elementTrigger() {
            this.expanded = !this.expanded;
            var g = document.getElementsByClassName('json-tree-row');
            for (var i = 0, len = g.length; i < len; i++) {
                (function (index) {
                    g[i].onclick = function () {
                        CodeEditor.methods.goToLine((index + 1))
                    }
                })(i);

            }
        }
    },

    created() {
        this.expanded = false
    }
}
