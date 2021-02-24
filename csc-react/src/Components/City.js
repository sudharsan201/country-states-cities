import React, {useState, Fragment, useEffect} from 'react';
import {
    MDBCard, MDBCardText, MDBBtn, MDBCardTitle, MDBIcon, MDBInput, MDBRow, MDBCol
} from 'mdbreact';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './City.module.css';
import Pagination from './Pagination';

const Cities = ({state_id, state_list}) => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => {
        setAddToggle(!addToggle)
    };

    const [totalCity, setTotalCity] = useState([]);
    const [cities, setCities] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get('/api/cities/');
                if (state_id === 0) {
                    setCities(res.data.results);
                    setCount(res.data.count);
                    setPages(res.data.count)
                } else {

                    let all = []
                    for (let i = 1; i < (pages / 5 + 1); i++) {
                        const res = await axios.get(`/api/cities/?page=${i}`)
                        all.push(res.data.results)
                    }
                    all = [].concat.apply([], all);
                    let filtered_city = all.filter(function (el) {
                        return el.state === state_id
                    })
                    setCities(filtered_city);
                    setTotalCity(all);
                    setCount(filtered_city.length);
                }
                setPrevious(res.data.previous);
                setNext(res.data.next);
            } catch (err) {
            }
        }
        fetchData();
    }, [state_id])
    const previous_number = () => {
        axios.get(previous)
            .then(res => {
                setCities(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (previous)
                    setActive(active - 1);
            })
            .catch(err => {

            })
    };
    const next_number = () => {
        axios.get(next)
            .then(res => {
                setCities(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (next)
                    setActive(active + 1);
            })
            .catch(err => {

            })
    }
    const visitPage = (page) => {
        axios.get(`/api/cities/?page=${page}`)
            .then(res => {
                setCities(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setActive(page);
            })
            .catch(err => {
            });
    };

    const [formData, setFormData] = useState({
        city_name: '',
        state: '',
    })
    const {city_name, state} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const onSave = async (e) => {
        e.preventDefault();
        if (city_name === "" | state === null) {
            alert("Field cant be empty")
        }
        const body = {
            city_name, state
        }
        const res = await axios.post('/api/cities/', body);
        setAddToggle(false);
        const res1 = await axios.get('/api/cities/');
        setCities(res1.data.results);
        setCount(res1.data.count);
    }

    const onRemove = async (id) => {
        alert(`Are you sure to remove City ${id}?`);
        const res = await axios.delete(`/api/cities/${id}`);
        const res1 = await axios.get('/api/cities/');
        setCities(res1.data.results);
        setCount(res1.data.count);
    }

    const [editToggle, setEditToggle] = useState(-1);
    const [updateFormData, setUpdateFormData] = useState({
        update_city_name: "",
        update_state: "",
    })
    const {update_city_name, update_state} = updateFormData;

    const [currentPage, setCurrentPage] = useState(0);
    const editClick = (id) => {
        setEditToggle(id);
        let edit_city = cities.filter(function (el) {
            return el.id === id
        })[0];
        setUpdateFormData({
            update_city_name: edit_city.city_name,
            update_state: edit_city.state,
        })
    };

    const onUpdateChange = (e) => setUpdateFormData({
        ...updateFormData,
        [e.target.name]: e.target.value
    })
    const onUpdate = async (e) => {
        e.preventDefault();
        const body = {
            "city_name": update_city_name,
            "state": update_state
        }
        const res = await axios.put(`/api/cities/${editToggle}`, body);

        setEditToggle(false);
        const res1 = await axios.get(`/api/cities/?page=${currentPage}`);
        setCities(res1.data.results);
        setCount(res1.data.count);
    }

    return (
        <div>
            <MDBBtn> Cities</MDBBtn>
            <MDBBtn onClick={addClick}><MDBIcon icon="plus-circle"/> Add New City </MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="City Name" name="city_name" value={city_name} outline
                                  onChange={e => onChange(e)}
                        />
                        <select className="browser-default custom-select" name="state" value={state}
                                onChange={e => onChange(e)}>
                            <option>State</option>
                            {
                                state_list.map(state => {
                                    return (
                                        <option value={`${state.id}`}>{state.state_name}</option>
                                    )
                                })
                            }
                        </select>
                        <MDBRow className={styles.add_row}>
                            <MDBBtn color="mdb-color" className={styles.edit_btn} onClick={onSave}><MDBIcon far
                                                                                                         icon="save"/> Save</MDBBtn>
                            <MDBBtn color="lime" className={styles.edit_btn}
                                    onClick={() => setAddToggle(false)}><MDBIcon icon="undo"/> Cancel</MDBBtn>
                        </MDBRow>
                    </form>
                    :
                    null
            }
            <Pagination
                itemsPerPage={5}
                count={count}
                visitPage={visitPage}
                previous={previous_number}
                next={next_number}
                active={active}
                setActive={setActive}
            />
            {
                cities !== null ?
                    cities.map((city) => {
                        return (
                            <div>
                                {
                                    city.id !== editToggle ?
                                        <MDBCard key={city.id} className={styles.card_item}>
                                            <MDBCardTitle>{city.city_name}
                                            </MDBCardTitle>
                                            <MDBCardText>
                                                <MDBRow>
                                                    <MDBCol>
                                                        {city.state}
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <Fragment className={styles.btngroup}>
                                                            <MDBBtn color="danger" className={styles.edit_btn}
                                                                    onClick={() => onRemove(city.id)}>Remove</MDBBtn>
                                                            <MDBBtn color="cyan" className={styles.edit_btn}
                                                                    onClick={() => editClick(city.id)}>Edit</MDBBtn>
                                                        </Fragment>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardText>
                                        </MDBCard>
                                        :
                                        <form>
                                            <MDBInput label="City Name" outline value={update_city_name}
                                                      name="update_city_name" onChange={onUpdateChange}/>

                                            <select className="browser-default custom-select" value={update_state}
                                                    name="update_state" onChange={onUpdateChange}>
                                                <option>State</option>
                                                {
                                                    state_list.map(state => {
                                                        return (
                                                            <option
                                                                value={`${state.id}`}>{state.state_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            <MDBRow className={styles.add_row}>
                                                <MDBBtn color="cyan" className={styles.edit_btn}
                                                        onClick={onUpdate}><MDBIcon far icon="save"/> Update</MDBBtn>
                                                <MDBBtn color="danger" className={styles.edit_btn}
                                                        onClick={() => setEditToggle(0)}><MDBIcon
                                                    icon="undo"/> Cancel</MDBBtn>
                                            </MDBRow>
                                        </form>
                                }
                            </div>
                        )
                    })
                    :
                    ""
            }
        </div>
    )
}
Cities.propTypes = {
    state_id: PropTypes.number.isRequired,
    state_list: PropTypes.array.isRequired,

}
const mapStateToProps = (city) => {
    return {
        state_id: city.state.state_id,
        state_list: city.state.state_list
    }
}

export default connect(mapStateToProps, null)(Cities);