import * as monaco from '@timkendrick/monaco-editor';
var monEditor;


function monacoEditor(options, possition) {
    monEditor = monaco.editor.create(document.getElementById('container'), options);
    monEditor.setPosition({
        column: 1,
        lineNumber: possition
    });
    return monEditor;
}

var options = {};
export default {
    name: "CodeEditor",
    props: {
        code: Object,
        language: String,
        dark: Boolean,
    },
    data() {
        return {
            editor: "",
        };
    },
    mounted() {
        window.MonacoEnvironment = {
            baseUrl: 'node_modules/@timkendrick/monaco-editor/dist/external',
        };
        document.getElementById('mainFrame').style.display = 'block';
        options = {
            value: JSON.stringify(this.code, null, 4),
            language: this.language,
            folding: true,
            theme: this.dark ? 'vs-dark' : 'vs',
            colors: {
                'editor.lineHighlightBackground': 'red',
                'editor.selectionHighlightBackground': "red"
            }
        };

        this.editor = monacoEditor(options, 1);


    },
    methods: {
        hideEditor(state) {
            document.getElementById('mainFrame').style.display = state ? "block" : "none"
        },


        goToLine(lineIndex) {

            this.hideEditor(false);
            monEditor.setPosition({
                column: 1,
                lineNumber: lineIndex
            })
            monEditor.revealLineInCenter(lineIndex)

            // monEditor.focus();
            this.hideEditor(true);
        },
    }
}
