import * as monaco from '@timkendrick/monaco-editor';
import JsonTree from '../JsonViewer'

var monacoEditorInstance;

function createMonacoEditor(editorOptions, possition) {
    monacoEditorInstance = monaco.editor.create(document.getElementById('container'), editorOptions);
    monacoEditorInstance.setPosition({
        column: 1,
        lineNumber: possition
    });
    monacoEditorInstance.onDidChangeModelContent(function (e) {
        if (monacoEditorInstance.getValue() == "") {
            monacoEditorInstance.setValue("{}");
        }
    });
    monacoEditorInstance.onDidChangeCursorPosition(function (e) {
        var lineNumber = monacoEditorInstance.getPosition().lineNumber;
        var lineValue = monacoEditorInstance.getModel().getLineContent(lineNumber);

        while (!(lineValue.includes('{')) && !(lineValue.includes('dataJsonPath'))) {
            lineNumber--;
            lineValue = monacoEditorInstance.getModel().getLineContent(lineNumber)
        }
        while (!(lineValue.includes('dataJsonPath'))) {
            lineNumber++;
            lineValue = monacoEditorInstance.getModel().getLineContent(lineNumber)
        }

        JsonTree.methods.selectLineByValue(lineValue);
        JsonTree.methods.selectField(lineValue);
    });

    return monacoEditorInstance;
}


function calcMonacoEditorWidth() {
    var width = document.body.clientWidth;
    if (width > 768)
        width = (Math.floor(width / 2) * 0.9) - 40;
    return width;
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

        window.addEventListener("resize", function () {
            calcMonacoEditorWidth();
            monacoEditorInstance.layout({
                width: calcMonacoEditorWidth(),
                height: 700,
            });
        });
        var editorOptions = {
            value: JSON.stringify(this.code, null, 4),
            language: this.language,
            folding: true,
            theme: this.dark ? 'vs-dark' : 'vs',
            scrollBeyondLastLine: false
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
            if (line != undefined && line != null) {
                while (!(line.includes('{'))) {
                    line = splitedText[linePosition - 2];
                    linePosition--;
                }
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
