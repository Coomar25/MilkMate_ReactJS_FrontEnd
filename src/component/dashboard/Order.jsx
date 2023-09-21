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
import Loading from './Loading';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';


import Khalti from './khalti/Khalti';
import { createContext } from 'react';


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

// const AppState = createContext();


const Order = () => {
    const { http, token, user } = AuthUser();
    const [suppyitem, setSupplyItem] = useState([]);

    //For Loding Icon
    const [isLoading, setIsLoading] = useState(true);

    //This is for ordering item
    const [productname, setProductName] = useState('');
    const [productprice, setProductPrice] = useState('');
    const [quantity, setProductquantity] = useState('');


    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    // product description passing in model
    const [modelproductdescription, setModelproductdescription] = useState('');
    //search Query
    const [searchQuery, setSearchQuery] = useState('');




    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    }

    //for Model
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
        http.post(`http://localhost:8000/api/orderRecord?token=${token}`, {
            user_id: user.id,
            name: productname,
            price: productprice,
            quantity: quantity
        }).then((response) => {
            // console.log(response);
            alert(response.data.message);
            window.location.reload();

        });
    }


    //fetch supplies item from server with image
    useEffect(() => {
        axios.get(`http://localhost:8000/api/fetchSuppyItem?token = ${token}`).then(response => {
            const parsedSuppyItem = response.data.supplyItem;
            setIsLoading(false);
            // const mergedData = parsedSuppyItem.map(supply => {
            //     return {
            //         id: supply.id,
            //         name: supply.name,
            //         description: supply.description,
            //         price: supply.price,
            //         image: supply.image
            //     };
            // });
            setSupplyItem(parsedSuppyItem);
        }).catch(error => {
            setIsLoading(false);
            console.error(error);
        });
    }, []);


    // detail model
    const [openDetail, setOpenDetail] = React.useState(false);
    const handleOpenDetail = (supply) => {
        setModelproductdescription(supply);
        setOpenDetail(true);
    };
    const handleCloseDetail = () => {
        setOpenDetail(false);
    };


    if (isLoading) {
        return <div>
            <Loading />
        </div>;

    }


    return (
        <div>
            {/* <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by category or product name"
            /> */}

            {/* Search Input Tag Material Ui */}
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="search-autocomplete"
                    disableClearable
                    options={suppyitem.map((supply) => supply.category + " " + supply.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search by category or product name"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Stack>

            <div className="orderCard">
                {suppyitem && suppyitem
                    .filter((supply) =>
                        supply.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        supply.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(supply => (
                        <div class="card">
                            <img class="card-img-top" src={"http://localhost:8000/images/" + supply.image} alt="Card image cap" />
                            <div class="card-body">
                                {/* <h1>{supply.id}</h1> */}
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
                                            </Stack>
                                        </form>
                                        <Khalti className="mt-4" productid={selectedItem.id}  name={selectedItem.name} quantity={selectedItem.quantity} price={selectedItem.price}/>
                                    </Box>
                                </Modal>


                                {/* // =========================================================================================================================== */}
                                {/* // =======================================================Detail Model Opening================================================== */}
                                {/* // =========================================================================================================================== */}

                                <Button className='ml-2 mt-2' variant="outlined" onClick={() => handleOpenDetail(supply)}>View Details</Button>
                                <Modal
                                    open={openDetail}
                                    onClose={handleCloseDetail}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <div class="blog-card spring-fever">
                                                <div class="title-content" >
                                                    <h3>BATCH:-{modelproductdescription.batch}</h3>
                                                    <hr />
                                                    <div class="intro">Category:- {modelproductdescription.category}</div>
                                                    <div class="intro">Company Name:- {modelproductdescription.companyname}</div>
                                                </div>
                                                <div class="card-info">
                                                    Quantity:-{modelproductdescription.quantity}
                                                </div>
                                                <div class="utility-info">
                                                    <ul class="utility-list">
                                                        <li class="comments">Expiry Date</li>
                                                        <li class="date">{modelproductdescription.expirydate} Days</li>
                                                    </ul>
                                                </div>
                                                <div class="gradient-overlay"></div>
                                                <div class="color-overlay"></div>
                                            </div>
                                        </Typography>
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
// export { AppState }