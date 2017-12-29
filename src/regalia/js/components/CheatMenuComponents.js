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

class GameVariables extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tableRows = this.props.variables.filter((variable) => {
            if (this.props.filter) {
                return variable.varname.toLowerCase().includes(this.props.filter.toLowerCase());
            } else {
                return true;
            }
        }).map((variable, index) => {
            return <GameVariable variable={variable} key={variable.varname} />;
        });

        if (tableRows.length === 0) {
            return (
                <div style={{'margin': '30px 0'}}>No Game Variables match filter conditions.</div>
            )
        }

        return (
            <div className="cheat-menu-variables">
                <h2 className="cheat-menu-subtitle">
                    Game Variables
                </h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Desc</th>
                        <th>Freeze</th>
                    </tr>

                    </thead>
                    <tbody class="cheat-menu-variables-body">{tableRows}</tbody>
                </table>
            </div>
        )
    }
}

class GameVariable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: valueForVariable(this.props.variable),
            frozen: isFrozenVariable(this.props.variable)
        };

        this.freezeClicked = this.freezeClicked.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
    }

    freezeClicked() {
        const variable = this.props.variable;
        if (isFrozenVariable(variable)) {
            delete cheatFreezes.variables[variable.varname];
        } else {
            cheatFreezes.variables[variable.varname] = true;
        }
        this.setState({frozen: isFrozenVariable(variable)});
    }

    inputChanged(index) {
        return (e) => {
            const variable = this.props.variable;
            setValueForVariable(variable, e.target.value, index);
            this.setState({value: valueForVariable(variable)});
        };
    }

    render() {
        const variable = this.props.variable;
        let value;
        if (variableScalar(variable)) {
            value = (
                <input onChange={this.inputChanged()} value={this.state.value} />
            );
        } else if (variableArray(variable)) {
            value = variable.VarArray.map((arrayItem, index) => {
                return (
                    <div>
                        {index}: <input onChange={this.inputChanged(index)} value={arrayItem} />
                    </div>
                );
            });
        } else {
            value = "Uneditable type: " + variable.vartype;
        }

        return (
            <tr>
                <td>{variable.varname}</td>
                <td>{value}</td>
                <td class='desc-cell' dangerouslySetInnerHTML={{__html: variable.VarComment}} />
                <td>
                    <button
                        onClick={this.freezeClicked}
                        className={this.state.frozen ? 'freeze-button frozen' : 'freeze-button'}>
                        Freeze
                    </button>
                </td>
            </tr>
        );
    }
}


class GameCustomProperties extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tableRows = this.props.properties.filter((property) => {
            if (this.props.filter) {
                return property.Name.toLowerCase().includes(this.props.filter.toLowerCase());
            } else {
                return true;
            }
        }).map((property, index) => {
            return <GameCustomProperty property={property} key={property.Name} />;
        });

        if (tableRows.length === 0) {
            if (TheGame.Player.CustomProperties.length === 0) {
                return null;
            } else {
                return (
                    <div style={{'margin': '30px 0'}}>No Player Properties match filter conditions.</div>
                )
            }
        }

        return (
            <div className="cheat-menu-player-properties">
                <h2 className="cheat-menu-subtitle">
                    Player Properties
                </h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Freeze</th>
                    </tr>

                    </thead>
                    <tbody class="cheat-menu-player-properties-body">{tableRows}</tbody>
                </table>
            </div>
        )
    }
}

class GameCustomProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.property.Value,
            frozen: isFrozenPlayerProperty(this.props.property)
        };

        this.freezeClicked = this.freezeClicked.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
    }

    freezeClicked() {
        const property = this.props.property;
        if (isFrozenPlayerProperty(property)) {
            delete cheatFreezes.playerProperties[property.Name];
        } else {
            cheatFreezes.playerProperties[property.Name] = true;
        }
        this.setState({frozen: isFrozenPlayerProperty(property)});
    }

    inputChanged(index) {
        return (e) => {
            this.props.property.Value = e.target.value;
            this.setState({value: e.target.Value});
        };
    }

    render() {
        const property = this.props.property;
        return (
            <tr>
                <td>{property.Name}</td>
                <td>
                    <input onChange={this.inputChanged()} value={this.state.value} />
                </td>
                <td>
                    <button
                        onClick={this.freezeClicked}
                        className={this.state.frozen ? 'freeze-button frozen' : 'freeze-button'}>
                        Freeze
                    </button>
                </td>
            </tr>
        );
    }
}

class CheatMenuContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        };

        this.filterChanged = this.filterChanged.bind(this);
    }

    filterChanged(e) {
        this.setState({filter: e.target.value});
    }

    finishClicked() {
        $('.cheat-menu').addClass('hidden');
    }

    render() {
        return (
            <div class="cheat-menu-content">
                    <div className="cheat-menu-title">
                        <h1>Cheat Menu</h1>
                        <input placeholder="Filter" value={this.state.filter} onChange={this.filterChanged} />
                    </div>
                    <div className="cheat-menu-scrollable">
                        <GameCustomProperties properties={TheGame.Player.CustomProperties} filter={this.state.filter} />
                        <GameVariables variables={TheGame.Variables} filter={this.state.filter} />
                    </div>
                    <div className="cheat-menu-actions">
                        <button onClick={this.finishClicked}>Finish</button>
                    </div>
            </div>
        )
    }
}