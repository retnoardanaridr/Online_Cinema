import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../../config/api';
import image from '../../assets/Rectangle 3.png';


function ListFilm() {
    const navigate = useNavigate()

    //fetching product frm db
    let { data: films } = useQuery('filmsCache', async () => {
        const response = await API.get('/films');
        return response.data.data;
    });
    console.log(films)
    
    const goDetail = (id) => {
        navigate('/film' + id)
    }

    return (
        <>
            <section style={{ height: '100%', color: 'white', marginLeft: '100px', marginTop: '20px', backgroundColor: 'black' }}>
                <h2>List Film</h2>
                <ul className="row row-cols-5 d-flex flex-wrap">
                    {films?.map((data, id) => (
                        <div key={id} className="card col m-4" style={{ backgroundColor: 'black' }}>
                            <img className='w-100 h-100' src={data?.thumbnail} alt="" onClick={() => goDetail(data?.id)} />
                            <div className="mt-4">
                            </div>
                        </div>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default ListFilm;