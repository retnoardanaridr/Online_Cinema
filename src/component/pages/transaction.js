import React, { useContext, useState } from 'react';
import { Container, Table,  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../contexts/userContext';
import Navibar from './navbar';

function Transaction() {
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);
    const [state, dispacth] = useContext(UserContext)

    // const getTransaction = async () => {
    //     try {
    //         const response = await API.get(`/transactions`);
    //         setTransaction(response.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <>
            <Navibar />
            <div style={{backgroundColor: 'black', height: '90vh'}}>
                <Container className="tableContainer">
                    <h1 className='text-light'>Income Transaction</h1>
                    <div>
                        <Table hover className='text-light'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Users</th>
                                    <th>Bukti Transfer</th>
                                    <th>Film</th>
                                    <th>Number Account</th>
                                    <th>Status</th>
                                    {/* dropdown baru belum disetting*/}
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {transaction?.map((item, index) => (
                                    <tr
                                        // onClick={() => handleShow(item?.id)}
                                        key={index}
                                        className={item.status === "" ? "dnone" : ""}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{item?.user.name}</td>
                                        <td>{item?.user.profile?.address}</td>
                                        <td>{item?.user.profile?.postal_code}</td>
                                        <td className="tablePrice">Rp. 2000000</td>
                                        <td
                                            className={
                                                item?.status === "Success"
                                                    ? "tableSuccess"
                                                    : item?.status === "Cancel"
                                                        ? "tableCancel"
                                                        : item?.status === "pending"
                                                            ? "tableWaiting"
                                                            : "tableOtw"
                                            }
                                        >
                                            {item?.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    {/* <ModalTransaction
                        showTrans={showTrans}
                        close={handleClose}
                        id={idOrder}
                    /> */}
                </Container>
            </div>
        </>
    )
}

export default Transaction;