import React, { useContext, useEffect, useState } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../contexts/userContext';
import Navibar from './navbar';
import Payment from './payment';
import image from '../../assets/Rectangle 3.png';
import background from '../../assets/Rectangle 2.png';

const style = {
    leftBag: {
        flex: "30%",
    },
    rightBag: {
        flex: "60%",
        color: 'white',
        textAlign: 'justify',
    },
    button: {
        width: '120px',
        height: '40px',
        backgroundColor: "#cd2e71",
    }
}

function DetailFilm() {
    const navigate = useNavigate()
    const [showPayment, setShowPayment] = useState();

    const { id } = useParams();

    // fetch product
    const { data: film } = useQuery('filmCache', async () => {
        const response = await API.get(`/film/${id}`)
        return response.data.data;
    });

    const handleBuy = useMutation(async () => {
        try {
            const data = {
                film_id: film.id,
                // user_id: user.id,
                price: film.price,
            };
            // console.log(data)
            // Create variabel for store token payment from response here ...
            const response = await API.post("/create-transaction", data);
            console.log(response)
            const token = response.data.data.token;
            
            console.log("response post transaction", response)
            console.log("ini tokennya", token)


            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error)
        }
    })

    // Create config Snap payment page with useEffect here ...
    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-viJBL-THAw0O311V";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <div style={{ backgroundColor: 'black', height: '100vh' }}>
            <Navibar />
            <Container>
                <div className='d-flex'>
                    <div style={style.leftBag}>
                        <img className='w-75 mt-5 mb-5' src={film?.thumbnail} alt="" />
                    </div>
                    <div style={style.rightBag}>
                        <div className='d-flex mb-3'>
                            <h3 style={{ fontFamily: 'Avenir' }} className='w-100'>{film?.title}</h3>
                            <Button onClick={() => handleBuy.mutate()} variant='bg' className='text-white flex-shrink-1 fw-bold' style={style.button} navigate={'/payment'}>Buy Now</Button>
                        </div>
                        <iframe width="560" 
                        height="315" 
                        src={film?.filmurl} 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                        </iframe>
                        {/* <iframe
                            width="700"
                            height="315"
                            src={background}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe> */}
                        <div className='mt-2'>
                            <h5>{film?.category.Name}</h5>
                            <p style={{ color: '#cd2e71', fontWeight: 'bold' }}>Rp. {film?.price}</p>
                        </div>
                        <p>
                            {film?.description}
                        </p>
                    </div>
                    {/* <Payment
                        show={showPayment}
                        setShow={setShowPayment} /> */}
                </div>
            </Container>
        </div>
    )
}

export default DetailFilm;