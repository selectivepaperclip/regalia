$(document).ready(function () {
    var frozenVariables = {};

    function variableScalar(variable) {
        if (variable.vartype === "VT_NUMBER") {
            return true;
        } else if (variable.vartype === "VT_STRING") {
            return true;
        }
        return false;
    }

    function variableArray(variable) {
        if (variable.vartype === "VT_NUMBERARRAY") {
            return true;
        } else if (variable.vartype === "VT_STRINGARRAY") {
            return true;
        }
        return false;
    }

    function valueForVariable(variable) {
        if (variable.vartype === "VT_NUMBER") {
            return variable.dNumType;
        } else if (variable.vartype === "VT_STRING") {
            return variable.sString;
        }
    }

    function setValueForVariable(variable, value, index) {
        if (variable.vartype === "VT_NUMBER") {
            variable.dNumType = parseFloat(value);
        } else if (variable.vartype === "VT_STRING") {
            variable.sString = value;
        } else if (variable.vartype === "VT_NUMBERARRAY") {
            variable.VarArray[index] = parseFloat(value);
        } else if (variable.vartype === "VT_STRINGARRAY") {
            variable.VarArray[index] = value;
        }
    }

    function isFrozen(variable) {
        return !!frozenVariables[variable.varname];
    }

    $("#cheat_button").click(function(e) {
        $('.cheat-menu').removeClass('hidden');

        $('.cheat-menu, .cheat-menu-actions button').click(function (e) {
           $('.cheat-menu').addClass('hidden');
        });

        $('.cheat-menu-content').click(function (e) {
            e.stopPropagation();
        });

        $('.cheat-menu-variables-body').off();
        $('.cheat-menu-variables-body').empty();

        TheGame.Variables.forEach(function (variable) {
            var $variableRow = $('<tr></tr>');
            $variableRow.append('<td>' + variable.varname + '</td>');

            var $valueCell = $('<td></td>');
            if (variableScalar(variable)) {
                var $variableInput = $('<input>');
                $variableInput.val(valueForVariable(variable));
                $variableInput.data('varname', variable.varname);
                $valueCell.append($variableInput);
            } else if (variableArray(variable)) {
                variable.VarArray.forEach(function(item, index) {
                    var $arrayItemInput = $('<input>');
                    $arrayItemInput.val(item);
                    $arrayItemInput.data('varname', variable.varname);
                    $arrayItemInput.data('index', index);
                    var $arrayItemRow = $('<div></div>');
                    $arrayItemRow.append(index + ': ');
                    $arrayItemRow.append($arrayItemInput);
                    $valueCell.append($arrayItemRow);
                });
            } else {
                $valueCell.html("Uneditable type: " + variable.vartype);
            }

            $variableRow.append($valueCell);

            var $descCell = $('<td class="desc-cell"></td>');
            $descCell.html(variable.VarComment);
            $variableRow.append($descCell);

            var $freezeButton = $('<button>Freeze</button>');
            $freezeButton.addClass('freeze-button');
            $freezeButton.data('varname', variable.varname);
            if (isFrozen(variable)) {
                $freezeButton.addClass('frozen');
            }
            var $freezeButtonCell = $('<td></td>');
            $freezeButtonCell.append($freezeButton);
            $variableRow.append($freezeButtonCell);

            $('.cheat-menu-variables-body').append($variableRow);
        });

        $('.cheat-menu-variables-body').on('keyup', 'input', function (e) {
            var $variableInput = $(e.target);
            var variableToSet = GetVariable($variableInput.data('varname'));
            setValueForVariable(variableToSet, $variableInput.val(), $variableInput.data('index'));
        });

        $('.cheat-menu-variables-body').on('click', '.freeze-button', function (e) {
            var $freezeButton = $(e.target);
            var variableToFreeze = GetVariable($freezeButton.data('varname'));
            if (isFrozen(variableToFreeze)) {
                delete frozenVariables[variableToFreeze.varname];
                $freezeButton.removeClass('frozen');
            } else {
                frozenVariables[variableToFreeze.varname] = true;
                $freezeButton.addClass('frozen');
            }
        });
    });

    var originalSetVariable = SetVariable;
    SetVariable = function (tempvar, bArraySet, bJavascript, varindex, varindex1a, replacedstring, cmdtxt, part3) {
        if (isFrozen(tempvar)) {
            return;
        }
        return originalSetVariable.apply(this, arguments);
    };
});
