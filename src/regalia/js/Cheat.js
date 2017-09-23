var cheatFreezes = {
  variables: {},
  playerProperties: {}
};

$(document).ready(function () {
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

    function findCustomProperty(obj, name) {
        return obj.CustomProperties.filter(function (property) {
            return property.Name === name;
        })[0];
    }

    function isFrozenVariable(variable) {
        return !!cheatFreezes.variables[variable.varname];
    }

    function isFrozenPlayerProperty(property) {
        return !!cheatFreezes.playerProperties[property.Name];
    }

    function setupPlayerProperties() {
        $('.cheat-menu-player-properties-body').off();
        $('.cheat-menu-player-properties-body').empty();

        if (TheGame.Player.CustomProperties.length === 0) {
            $('.cheat-menu-player-properties').hide();
            return;
        } else {
            $('.cheat-menu-player-properties').show();
        }

        TheGame.Player.CustomProperties.forEach(function (property) {
            var $propertyRow = $('<tr></tr>');
            $propertyRow.append('<td>' + property.Name + '</td>');

            var $valueCell = $('<td></td>');
            var $propertyInput = $('<input>');
            $propertyInput.val(property.Value);
            $propertyInput.data('propertyname', property.Name);
            $valueCell.append($propertyInput);

            $propertyRow.append($valueCell);

            var $freezeButton = $('<button>Freeze</button>');
            $freezeButton.addClass('freeze-button');
            $freezeButton.data('propertyname', property.Name);
            if (isFrozenPlayerProperty(property)) {
                $freezeButton.addClass('frozen');
            }
            var $freezeButtonCell = $('<td></td>');
            $freezeButtonCell.append($freezeButton);
            $propertyRow.append($freezeButtonCell);

            $('.cheat-menu-player-properties-body').append($propertyRow);
        });

        $('.cheat-menu-player-properties-body').on('keyup', 'input', function (e) {
            var $propertyInput = $(e.target);
            var property = findCustomProperty(TheGame.Player, $propertyInput.data('propertyname'));
            property.Value = $propertyInput.val();
        });

        $('.cheat-menu-player-properties-body').on('click', '.freeze-button', function (e) {
            var $freezeButton = $(e.target);
            var propertyToFreeze = findCustomProperty(TheGame.Player, $freezeButton.data('propertyname'));
            if (isFrozenPlayerProperty(propertyToFreeze)) {
                delete cheatFreezes.playerProperties[propertyToFreeze.Name];
                $freezeButton.removeClass('frozen');
            } else {
                cheatFreezes.playerProperties[propertyToFreeze.Name] = true;
                $freezeButton.addClass('frozen');
            }
        });
    }

    function setupGameVariables() {
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
            if (isFrozenVariable(variable)) {
                $freezeButton.addClass('frozen');
            }
            var $freezeButtonCell = $('<td></td>');
            $freezeButtonCell.append($freezeButton);
            $variableRow.append($freezeButtonCell);

            $('.cheat-menu-variables-body').append($variableRow);
        });

        $('.cheat-menu-variables-body').on('keyup', 'input', function (e) {
            var $variableInput = $(e.target);
            var variableToSet = Finder.variable($variableInput.data('varname'));
            setValueForVariable(variableToSet, $variableInput.val(), $variableInput.data('index'));
        });

        $('.cheat-menu-variables-body').on('click', '.freeze-button', function (e) {
            var $freezeButton = $(e.target);
            var variableToFreeze = Finder.variable($freezeButton.data('varname'));
            if (isFrozenVariable(variableToFreeze)) {
                delete cheatFreezes.variables[variableToFreeze.varname];
                $freezeButton.removeClass('frozen');
            } else {
                cheatFreezes.variables[variableToFreeze.varname] = true;
                $freezeButton.addClass('frozen');
            }
        });
    }

    $("#cheat_button").click(function(e) {
        $('.cheat-menu').removeClass('hidden');

        $('.cheat-menu, .cheat-menu-actions button').click(function (e) {
           $('.cheat-menu').addClass('hidden');
        });

        $('.cheat-menu-content').click(function (e) {
            e.stopPropagation();
        });

        setupPlayerProperties();
        setupGameVariables();
    });

    var originalSetVariable = SetVariable;
    SetVariable = function (tempvar, bArraySet, bJavascript, varindex, varindex1a, replacedstring, cmdtxt, part3) {
        if (isFrozenVariable(tempvar)) {
            return;
        }
        return originalSetVariable.apply(this, arguments);
    };

    var originalSetCustomProperty = SetCustomProperty;
    SetCustomProperty = function (curprop, part3, replacedstring) {
        if (isFrozenPlayerProperty(curprop)) {
            return;
        }
        return originalSetCustomProperty.apply(this, arguments);
    };
});
