var SCRIPT_TITLE = "Invert Selection";

function getClientInfo() {
    return {
        "name": SV.T(SCRIPT_TITLE),
        "category": "Johann JEG Scripts - Utilities",
        "author": "Johann JEG - https://github.com/JohannJEG/",
        "versionNumber": 1,
        "minEditorVersion": 65540
    };
}

function getTranslations(langCode) {
    if (langCode == "es-la") {
        return [
            ["Invert Selection", "Invertir Selección"]
        ];
    } else if (langCode == "ja-jp") {	//I used DeepL translator
        return [
            ["Invert Selection", "逆選択"]
        ];
    } else if (langCode == "zh-cn") {	//I used DeepL translator
        return [
            ["Invert Selection", "反向选择"]
        ];
    }
}

function valueInArray(val, arr) {
    return arr.indexOf(val) === -1;
}

function main() {
    var mainEditorView = SV.getMainEditor();
    var selection = mainEditorView.getSelection();
    var currentGroup = mainEditorView.getCurrentGroup().getTarget();
    var selectedNotes = selection.getSelectedNotes();

    if (selectedNotes.length > 0) {
        //Invert the current selection         
        var selectedNotesIndexes = [];

        selectedNotes.forEach(function (selectedNote) {
            selectedNotesIndexes.push(selectedNote.getIndexInParent());
        });

        selection.clearAll();

        for (var i = 0; i < currentGroup.getNumNotes(); i++) {
            if (valueInArray(currentGroup.getNote(i).getIndexInParent(), selectedNotesIndexes)) {
                selection.selectNote(currentGroup.getNote(i));
            }
        }
    } else {
        //If there are no notes selected, select all notes in the group      
        for (var i = 0; i < currentGroup.getNumNotes(); i++) {
            selection.selectNote(currentGroup.getNote(i));
        }
    }

    SV.finish();
}