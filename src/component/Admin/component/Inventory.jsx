import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser/AuthUser';

const Inventory = () => {
    const { token } = AuthUser();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);

        axios.post(`http://localhost:8000/api/supplyItem?token=${token}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            alert('Product Has Been Added To Inventory');
            setName('');
            setPrice('');
            setDescription('');
            setImage('');
            window.location.reload();
            navigate('/inventory');
        }).catch(error => {
            console.log(error);
        });
    }

    const [suppyitem, setSupplyItem] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/fetchSuppyItem').then(response => {
            const parsedSuppyItem = response.data.supplyItem;
            console.log(parsedSuppyItem);
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


    const handleDelete = (id) => {
        console.log(id);
        axios.post(`http://localhost:8000/api/deleteInventory/${id}`).then((response) => {
            console.log(response);
            alert("Product has been deleted form inventory");
            window.location.reload();
            navigate('/inventory');
        }).catch((error) => {
            alert(error);
        });
    }

    return (
        <div>
            <div className='inventory'>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label"> Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control is-valid" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control is-valid" required />
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


            <div className="adminorderCard">
                {suppyitem && suppyitem.map(supply => (
                    <div class="admincard p-4">
                        <img class="admincard-img-top" src={"http://localhost:8000/images/" + supply.image} alt="Card image cap" />
                        <div class="admincard-body">
                            {/* <h5 class="admincard-title mt-4">{supply.id}</h5> */}
                            <h5 class="admincard-title mt-4">{supply.name}</h5>
                            <p class="admincard-title">Nrs. {supply.price}</p>
                            <p class="admincard-text">{supply.description}</p>
                            <button class="btn btn-danger" onClick={() => handleDelete(supply.id)} >  Delete </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Inventory;
