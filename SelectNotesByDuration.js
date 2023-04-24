var SCRIPT_TITLE = "Select Notes by Duration";

const MIN_NOTE_LENGTH_DEFAULT_INDEX = 3; //Index representing the option that is set as default setting
/*	
	Options:

		0 = 1/4 Beat
		1 = 1/2 Beat
		2 = 1 Beat
		3 = 2 Beats	(Selected)
		4 = 3 Beats
		5 = 4 Beats	
		
*/

function getClientInfo() {
	return {
		"name" : SV.T(SCRIPT_TITLE),
		"category" : "Johann JEG Scripts - Utilities",
		"author" : "Johann JEG - https://github.com/JohannJEG/",
		"versionNumber" : 1,
		"minEditorVersion" : 65540
	};
}

function getTranslations(langCode) {
  if(langCode == "es-la") {
    return [
		["Select Notes by Duration", "Seleccionar Notas por Duración"],
		["Selects all notes that match or exceed the specified duration.", "Selecciona todas las notas que coincidan o sobrepasen la duración especificada."],
		["Select notes equal or longer than:", "Seleccionar notas superiores a:"]
    ];
  } else if(langCode == "ja-jp") {	//I used DeepL translator
    return [
		["Select Notes by Duration", "ノートをデュレーションで選択する"],
		["Selects all notes that match or exceed the specified duration.", "指定したデュレーションと一致する、またはそれを超えるすべてのノートを選択する"],
		["Select notes equal or longer than:", "と同じかそれよりも長い音符を選択します："]
    ];
  } else if(langCode == "zh-cn") {	//I used DeepL translator
    return [
		["Select Notes by Duration", "按时间长短选择音符"],
		["Selects all notes that match or exceed the specified duration.", "选择所有符合或超过指定时间长度的音符"],
		["Select notes equal or longer than:", "选择等于或长于的音符："]
    ];
  }
}

function selectNotesByLength(targetNoteLength){
	
	var mainEditorView = SV.getMainEditor();
	var selection = mainEditorView.getSelection();
	var currentGroup = mainEditorView.getCurrentGroup().getTarget();
	
	selection.clearAll();
	
	var noteCount = currentGroup.getNumNotes();	

	for (var i = 0; i < noteCount; i++) {
		var currentNote = currentGroup.getNote(i);	
		if(SV.blick2Quarter(currentNote.getDuration()) >= targetNoteLength){				
			selection.selectNote(currentNote);
		}
	}		
}

function main() {
	const noteLengths = [
		{tag: "1/4 Beat", value: 0.25},
		{tag: "1/2 Beat", value: 0.5},
		{tag: "1 Beat", value: 1},
		{tag: "2 Beats", value: 2},
		{tag: "3 Beats", value: 3},
		{tag: "4 Beats", value: 4}
	];

	var dialogForm = {
		"title" : SV.T("Select Multiple Notes"),
		"message" : SV.T("Selects all notes that match or exceed the specified duration."),
		"buttons" : "OkCancel",
		"widgets" : [
			{
				"name" : "MinimumNoteLength",
				"type" : "ComboBox",
				"label" : SV.T("Select notes equal or longer than:"),
				"choices" : [
					noteLengths[0].tag,
					noteLengths[1].tag,
					noteLengths[2].tag,
					noteLengths[3].tag,
					noteLengths[4].tag,
					noteLengths[5].tag
				],
				"default" : MIN_NOTE_LENGTH_DEFAULT_INDEX
			}
    	]
  	};

	var dialog = SV.showCustomDialog(dialogForm);

	if(dialog.status) {
		selectNotesByLength(noteLengths[dialog.answers.MinimumNoteLength].value);
	}
	
	SV.finish();
}