import * as monaco from '@timkendrick/monaco-editor';
import JsonTree from '../JsonViewer'

//Global monaco editor instance
var monacoEditorInstance;


//Create a monaco editor instance an place it in element with id 'container'
function createMonacoEditor(editorOptions) {

    monacoEditorInstance = monaco.editor.create(document.getElementById('container'), editorOptions);

    //Initial monaco editor cursor position
    monacoEditorInstance.setPosition({
        column: 1,
        lineNumber: 1
    });

    //Assign event listner on changing monaco editor content
    monacoEditorInstance.onDidChangeModelContent(function (e) {
        //If monaco editor contetn is empty, place in editor dual curly brackets, to avoid error on form generator
        if (monacoEditorInstance.getValue() == "") {
            monacoEditorInstance.setValue("{}");
        }
    });
    //Asign event listner on changing cursor position in monaco editor, to get  parent of curent line
    monacoEditorInstance.onDidChangeCursorPosition(function (e) {
        try {
            //Get current monaco editor cursor position, more specifically line number
            var lineNumber = monacoEditorInstance.getPosition().lineNumber;
            // Variable that contains current line value 
            var lineValue = "";
            if (lineNumber != undefined && lineNumber != null)
                // Get entire line content 
                lineValue = monacoEditorInstance.getModel().getLineContent(lineNumber);

            //Search up to get parent 
            while (!(lineValue.includes('{')) && !(lineValue.includes('dataJsonPath'))) {
                lineNumber--;
                if (lineNumber != undefined && lineNumber != null)
                    lineValue = monacoEditorInstance.getModel().getLineContent(lineNumber)
            }
            //Search down to get parent
            while (!(lineValue.includes('dataJsonPath'))) {
                lineNumber++;
                if (lineNumber != undefined && lineNumber != null)
                    lineValue = monacoEditorInstance.getModel().getLineContent(lineNumber)
            }
            //Return line value to other methods if value is not null or undefined
            if (lineValue != undefined && lineValue != null) {
                JsonTree.methods.selectLineByValue(lineValue);
                JsonTree.methods.selectField(lineValue);
            }
        } catch (error) {

        }
    });
    // Return monaco editor instance 
    return monacoEditorInstance;
}

// Function that estimate curent window width, and return new editor width
function calcMonacoEditorWidth() {
    var width = document.body.clientWidth;
    if (width > 1024)
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
        // Add event listner to window, that is triggered on window resize, and change monaco editor layout
        window.addEventListener("resize", function () {
            calcMonacoEditorWidth();
            monacoEditorInstance.layout({
                width: calcMonacoEditorWidth(),
                height: 700,
            });
        });

        /**
         * @param value - curent editor content 
         * @param language - curent editor content, language
         * @param folding - capability to fold language contructions
         * @param theme - monaco editor visual apperance (black or white)
         * @param scrollBeyondLastLine - remove empty space after last line
         */

        var editorOptions = {
            value: JSON.stringify(this.code, null, 4),
            language: this.language,
            folding: true,
            theme: this.dark ? 'vs-dark' : 'vs',
            scrollBeyondLastLine: false
        };

        // Call function that create monaco editor
        this.editor = createMonacoEditor(editorOptions);
    },
    methods: {

        //Function that search an line in editor that correspond to selected element in form view or json-tree view
        findByPath(path) {
            let pathElements = path.split(".");
            pathElements.shift();
            if (!path) {
                console.warn("Cannot find element. Add 'dataJsonPath' property in json schema. Ex. 'dataJsonPath':'$.obj_name'")
            } else {
                var model = monacoEditorInstance.getValue();
                let lastLineNumber = monacoEditorInstance.getModel().getLineCount();
                for (let index = 0; index < pathElements.length; index++) {
                    model = monaco.editor.createModel(model);
                    var matches = model.findMatches(pathElements[index]);
                    /** matches is array of range object, that contains 4 properties
                     * 
                     * @param startLineNumber { number } - start line number of searched item
                     * @param startColumnNumber { number } - start column number of serached item
                     * @param endLineNumber { number } - end line number of searched item 
                     * @param startColumnNumber { number } - end column number if serached item
                     */
                    if (matches.length != 0) {
                        model = model.getValueInRange({
                            startLineNumber: matches[0].range.startLineNumber,
                            startColumn: matches[0].range.startColumn,
                            endLineNumber: lastLineNumber,
                            endColumn: 1
                        })
                    }
                }
                // Fiind in monaco editor this part of json schema
                var matches = monacoEditorInstance.getModel().findMatches(model)
                // Create new position object with parent position
                var position = {
                    column: matches[0].range.startColumn - 1,
                    lineNumber: matches[0].range.startLineNumber,
                }
                // Set editor cursor on parent positon
                monacoEditorInstance.setPosition(position)
                monacoEditorInstance.revealPositionInCenter(position);

            }
        },
        // Function that get entire monaco editor value and return it in JSON format
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
