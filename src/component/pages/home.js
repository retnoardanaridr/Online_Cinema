import React from 'react';
import Navibar from './navbar';
import background from '../../assets/Rectangle 2.png';
import ListFilm from './listFilm';
import AddProduct from './add-film';


function Home () {
    return (
        <div style={{backgroundColor: 'black', height: '100%'}}>
            <Navibar />
            <div>
                <section>
                    <div style={{ width: '990px', height: '437px', left: '179px', top: '149px', margin: 'auto' }}>
                        <img src={background} alt="" />
                    </div>
                </section>
            </div>
            <ListFilm />
        </div>
    )
}

export default Home;