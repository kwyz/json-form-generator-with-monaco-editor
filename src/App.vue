<template>
  <v-app class="no-overflow">
    <v-flex offset-md3 xs6>
      <v-btn color="success" @click="displayEditor">text</v-btn>
      <code-editor :code=code :language=language></code-editor>
      <json-viewer :data=code></json-viewer>

    </v-flex>
  </v-app>
</template>

<script>
import CodeEditor from './components/CodeEditor/codeEditor'
import JsonViewer from './components/JsonViewer/json-tree'

export default {
  name: 'App',
    props: {
      source: String
    },
    components:{
		"code-editor": CodeEditor,
		"json-viewer": JsonViewer
    },

  data(){
      return {
        show: false,
		language: "json",
		schem:{
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {name: 'child folder'}

    
  ]
},
        code: {
	"type": "team",
	"test": {
		"testPage": "tools/testing/run-tests.htm",
		"enabled": true
	},
    "search": {
        "excludeFolders": [
			".git",
			"node_modules",
			"tools/bin",
			"tools/counts",
			"tools/policheck",
			"tools/tfs_build_extensions",
			"tools/testing/jscoverage",
			"tools/testing/qunit",
			"tools/testing/chutzpah",
			"server.net"
        ]
    },
	"languages": {
		"vs.languages.typescript": {
			"validationSettings": [{
				"scope":"/",
				"noImplicitAny":true,
				"noLib":false,
				"extraLibs":[],
				"semanticValidation":true,
				"syntaxValidation":true,
				"codeGenTarget":"ES5",
				"moduleGenTarget":"",
				"lint": {
                    "emptyBlocksWithoutComment": "warning",
                    "curlyBracketsMustNotBeOmitted": "warning",
                    "comparisonOperatorsNotStrict": "warning",
                    "missingSemicolon": "warning",
                    "unknownTypeOfResults": "warning",
                    "semicolonsInsteadOfBlocks": "warning",
                    "functionsInsideLoops": "warning",
                    "functionsWithoutReturnType": "warning",
                    "tripleSlashReferenceAlike": "warning",
                    "unusedImports": "warning",
                    "unusedVariables": "warning",
                    "unusedFunctions": "warning",
                    "unusedMembers": "warning"
                }
			}, 
			{
				"scope":"/client",
				"baseUrl":"/client",
				"moduleGenTarget":"amd"
			},
			{
				"scope":"/server",
				"moduleGenTarget":"commonjs"
			},
			{
				"scope":"/build",
				"moduleGenTarget":"commonjs"
			},
			{
				"scope":"/node_modules/nake",
				"moduleGenTarget":"commonjs"
			}],
			"allowMultipleWorkers": true
		}
	}
}
      };    
  },
    methods:{
        displayEditor: function(){
            this.show = !this.show;
            CodeEditor.methods.disposeEditor(this.show)
        }
    }
}
</script>
<style>
  html {
    overflow-y: auto;
  }
</style>
