import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { API } from '../../config/api';
import clip from '../../assets/clip.png'
import Navibar from './navbar';

const style = {
    flex: {
        display: 'flex',
        width: '1157px',
    },
    title: {
        color: 'white',
        width: '1800px',
        height: '50px',
        left: '172px',
        top: '186px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    thumbnails: {
        width: '400px',
        height: '50px',
        left: '1116px',
        top: '186px',
        borderRadius: '5px',
    },
    input: {
        width: '1157px',
        height: '50px',
        left: '172px',
        top: '263px',
        marginBottom: '20px',
        borderRadius: '5px',
        backgroundColor: '#494949',
        color: 'white',
    },
    textarea: {
        width: '1157px',
        height: '70px',
        backgroundColor: '#494949',
        borderRadius: '5px',
        color: 'white',
    },
    button: {
        backgroundColor: '#cd2e71',
        borderRadius: '5px',
        color: 'white',
        marginTop: '15px',
        width: '213px',
        height: '40px',
        marginLeft: '950px'
    }
}

function AddFilm() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null); //For image preview

    const [form, setForm] = useState({
        title: "",
        category_id: 0,
        description: "",
        price: "",
        thumbnail: "",
        filmurl: "",
    });

    
    const getCategory = async () => {
        try {
            const response = await API.get('/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });
        // Create image url for preview
        // if (e.target.type === 'file') {
        //     let url = URL.createObjectURL(e.target.files[0]);
        //     setPreview(url);
        // }
    };

    
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData();
            formData.set('title', form.title);
            formData.set('category_id', form.category_id);
            formData.set('description', form.description);
            formData.set('price', form.price);
            formData.set('thumbnail', form.thumbnail[0], form.thumbnail[0].name);
            formData.set("filmurl", form.filmurl);

            //insert db  form.image[0].name
            const response = await API.post('/film', formData) //server bag
            console.log(response);
            navigate('/'); //path fe
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        getCategory();
    }, []);


    return (
        <>
            <Navibar />
            <div style={{ backgroundColor: 'black', height: '90vh' }}>
                <Container>
                    <form className='mx-auto'>
                        <h2 className="text-white fw-700">Add Film</h2>
                        <div style={style.flex}>
                            <input style={style.title}
                                type="text"
                                id="title" name="title"
                                placeholder="Name Film"
                                onChange={handleChange}
                                required
                            />
                            <input style={style.thumbnails}
                                type="file"
                                id="thumbnail" name="thumbnail"

                                placeholder="Attach Thumbnail"
                                onChange={handleChange}
                                required
                            />
                            {/* <label className="input mb-4 flex jc-between ai-center" htmlFor="photo-product">
                                <img src={clip} alt="" style={{ width: '25px' }} />
                            </label> */}
                        </div>
                        <input style={style.input}
                            type="text"
                            id="category_id" name="category_id"
                            placeholder="Category"
                            onChange={handleChange}
                            required
                        />
                        <input style={style.input}
                            type="number"
                            id="price" name="price"
                            placeholder="Price"
                            onChange={handleChange}
                            required
                        />
                        <input style={style.input}
                            type="text"
                            id="filmurl" name="filmurl"
                            placeholder="Link Film"
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            label="description"
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            style={style.textarea}
                            className="p-2 my-2 border-1 shadow-lg text-light"
                        ></textarea>
                        <div>
                            <Button style={style.button} variant='bg' onClick={(e) => handleSubmit.mutate(e)} >Add Film</Button>
                        </div>
                    </form>
                </Container>
            </div>
        </>
    )
}

export default AddFilm;