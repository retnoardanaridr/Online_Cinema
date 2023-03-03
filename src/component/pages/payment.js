import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config/api';

const style = {
    button: {
        backgroundColor: '#cd2e71',
        borderRadius: '10px',
        marginTop: '50px'
    }
}

function Payment({ show, setShow, }) {
    let navigate = useNavigate();
    const { id } = useParams();

    //fetching data from db
    let { data: film } = useQuery("filmChaches", async () => {
        const response = await API.get('/film/' + id)
        console.log("berhasil ambil data", response.data.data)
        return response.data.data;
    })

    // let price = 0;
    // film?.map((element) => (
    //     price += element.price
    // ))

    // const form = {
    //     total: price,
    // }
    // console.log(price)

    const handleBuy = useMutation(async () => {
        try {
            const data = {
                filmId: film.id,
                price: film.price,
            }

            // Data body
            // const body = JSON.stringify(data);

            // // Configuration
            // const config = {
            //     method: "POST",
            //     headers: {
            //         Authorization: "Basic " + localStorage.token,
            //         "Content-type": "application/json",
            //     },
            //     body,
            // };

            // Create variabel for store token payment
            const response = await API.post('/transaction', data)
            console.log("SUCCESS", response.data.data);

            const token = response.data.token;
            console.log("response post transaction", response)
            console.log("ini tokennya", token)

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    navigate('/profile');
                },
                onPending: function (result) {
                    console.log(result);
                    navigate('/profile');
                },
                onError: function (result) {
                    console.log(result);
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment")
                },
            });
            await API.patch('/film')
        } catch (error) {
            console.log(error);
        }
    })

    // Create config Snap payment page
    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

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
        <Modal bg="black" show={show} onHide={() => setShow(false)} centered>
            <div style={{ backgroundColor: '#0d0d0d', color: 'white', padding: '50px', borderRadius: '10px' }}>
                <h5 style={{ textAlign: 'center' }}>CinemaOnline : 0981312323</h5>
                <h2 style={{ fontFamily: 'Avenir' }} className='mt-5'>{film?.title}</h2>
                <div className='d-flex'>
                    <h5>Total : {' '}</h5>
                    <h5 className='ms-2' style={{ color: '#cd2e71' }}>{film?.price}</h5>
                </div>
                <div className='d-grid gap-2 col-15 mx-auto'>
                    <Button style={style.button} className='btn btn-primary' onClick={() => handleBuy.mutate()}>Pay</Button>
                </div>
            </div>
        </Modal>
    )
}

export default Payment;