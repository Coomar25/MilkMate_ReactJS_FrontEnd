import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import AuthUser from '../AuthUser/AuthUser';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Order = () => {
    const { http, token, user } = AuthUser();
    const [suppyitem, setSupplyItem] = useState([]);

    //This is for ordering item
    const [productname, setProductName] = useState('');
    const [productprice, setProductPrice] = useState('');
    const [quantity, setProductquantity] = useState('');


    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);



    const handleChange = (event) => {
        setProductName(selectedItem.name);
        setProductPrice(selectedItem.price);
        const { name, value } = event.target;
        switch (name) {
            case 'quantity':
                setProductquantity(value);
                break;
            default:
                break;
        }
    }

    const handleOrder = () => {
        http.post(`/orderRecord?token=${token}`, {
            user_id: user.id,
            name: productname,
            price: productprice,
            quantity: quantity
        }).then((response) => {
            // console.log(response);
            alert(response.data.message);

        });
    }

    //fetch supplies item from server with image
    useEffect(() => {
        axios.get(`http://localhost:8000/api/fetchSuppyItem?token = ${token}`).then(response => {
            const parsedSuppyItem = response.data.supplyItem;
            const mergedData = parsedSuppyItem.map(supply => {
                return {
                    id: supply.id,
                    name: supply.name,
                    description: supply.description,
                    price: supply.price,
                    image: supply.image
                };
            });
            setSupplyItem(mergedData);
        }).catch(error => console.error(error));
    }, []);


    return (
        <div>
            <div className="orderCard">
                {suppyitem.map(supply => (
                    <div class="card">
                        <img class="card-img-top" src={"http://localhost:8000/images/" + supply.image} alt="Card image cap" />
                        <div class="card-body">
                            <h1>{supply.id}</h1>
                            <h5 class="card-title">{supply.name}</h5>
                            <p class="card-text">{supply.description}</p>
                            <p class="card-text"><h3>Price:- Nrs. {supply.price}</h3></p>
                            <button onClick={() => handleOpen(supply)} class="btn btn-primary">Order</button>

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <form action="">
                                        <TextField
                                            hidden
                                            className='mt-4'
                                            id="outlined-disabled"
                                            label="User_Id"
                                            defaultValue={user.id}
                                        />
                                        <img class="card-img-top" src={"http://localhost:8000/images/" + selectedItem.image} alt="Card image cap" />
                                        <TextField
                                            disabled
                                            className='mt-4'
                                            id="outlined-disabled"
                                            label="Product Name"
                                            defaultValue={selectedItem.name}
                                        />
                                        <TextField
                                            className='mt-4'
                                            disabled
                                            id="outlined-disabled"
                                            label="Product Pricce"
                                            defaultValue={"Nrs:- " + selectedItem.price}
                                        />
                                        <TextField
                                            className='mt-4'
                                            id="outlined-number"
                                            label="Enter Quantity"
                                            type="number"
                                            value={quantity}
                                            onChange={handleChange}
                                            name='quantity'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            className='mt-4'
                                            disabled
                                            id="outlined-disabled"
                                            label="Product Pricce"
                                            defaultValue={selectedItem.description}
                                        />
                                        <Stack className='mt-4' spacing={2} direction="row">
                                            <Button variant="contained" onClick={handleOrder} >Dairy Income</Button>
                                            <Button variant="outlined">Khalti</Button>
                                        </Stack>
                                    </form>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                ))}

            </div>
        </div >
    )
}

export default Order