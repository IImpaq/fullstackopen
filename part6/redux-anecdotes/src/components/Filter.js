import React from "react";
import { connect } from "react-redux";
import { filterFor } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    props.filterFor(event.target.value);
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterFor
};

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter);
export default ConnectedFilter;
