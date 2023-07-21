import React, { useEffect, useState } from 'react';

function HatForm({getHats}) {
    const [style_name, setStyleName] = useState('')
    const [color, setColor] = useState('')
    const [fabric, setFabric] = useState('')
    const [picture_url, setPictureURL] = useState('')
    const [location, setLocation] = useState('')
    const [locations, setLocations] = useState([])

    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureURL(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.style_name = style_name;
        data.color = color;
        data.fabric = fabric;
        data.picture_url = picture_url;
        data.location = location;

        console.log(data)

        const hatURL = 'http://localhost:8090/api/locations/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const hatResponse = await fetch(hatURL, fetchConfig)
        if (hatResponse.ok) {
            const newHat = await hatResponse.json()
            console.log(newHat)
            setStyleName('');
            setColor('');
            setFabric('');
            setPictureURL('');
            setLocation('');
            getHats();
        }
    }

    const fetchData = async () => {
        const locationUrl = 'http://localhost8100/api/locations/';

        const locationResponse = await fetch(locationUrl)

        if (locationResponse.ok) {

            const data = await locationResponse.json()
            setLocations(data.locations)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={handleStyleChange} value={style_name} placeholder="Style Name" required type="text" name="name" id="style_name" className="form-control"/>
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureUrlChange} value={picture_url} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} value={location} required name="location" id="location" className="form-select">
                    <option value="">Choose a Location</option>
                    {locations.map(location => {
                        return (
                            <option key={location.id} value={location.href}>
                                {location.closet_name}
                            </option>
                        );
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

export default HatForm;
