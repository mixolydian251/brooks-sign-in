import React from 'react';

class DependantFormItem extends React.Component {
  state = {
    name: this.props.dependant.name ? this.props.dependant.name : '',
    age: this.props.dependant.age ? this.props.dependant.age : ''
  };
  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));

    setTimeout(() => {
      this.props.onDependantChange(this.props.dependant.id, {
        id: this.props.dependant.id,
        name: this.state.name,
        age: this.state.age
      });
    }, 1);
  };
  onAgeChange = e => {
    const age = e.target.value;
    this.setState(() => ({ age }));

    setTimeout(() => {
      this.props.onDependantChange(this.props.dependant.id, {
        id: this.props.dependant.id,
        name: this.state.name,
        age: this.state.age
      });
    }, 1);
  };
  removeDependant = () => {
    this.props.removeDependantItem(this.props.dependant.id);
  };
  render() {
    return (
      <div className="dependant_card">
        <div className="form_item">
          <div className="form_label">Name:</div>
          <input
            className="form_text_bar"
            type="text"
            placeholder="Name"
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
        </div>

        <div className="form_item">
          <div className="form_label">Age:</div>
          <input
            className="age_text_bar"
            type="number"
            placeholder="Age"
            value={this.state.age}
            onChange={this.onAgeChange}
          />
        </div>

        <div className="remove_dependant">
          <button
            type="button"
            onClick={this.removeDependant}
            className="remove_button"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default DependantFormItem;
