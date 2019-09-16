import React from 'react';

let NewPointForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                Size:
                <input type="number" value={props.value} onChange={props.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
export default NewPointForm;