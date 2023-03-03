import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Navibar from './navbar';
import { API } from '../../config/api';
import clip from '../../assets/clip.png'
import { Container, Button } from 'react-bootstrap';
import DeleteData from './modalDel';


function Category() {
    const navigate = useNavigate()
    // var delete
    const [idDelete, setIdDelete] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    //modal confirm delete
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [form, setForm] = useState({
        name: '',
    });

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
    });
    console.log(categories)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            //insert db
            const response = await API.post('/category', form)
            console.log(response);
            // navigate('/category');
            refetch();
        } catch (error) {
            console.log(error);
        }
    })

    // get id category yang mau dihapus
    const handleDelete = (id)  => {
        setIdDelete(id);
        handleShow();
        console.log(id)
    }
    


    //confirm delete 
    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/category/${id}`);
            refetch()
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
            //close modal delete
            handleClose();
            //execute delete
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete])

    return (
        <>
            <Navibar />
            <div style={{ backgroundColor: 'black', height: '100%' }}>
                <Container>
                <section className="pt-3 flex jc-between ai-start">
                        <form className="w-50"
                        >
                            <h2 className="text-light mb-3 txt-red fw-700">Category</h2>
                            <input className="modal-input mb-1 text-light br-5"
                                type="text"
                                id="title" name="name"
                                placeholder="Category"
                                onChange={handleChange}
                                required
                            />
                            <div className="flex jc-center">
                                <button className="btn btn-danger mt-4" onClick={(e) => handleSubmit.mutate(e)}>Add Category</button>
                            </div>
                        </form>
                    </section>
                    <div className='list-category mt-5'>
                        <h4 className='text-light'>List Category</h4>
                        <div>
                            <table className="w-100 table table-dark table-bordered mt-5 ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                {categories?.map((data, id) => (
                                    <tbody className="table-group-divider">
                                        <tr key={id}>
                                            <td>{data?.id}</td>
                                            <td>{data?.Name}</td>
                                            <div>
                                                <Button onClick={() => {handleDelete(data?.id)}} variant="danger" size="sm" className='w-25'>
                                                    Delete
                                                </Button>
                                            </div>
                                        </tr>

                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </Container>
                <DeleteData 
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
                />
            </div>
        </>
    )
}

export default Category;