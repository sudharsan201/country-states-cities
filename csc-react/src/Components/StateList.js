import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Country.module.css';
import {update_state, set_state} from '../actions/state';


const State = ({update_state, set_state}) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            let res = await axios.get('/api/states/');
            console.log(res)
            let pages = res.data.count;
            let all = []
            for (let i = 1; i < pages / 5 + 1; i++) {
                const res1 = await axios.get(`/api/states/?page=${i}`)
                all.push(res1.data.results)
            }
            all = [].concat.apply([], all);
            setData(all);
            update_state(all);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData().then(r =>
            console.log(r))
    })

    return (
        <div style={{ color:'white'}}>

            <div className={styles.country_item} key={0} onClick={() => set_state(0)}>
                States
            </div>
            {
                data.map(con => {
                    return (
                        <div style={{
                            textAlign:"center",
                            fontFamily:"Bold",
                            padding:"1px"}} key={con.id} onClick={() => set_state(con.id)}>
                            {con.state_name}
                        </div>
                    )
                })
            }
        </div>
    )
}

State.propTypes = {
    update_state: PropTypes.func.isRequired,
    set_state: PropTypes.func.isRequired
}
export default connect(null, {update_state, set_state})(State);