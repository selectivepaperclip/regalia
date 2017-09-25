var SavedGames = {
    titleForSave: function () {
        GameController.title().replace(/ /g, '_');
    },
    keyForIndex: function () {
        return this.titleForSave() + '-Saves';
    },
    keyForSave: function (n) {
        return this.titleForSave() + '-Save' + n;
    },
    getIndex: function () {
        var rawIndex = localStorage.getItem(this.keyForIndex());
        if (rawIndex) {
            return JSON.parse(rawIndex)
        } else {
            this.reset();
            return {};
        }
    },
    getSortedSaves: function () {
        var parsedIndex = this.getIndex();
        return Object.keys(parsedIndex).sort(function (a, b) {
            return parseInt(b, 10) - parseInt(a, 10);
        }).map(function (id) {
            return parsedIndex[id];
        });
    },
    getSave: function (id) {
        return JSON.parse(localStorage.getItem(this.keyForSave(id)));
    },
    nextSaveId: function () {
        var lastSave = this.getSortedSaves()[0];
        return (lastSave ? lastSave.id : 0) + 1;
    },
    createSave: function (id, name, date, gameData) {
        var savedGames = this.getIndex();
        savedGames[id] = {
            id: id,
            name: name,
            date: date
        };
        localStorage.setItem(this.keyForSave(id), JSON.stringify({
            id: id,
            name: name,
            date: date,
            gameData: gameData,
            cheatFreezes: window.cheatFreezes
        }));
        localStorage.setItem(this.keyForIndex(), JSON.stringify(savedGames));
    },
    destroySave: function (id) {
        var savedGames = this.getIndex();
        delete savedGames[id];
        localStorage.removeItem(this.keyForSave(id));
        localStorage.setItem(this.keyForIndex(), JSON.stringify(savedGames));
    },
    reset: function () {
        var rawIndex = localStorage.getItem(this.keyForIndex());
        if (rawIndex) {
            var saveKeys = Object.keys(JSON.parse(rawIndex));
            for (var i = 0; i < saveKeys.length; i++) {
                localStorage.removeItem(this.keyForSave(saveKeys[i]));
            }
        }
        localStorage.setItem(this.keyForIndex(), JSON.stringify({}));
    },
    import: function (newSaves) {
        var savedGames = this.getIndex();
        for (var i = 0; i < newSaves.length; i++) {
            var newSave = newSaves[i];
            savedGames[newSave.id] = {
                id: newSave.id,
                name: newSave.name,
                date: newSave.date
            };
            localStorage.setItem(this.keyForSave(newSave.id), JSON.stringify(newSave));
        }
        localStorage.setItem(this.keyForIndex(), JSON.stringify(savedGames));
    },

    saveDataFor: function (game) {
      return JSON.stringify(DeepDiff.diff(OriginalGame, game));
    },

    applySaveToGame: function (game, savedGame) {
        var changes = JSON.parse(savedGame.gameData);
        var orderedChanges = orderChanges(changes);

        for (var i = 0; i < orderedChanges.length; i++) {
            DeepDiff.applyChange(TheGame, true, orderedChanges[i]);
        }
    }
};

function pathsEqual(p1,p2) {
    return JSON.stringify(p1) == JSON.stringify(p2);
}

function orderChanges(changes) {
    var result = [];
    // Reverse the order of array deletions generated by deep-diff to get the correct result
    // See https://github.com/flitbit/diff/issues/35 and https://github.com/flitbit/diff/issues/47

    function addReversedChanges(changesToReverse) {
        changesToReverse.reverse();
        for (var i = 0; i < changesToReverse.length; i++) {
            result.push(changesToReverse[i]);
        }
    }

    var currentArrayDeletionChanges = null;
    for (var i = 0; i < changes.length; i++) {
        var change = changes[i];
        if (change.kind == "A" && change.item.kind == "D") {
            if (currentArrayDeletionChanges) {
                if (pathsEqual(currentArrayDeletionChanges[0].path, change.path)) {
                    currentArrayDeletionChanges.push(change);
                    continue;
                } else {
                    addReversedChanges(currentArrayDeletionChanges);
                    currentArrayDeletionChanges = [change];
                    continue;
                }
            } else {
                currentArrayDeletionChanges = [change];
                continue;
            }
        }

        if (currentArrayDeletionChanges) {
            addReversedChanges(currentArrayDeletionChanges);
            currentArrayDeletionChanges = null;
        }
        result.push(change);
    }

    // In case the last change was itself a delete
    if (currentArrayDeletionChanges) {
        addReversedChanges(currentArrayDeletionChanges);
        currentArrayDeletionChanges = null;
    }

    return result;
}