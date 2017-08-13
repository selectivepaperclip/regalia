var SavedGames = {
    keyForIndex: function () {
        return TheGame.Title + '-Saves';
    },
    keyForSave: function (n) {
        return TheGame.Title + '-Save' + n;
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
            gameData: gameData
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
    }
};
