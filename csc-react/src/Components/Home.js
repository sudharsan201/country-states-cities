import React, {Component} from 'react'
import axios from 'axios';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            StateId: '',
            CountryId: '',
            CountryData: [],
            StateData: [],
            CityData: []
        }
    }

    componentDidMount() {
        axios.get('/api/countries/').then(response => {
            console.log(response.data);
            this.setState({
                CountryData: response.data.results
            });
        });
    }

    ChangeState = (e) => {
        this.setState({CountryId: e.target.value});
        axios.get(`/api/states/?country=${e.target.value}`).then(response => {
            console.log(response.data);
            this.setState({
                StateData: response.data.results,
            });
        });
    }
    ChangeCity = (e) => {
        this.setState({StateId: e.target.value});
        axios.get(`http://localhost:8000/api/cities/?state=${e.target.value}`).then(response => {
            console.log(response.data);
            this.setState({
                CityData: response.data.results
            });
        });

    }

    render() {
        return (
            <div style={{
                justifyContent: "center",
                alignItems: "center",
                position: 'absolute', left: '20%', top: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white'
            }}>

                    <select className="form-control" name="country" value={this.state.CountryId}
                            onChange={this.ChangeState}>
                        <option>Select Country</option>
                        {this.state.CountryData.map((e, key) => {
                            return <option key={key} value={e.id}>{e.country_name}</option>;
                        })}
                    </select>
                <br/>
                    <select className="form-control slct" name="state" value={this.state.StateId}
                            onChange={this.ChangeCity}>
                        <option>Select State</option>
                        {this.state.StateData.map((e, key) => {
                            return <option key={key} value={e.id}>{e.state_name}</option>;
                        })}
                    </select>
                <br/>
                    <ul>Cites:
                        {this.state.CityData.map((e) => {
                            return <li>{e.city_name}</li>;
                        })}
                    </ul>

            </div>

        )
    }

}

export default Home;