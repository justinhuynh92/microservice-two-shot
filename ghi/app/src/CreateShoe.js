import React, { useState, useEffect } from "react";

function CreateShoe({ getShoes }) {
    const [manufacturer, setManufacturer] = useState('');
    const [modelName, setModelName] = useState('');
    const [color, setColor] = useState('');
    const [pictureUrl, setPictureUrl] = useState('')
    const [bin, setBin] = useState('');
    const [bins, setBins] = useState('');

    useEffect(() => {
        async function getBins() {
            const url = 'http://localhost:8100/api/bins/';
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setBins(data.bins);
            }
        }
        getBins();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            manufacturer,
            model_name: modelName,
            color,
            picture_url: pictureUrl,
            bin,
        };

        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);
            getShoes();

            setManufacturer('');
            setModelName('');
            setColor('');
            setPictureUrl('');
            setBin('');
        }
    }

    function handleManufacturerChange(event) {
        const value = event.target.value;
        setManufacturer(value);
    }

    function handleModelNameChange(event) {
        const value = event.target.value;
        setModelName(value);
    }

    function handleColorChange(event) {
        const value = event.target.value;
        setColor(value);
    }

    function handlePictureUrlChange(event) {
        const value = event.target.value;
        setPictureUrl(value);
    }

    function handleBinChange(event) {
        const value = event.target.value;
        setBin(value);
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Shoe</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufaturer" id="manufacturer" className="form-control" />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleModelNameChange} value={modelName} placeholder="Model Name" required type="text" name="model-name" id="model-name" className="form-control" />
                            <label htmlFor="model-name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Enter picture url (optional)" required type="url" name="picture-url" id="picture-url" className="form-control" />
                            <label htmlFor="picture-url">Picture</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleBinChange} value={bin} required name="bin" id="bin" className="form-select">
                            <option value="">Choose a bin</option>
                            {bins &&
                            bins.map(bin => {
                                return (
                                <option key={bin.id} value={bin.id}>{bin.closet_name + " Bin number: " + bin.bin_number}</option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default CreateShoe;
