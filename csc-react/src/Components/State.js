import React, {useState, Fragment, useEffect} from 'react';
import {
    MDBCard, MDBCardText, MDBBtn, MDBCardTitle, MDBIcon, MDBInput, MDBRow, MDBCol
} from 'mdbreact';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './State.module.css';
import Pagination from './Pagination';

const States = ({country_id, country_list}) => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => {
        setAddToggle(!addToggle)
    };

    const [totalState, setTotalState] = useState([]);
    const [states, setStates] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get('/api/states/');
                if (country_id === 0) {
                    setStates(res.data.results);
                    setCount(res.data.count);
                    setPages(res.data.count)
                } else {

                    let all = []
                    for (let i = 1; i < (pages / 5 + 1); i++) {
                        const res = await axios.get(`/api/states/?page=${i}`)
                        all.push(res.data.results)
                    }
                    all = [].concat.apply([], all);
                    let filtered_state = all.filter(function (el) {
                        return el.country === country_id
                    })
                    setStates(filtered_state);
                    setTotalState(all);
                    setCount(filtered_state.length);
                }
                setPrevious(res.data.previous);
                setNext(res.data.next);
            } catch (err) {
            }
        }
        fetchData();
    }, [country_id])
    const previous_number = () => {
        axios.get(previous)
            .then(res => {
                setStates(res.data.results);
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
                setStates(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (next)
                    setActive(active + 1);
            })
            .catch(err => {

            })
    }
    const visitPage = (page) => {
        axios.get(`/api/states/?page=${page}`)
            .then(res => {
                setStates(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setActive(page);
            })
            .catch(err => {
            });
    };

    const [formData, setFormData] = useState({
        state_name: '',
        country: '',
    })
    const {state_name, country} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const onSave = async (e) => {
        e.preventDefault();
        if (state_name === "" | country === null) {
            alert("Field cant be empty")
        }
        const body = {
            state_name, country
        }
        const res = await axios.post('/api/states/', body);
        setAddToggle(false);
        const res1 = await axios.get('/api/states/');
        setStates(res1.data.results);
        setCount(res1.data.count);
    }

    const onRemove = async (id) => {
        alert(`Are you sure to remove State ${id}?`);
        const res = await axios.delete(`/api/states/${id}`);
        const res1 = await axios.get('/api/states/');
        setStates(res1.data.results);
        setCount(res1.data.count);
    }

    const [editToggle, setEditToggle] = useState(-1);
    const [updateFormData, setUpdateFormData] = useState({
        update_state_name: "",
        update_country: "",
    })
    const {update_state_name, update_country} = updateFormData;

    const [currentPage, setCurrentPage] = useState(0);
    const editClick = (id) => {
        setEditToggle(id);
        let edit_state = states.filter(function (el) {
            return el.id === id
        })[0];
        setUpdateFormData({
            update_state_name: edit_state.state_name,
            update_country: edit_state.country,
        })
    };

    const onUpdateChange = (e) => setUpdateFormData({
        ...updateFormData,
        [e.target.name]: e.target.value
    })
    const onUpdate = async (e) => {
        e.preventDefault();
        const body = {
            "state_name": update_state_name,
            "country": update_country
        }
        const res = await axios.put(`/api/states/${editToggle}`, body);

        setEditToggle(false);
        const res1 = await axios.get(`/api/states/?page=${currentPage}`);
        setStates(res1.data.results);
        setCount(res1.data.count);
    }


    return (
        <div>
            <MDBBtn> States</MDBBtn>
            <MDBBtn onClick={addClick}><MDBIcon icon="plus-circle"/> Add New State </MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="State Name" name="state_name" value={state_name} outline
                                  onChange={e => onChange(e)}
                        />
                        <select className="browser-default custom-select" name="country" value={country}
                                onChange={e => onChange(e)}>
                            <option>Country</option>
                            {
                                country_list.map(country => {
                                    return (
                                        <option value={`${country.id}`}>{country.country_name}</option>
                                    )
                                })
                            }
                        </select>
                        <MDBRow className={styles.addrow}>
                            <MDBBtn color="mdb-color" className={styles.editbtn} onClick={onSave}><MDBIcon far
                                                                                                           icon="save"/> Save</MDBBtn>
                            <MDBBtn color="lime" className={styles.editbtn}
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
                states !== null ?
                    states.map((state) => {
                        return (
                            <div>
                                {
                                    state.id !== editToggle ?
                                        <MDBCard key={state.id} className={styles.card_item}>
                                            <MDBCardTitle>{state.state_name}
                                            </MDBCardTitle>
                                            <MDBCardText>
                                                <MDBRow>
                                                    <MDBCol>
                                                        {state.country}
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <Fragment className={styles.btngroup}>
                                                            <MDBBtn color="danger" className={styles.editbtn}
                                                                    onClick={() => onRemove(state.id)}>Remove</MDBBtn>
                                                            <MDBBtn color="cyan" className={styles.editbtn}
                                                                    onClick={() => editClick(state.id)}>Edit</MDBBtn>
                                                        </Fragment>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardText>
                                        </MDBCard>
                                        :
                                        <form>
                                            <MDBInput label="State Name" outline value={update_state_name}
                                                      name="update_state_name" onChange={onUpdateChange}/>

                                            <select className="browser-default custom-select" value={update_country}
                                                    name="update_country" onChange={onUpdateChange}>
                                                <option>Country</option>
                                                {
                                                    country_list.map(country => {
                                                        return (
                                                            <option
                                                                value={`${country.id}`}>{country.country_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            <MDBRow className={styles.addrow}>
                                                <MDBBtn color="cyan" className={styles.editbtn}
                                                        onClick={onUpdate}><MDBIcon far icon="save"/> Update</MDBBtn>
                                                <MDBBtn color="danger" className={styles.editbtn}
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
States.propTypes = {
    country_id: PropTypes.number.isRequired,
    country_list: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => {
    return {
        country_id: state.country.country_id,
        country_list: state.country.country_list
    }
}

export default connect(mapStateToProps, null)(States);