import * as monaco from "@timkendrick/monaco-editor";

//Global monaco editor instance
var monacoEditorInstance;

//Create a monaco editor instance an place it in element with id 'container'
function createMonacoEditor(editorOptions) {
    monacoEditorInstance = monaco.editor.create(
        document.getElementById("container"),
        editorOptions
    );

    //Initial monaco editor cursor position
    monacoEditorInstance.setPosition({
        column: 1,
        lineNumber: 1
    });
    //Assign event listner on changing monaco editor content
    monacoEditorInstance.onDidChangeModelContent(function (e) {
        //If monaco editor content is empty, place in editor dual curly brackets, to avoid error on form generator
        if (monacoEditorInstance.getValue() == "") {
            monacoEditorInstance.setValue("{}");
        }
    });
    // Return monaco editor instance
    return monacoEditorInstance;
}

// Function that estimate curent window width, and return new editor width
function calcMonacoEditorWidth() {
    let width = document.body.clientWidth;
    return width > 1024 ? width : Math.floor(width / 2) * 0.9 - 40;
}

export default {
    name: "CodeEditor",
    props: {
        code: Object,
        language: String,
        dark: Boolean
    },
    data() {
        return {
            editor: ""
        };
    },
    mounted() {
        window.MonacoEnvironment = {
            baseUrl: "node_modules/@timkendrick/monaco-editor/dist/external"
        };
        // Add event listner to window, that is triggered on window resize, and change monaco editor layout
        window.addEventListener("resize", function () {
            calcMonacoEditorWidth();
            monacoEditorInstance.layout({
                width: calcMonacoEditorWidth(),
                height: 700
            });
        });
        /**
         * @param value - curent editor content
         * @param language - curent editor content, language
         * @param folding - capability to fold language contructions
         * @param theme - monaco editor visual apperance (black or white)
         * @param scrollBeyondLastLine - remove empty space after last line
         * @param formatOnPaste - auto format text on paste 
         * @param formatOnType - auto format text on typeing 
         * @param minimap - set minimap enabled to false, to remove code 
         */
        var editorOptions = {
            value: JSON.stringify(this.code, null, 4),
            language: this.language,
            folding: true,
            formatOnPaste: true,
            formatOnType: true,
            minimap: {
                enabled: false
            },
            theme: this.dark ? "vs-dark" : "vs",
            scrollBeyondLastLine: false,
            autoIndent: true
        };

        // Call function that create monaco editor
        this.editor = createMonacoEditor(editorOptions);
    },
    methods: {
        //Function that search an line in editor that correspond to selected element in form view or json-tree view
        findByPath(path) {
            let pathElements = path.split(".");
            // Remove first ('$') element from pathElements
            pathElements.shift();
            if (!path) {
                console.warn(
                    "Cannot find element. Missing json path. Check JsonPathGenerator component"
                );
            } else {
                let modelValue = monacoEditorInstance.getValue();
                let modelInstance = {};
                let lastLineNumber = monacoEditorInstance
                    .getModel()
                    .getLineCount();

                for (let index = 0; index < pathElements.length; index++) {
                    modelInstance = monaco.editor.createModel(modelValue);
                    var matches = modelInstance.findMatches(
                        pathElements[index]
                    );
                    /** matches is array of range object, that contains 4 properties
                     * @param startLineNumber { integer } - start line number of searched item
                     * @param startColumnNumber { integer } - start column number of serached item
                     * @param endLineNumber { integerer } - end line number of searched item
                     * @param startColumnNumber { integer } - end column number of serached item
                     */
                    if (matches.length != 0) {
                        for (let keyIndex = 0; keyIndex < matches.length; keyIndex++) {
                            let key = modelInstance.getLineContent(
                                matches[keyIndex].range.startLineNumber
                            );
                            if (pathElements[index] == this.applyRegex(key)) {
                                modelValue = modelInstance.getValueInRange({
                                    startLineNumber: matches[keyIndex].range.startLineNumber,
                                    startColumn: matches[keyIndex].range.startColumn,
                                    endLineNumber: lastLineNumber,
                                    endColumn: 1
                                });
                                break;
                            }
                        }
                    }
                }
                // Fiind in monaco editor this part of json schema
                var matches = monacoEditorInstance
                    .getModel()
                    .findMatches(modelValue);
                // Create new position object with coordonates of searched line
                var position = {
                    column: matches[0].range.startColumn - 1,
                    lineNumber: matches[0].range.startLineNumber
                };
                // Set editor cursor on line possition coordonates
                monacoEditorInstance.setPosition(position);
                monacoEditorInstance.revealPositionInCenter(position);
            }
        },
        // Function that remove from line all spaces, curly brackets, double dot's and quotes
        applyRegex(key) {
            return key
                .replace(/\s/g, "")
                .replace(/\"/g, "")
                .replace(/\{/g, "")
                .replace(/\:/g, "");
        },
        // Function that get entire monaco editor value and return it in JSON format
        getEditorValue() {
            try {
                JSON.parse(monacoEditorInstance.getValue());
            } catch (exception) {
                return exception;
            }
            return JSON.parse(monacoEditorInstance.getValue());
        }
    }
};
