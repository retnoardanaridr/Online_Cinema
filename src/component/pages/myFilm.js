import React from 'react';
import { Container } from 'react-bootstrap';
import Navibar from './navbar';
import buy from '../../assets/Rectangle 6.png';
import { useQueries, useQuery } from 'react-query';
import { API } from '../../config/api';
import { useParams } from 'react-router-dom';


function MyFilm() {

    

    return (
        <>
            <Navibar />
            <div style={{ backgroundColor: 'black', height: '90vh' }}>
                <Container>
                    <h2 className='text-light'>My List Film</h2>
                    <div>
                        <img src={buy} alt='' />
                    </div>
                </Container>
            </div>
        </>
    )
}

export default MyFilm;