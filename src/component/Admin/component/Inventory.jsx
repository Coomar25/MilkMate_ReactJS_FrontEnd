import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser/AuthUser';
import AdminLoadingSection from './AdminLoadingSection'


//material ui 
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


//Bootstrap Modal


//model styling
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Inventory = () => {
    const { token } = AuthUser();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [batch, setBatch] = useState('');
    const [category, setCategory] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expirydate, setExpiryDate] = useState('');
    const [supplyid, setSupplyid] = useState('');
    const [editSuppyId, setEditSupplyId] = useState('');
    // Product Description
    const [productdescription, setProductDescription] = useState('');
    // product description passing in model
    const [modelproductdescription, setModelproductdescription] = useState('');


    //fOR lOADING
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        setIsLoading(true); // Set isLoading to true before making the request
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('batch', batch);
        formData.append('category', category);
        formData.append('companyname', companyname);
        formData.append('expirydate', expirydate);
        formData.append('quantity', quantity);

        axios.post(`http://localhost:8000/api/supplyItem?token=${token}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            alert('Product Has Been Added To Inventory');
            setBatch('');
            setCategory('');
            setCompanyName('');
            setExpiryDate('');
            setQuantity('')
            setName('');
            setPrice('');
            setDescription('');
            setImage('');
            window.location.reload();
            navigate('/inventory');
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false); // Set isLoading to false after the request is completed
        });
    }


    // =================================================================================================================================================================

    //edit section
    const handleEditSubmit = (event) => {
        // setIsLoading(true); // Set isLoading to true before making the request

        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('batch', batch);
        formData.append('category', category);
        formData.append('companyname', companyname);
        formData.append('expirydate', expirydate);
        formData.append('quantity', quantity);
        console.log(supplyid);
        axios.post(`http://localhost:8000/api/updateInventory/${editSuppyId}?token=${token}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            alert('Product Has Been Updated Successfully');
            setBatch('');
            setCategory('');
            setCompanyName('');
            setExpiryDate('');
            setQuantity('')
            setName('');
            setPrice('');
            setDescription('');
            setImage('');
            window.location.reload();
            navigate('/inventory');
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false); // Set isLoading to false after the request is completed
        });
    }


    // =================================================================================================================================================================


    const [suppyitem, setSupplyItem] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/fetchSuppyItem').then(response => {
            const parsedSuppyItem = response.data.supplyItem;
            const parsedProductDescription = response.data.productdescription;
            // console.log(parsedSuppyItem);
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
            setProductDescription(parsedProductDescription);
        }).catch(error => console.error(error));
    }, []);

    // ============================================================================Delete Action======================================================================
    const handleDelete = (id) => {
        console.log(id);
        axios.post(`http://localhost:8000/api/deleteInventory/${id}`).then((response) => {
            // console.log(response);
            alert("Product has been deleted form inventory");
            window.location.reload();
            navigate('/inventory');
        }).catch((error) => {
            alert(error);
        });
    }

    // =============================================================Model Opening=============================================================================================


    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
        console.log(id);
        setEditSupplyId(id);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    // detail model
    const [openDetail, setOpenDetail] = React.useState(false);
    const handleOpenDetail = (description) => {
        setModelproductdescription(description);
        setOpenDetail(true);
    };
    const handleCloseDetail = () => {
        setOpenDetail(false);
    };
    // =============================================================Loading Section=============================================================================================

    //Loading Section
    if (isLoading) {
        return <AdminLoadingSection />
    }

    // ===============================================================Component Rendering===================================================================================

    return (
        <div>
            <div className='inventory mt-4'>
                <form onSubmit={handleSubmit} className="row g-3 mt-4">
                    <div className="col-md-6">
                        <label className="form-label"> Batch</label>
                        <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label"> Company Name</label>
                        <input type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Expiry Date</label>
                        <input type="number" value={expirydate} onChange={(e) => setExpiryDate(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"> Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control " required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div class="mb-12">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" onChange={(e) => setImage(e.target.files[0])} id="inputGroupFile02" />
                        <label class="input-group-text" for="inputGroupFile02">Upload</label>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>

            {/* // =========================================================================================================================== */}
            {/* // =======================================================Card Displaying======================================================= */}
            {/* // =========================================================================================================================== */}


            <div className="adminorderCard">
                {suppyitem && suppyitem.map(supply => (
                    <div class="admincard p-4">
                        <img class="admincard-img-top" src={"http://localhost:8000/images/" + supply.image} alt="Card image cap" />
                        <div class="admincard-body">
                            {/* <h5 class="admincard-title mt-4">{supply.id}</h5> */}
                            <h5 class="admincard-title mt-4">{supply.name}</h5>
                            <p class="admincard-title">Nrs. {supply.price}</p>
                            <p class="admincard-text">{supply.description}</p>
                            <p class="admincard-text">{supply.batch}</p>

                            <div className="btnEditDelete">
                                {/* <button class="btn btn-danger" onClick={(supply) => handleDelete(supply.id)} >Delete </button> */}
                                <button className="btn btn-danger" onClick={() => handleDelete(supply.id)}>Delete</button>


                                {/* // =========================================================================================================================== */}
                                {/* // =======================================================Detail Model Opening================================================== */}
                                {/* // =========================================================================================================================== */}
                                <Button className="btn btn-primary" onClick={() => handleOpenDetail(supply)}>View Details</Button>

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



                                {/* // =========================================================================================================================== */}
                                {/* // =======================================================Model Opening======================================================= */}
                                {/* // =========================================================================================================================== */}

                                <Button className='btn btn-primary' onClick={() => { handleOpen(supply.id) }}>Edit</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <form onSubmit={handleEditSubmit} className="row g-3 mt-4">

                                                <div className="col-md-6">
                                                    <label className="form-label"> Batch</label>
                                                    <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} className="form-control " required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Category</label>
                                                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control " required />

                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label"> Company Name</label>
                                                    <input type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)} className="form-control " required />

                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Quantity</label>
                                                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control " required />

                                                </div>
                                                <div className="col-md-12">
                                                    <label className="form-label">Expiry Date</label>
                                                    <input type="number" value={expirydate} onChange={(e) => setExpiryDate(e.target.value)} className="form-control " required />

                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label"> Name</label>
                                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control " required />

                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Price</label>
                                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control " required />

                                                </div>
                                                <div class="mb-12">
                                                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                                    <textarea class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                                                </div>
                                                <div class="input-group mb-3">
                                                    <input type="file" class="form-control" onChange={(e) => setImage(e.target.files[0])} id="inputGroupFile02" />
                                                    <label class="input-group-text" for="inputGroupFile02">Upload</label>
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-primary" onClick={() => setSupplyid(supply.id)} type="submit">Update</button>
                                                </div>
                                            </form>
                                        </Typography>
                                    </Box>
                                </Modal>


                                {/* // =========================================================================================================================== */}
                                {/* // =======================================================Model Closing======================================================= */}
                                {/* // =========================================================================================================================== */}


                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}
export default Inventory;
