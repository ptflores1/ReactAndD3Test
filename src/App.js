import React, {Component} from 'react';
import './App.css';
import Circles from "./Circles";
import NewPointForm from "./NewPointForm";
// https://www.youtube.com/playlist?list=PL1J8Fh6-iQxLij9QZYqL1xcb-K0EYrr22
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            nextId: 6,
            points: [
                {
                    size: 10,
                    id: 0,
                },
                {
                    size: 4,
                    id: 1,
                }, {
                    size: 8,
                    id: 2,
                }, {
                    size: 16,
                    id: 3,
                }, {
                    size: 32,
                    id: 4,
                }, {
                    size: 21,
                    id: 5,
                }]
        }
        this.handleNewPoint = this.handleNewPoint.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
    handleFormChange(e) {
        this.setState({ value: +e.target.value });
    }
    handleNewPoint(e) {
        this.setState({
            points: [...this.state.points, { size: this.state.value, id: this.state.nextId }],
            nextId: this.state.nextId + 1,
            value: '',
        })
        e.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <Circles points={[...this.state.points]} />
                <NewPointForm value={this.state.value} handleChange={this.handleFormChange} handleSubmit={this.handleNewPoint}/>
            </div>
        );
    }
    
    
}

export default App;
