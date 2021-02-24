import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Country.module.css';
import {update_country, set_country} from '../actions/country';


const Country = ({update_country, set_country}) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const res = await axios.get('/api/countries/');
            console.log(res)
            let pages = res.data.count;
            let all = []
            for (let i = 1; i < pages / 5 + 1; i++) {
                const res1 = await axios.get(`/api/countries/?page=${i}`)
                all.push(res1.data.results)
            }
            all = [].concat.apply([], all);
            setData(all);
            update_country(all);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    })

    return (
        <div style={{ color:'white'}}>

            <div className={styles.country_item} key={0} onClick={() => set_country(0)}>
                Countries
            </div>
            {
                data.map(con => {
                    return (
                        <div style={{
                            textAlign:"center",
                            fontFamily:"Bold",
                            padding:"1px"}}key={con.id} onClick={() => set_country(con.id)}>
                            {con.country_name}
                        </div>
                    )
                })
            }
        </div>
    )
}

Country.propTypes = {
    update_country: PropTypes.func.isRequired,
    set_country: PropTypes.func.isRequired
}
export default connect(null, {update_country, set_country})(Country);