import * as monaco from '@timkendrick/monaco-editor';
var monEditor;
var precedentLineNumber = 1;

function monacoEditor(options, possition) {
    monEditor = monaco.editor.create(document.getElementById('container'), options);
    monEditor.setPosition({
        column: 1,
        lineNumber: possition
    });
    return monEditor;
}

function clearElementHighlight(clasName) {
    var element = (document.querySelector("."+clasName))
    console.log(clasName);

    if (element != null) {


        for (var i = 0; i < element.classList.length; i++) {
            element.classList.remove(["setLineDecoration"]);
            element.classList.remove(["disposeLineDecoration"]);
        }
        console.log("LENGTH " + element.classList.length);
        console.log("CLASSES " + element.classList);
    }
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
            theme: this.dark ? 'vs-dark' : 'vs'
        };

        this.editor = monacoEditor(options, 1);


    },
    methods: {
        disposeEditor(state) {
            if (state == false)
                document.getElementById('mainFrame').style.display = 'none';
            else
                document.getElementById('mainFrame').style.display = 'block';
        },


        goToLine(lineIndex) {
            this.disposeEditor(false);
            var notOnFocus = {
                range: new monaco.Range(precedentLineNumber, 1, precedentLineNumber, 1000),
                options: {}
            };
            var onFocus = {
                range: new monaco.Range(lineIndex, 1, lineIndex, 1000),
                options: {
                    inlineClassName: 'setLineDecoration'
                }
            };


            // remove all classes whitout first and last 
            // clearElementHighlight("setLineDecoration");
            // clearElementHighlight("disposeLineDecoration");
            
            monEditor.setPosition({
                column: 1,
                lineNumber: lineIndex
            })
            monEditor.revealLineInCenter(lineIndex)


            console.log(precedentLineNumber + ' ' + lineIndex);

            monEditor.deltaDecorations([], [notOnFocus]);
            monEditor.deltaDecorations([], [onFocus])
            
            precedentLineNumber = lineIndex
            this.disposeEditor(true);
        },
    }
}
