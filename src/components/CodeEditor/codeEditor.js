import * as monaco from '@timkendrick/monaco-editor';

var monacoEditorInstance;

function createMonacoEditor(editorOptions, possition) {
    monacoEditorInstance = monaco.editor.create(document.getElementById('container'), editorOptions);
    monacoEditorInstance.setPosition({
        column: 1,
        lineNumber: possition
    });
    return monacoEditorInstance;
}
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
        var editorOptions = {
            value: JSON.stringify(this.code, null, 4),
            language: this.language,
            folding: true,
            theme: this.dark ? 'vs-dark' : 'vs',
        };
        this.editor = createMonacoEditor(editorOptions, 1);
    },
    methods: {
        findByPath(path) {
            var matches = monacoEditorInstance.getModel().findMatches(path);

            if (matches.length != 0) {
                var startLine = matches[0].range.startLineNumber - 1;
                var parentPosition = this.getParentPosition(monacoEditorInstance.getValue(position), startLine)
                var position = {
                    column: matches[0].range.startColumn - 1,
                    lineNumber: parentPosition,
                }
                monacoEditorInstance.setPosition(position)
                monacoEditorInstance.revealPositionInCenter(position);
            }
        },
        getParentPosition(editorContent, linePosition) {
            var line = "";
            var splitedText = editorContent.split("\n");
            while (!(line.includes('{'))) {
                line = splitedText[linePosition - 2];
                linePosition--;
            }
            return linePosition;
        },
        getEditorValue() {
            try {
                JSON.parse(monacoEditorInstance.getValue())
            } catch (exception) {
                return exception
            }
            return JSON.parse(monacoEditorInstance.getValue())
        }
    },
}
