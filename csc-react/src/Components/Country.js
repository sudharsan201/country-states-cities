import React, {useState, Fragment, useEffect} from 'react';
import {
    MDBCard, MDBCardText, MDBBtn, MDBCardTitle, MDBIcon, MDBInput, MDBRow, MDBCol
} from 'mdbreact';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './State.module.css';
import Pagination from './Pagination';

const Countries = ({country_id,country_list}) => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => {
        setAddToggle(!addToggle)
    };

    const [totalState, setTotalState] = useState([]);
    const [countries, setCountries] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get('/api/countries/');
                if (country_id === 0) {
                    setCountries(res.data.results);
                    setCount(res.data.count);
                    setPages(res.data.count)
                } else
                    {

                    let all = []
                    for (let i = 1; i < (pages / 5 + 1); i++) {
                        const res = await axios.get(`/api/countries/?page=${i}`)
                        all.push(res.data.results)
                    }
                    all = [].concat.apply([], all);
                    let filtered_state = all.filter(function (el) {
                        return el.countries === country_id
                    })
                    setCountries(filtered_state);
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
                setCountries(res.data.results);
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
                setCountries(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (next)
                    setActive(active + 1);
            })
            .catch(err => {

            })
    }
    const visitPage = (page) => {
        axios.get(`/api/countries/?page=${page}`)
            .then(res => {
                setCountries(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setActive(page);
            })
            .catch(err => {
            });
    };

    const [formData, setFormData] = useState({
        country_name: '',
    })
    const {country_name} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const onSave = async (e) => {
        e.preventDefault();
        if (country_name === "") {
            alert("Field cant be empty")
        }
        const body = {
            country_name
        }
        const res = await axios.post('/api/countries/', body);
        setAddToggle(false);
        const res1 = await axios.get('/api/countries/');
        setCountries(res1.data.results);
        setCount(res1.data.count);
    }

    const onRemove = async (id) => {
        alert(`Are you sure to remove State ${id}?`);
        const res = await axios.delete(`/api/countries/${id}`);
        const res1 = await axios.get('/api/countires/');
        setCountries(res1.data.results);
        setCount(res1.data.count);
    }

    const [editToggle, setEditToggle] = useState(-1);
    const [updateFormData, setUpdateFormData] = useState({
        update_country_name: "",
    })
    const {update_country_name} = updateFormData;

    const [currentPage, setCurrentPage] = useState(0);
    const editClick = (id) => {
        setEditToggle(id);
        let edit_country = countries.filter(function (el) {
            return el.id === id
        })[0];
        setUpdateFormData({
            update_country_name: edit_country.country_name,
        })
    };

    const onUpdateChange = (e) => setUpdateFormData({
        ...updateFormData,
        [e.target.name]: e.target.value
    })
    const onUpdate = async (e) => {
        e.preventDefault();
        const body = {
            "country_name": update_country_name
        }
        const res = await axios.put(`/api/countries/${editToggle}`, body);

        setEditToggle(false);
        const res1 = await axios.get(`/api/countries/?page=${currentPage}`);
        setCountries(res1.data.results);
        setCount(res1.data.count);
    }


    return (
        <div>
            <MDBBtn> Countries</MDBBtn>

            <MDBBtn onClick={addClick}><MDBIcon icon="plus-circle"/> Add New Country</MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="Country Name" name="country_name" value={country_name} outline
                                  onChange={e => onChange(e)}
                        />

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
                countries !== null ?
                    countries.map((state) => {
                        return (
                            <div>
                                {
                                    state.id !== editToggle ?
                                        <MDBCard key={state.id} className={styles.card_item}>
                                            <MDBCardTitle>{state.country_name}
                                            </MDBCardTitle>
                                            <MDBCardText>
                                                <MDBRow>

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
                                            <MDBInput label="Country Name" outline value={update_country_name}
                                                      name="update_country_name" onChange={onUpdateChange}/>


                                            <MDBRow className={styles.addrow}>
                                                <MDBBtn color="warning" className={styles.editbtn}
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
Countries.propTypes = {
    country_id: PropTypes.number.isRequired,
    country_list: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => {
    return {
        country_id: state.country.country_id,
        country_list: state.country.country_list
    }
}

export default connect(mapStateToProps, null)(Countries);