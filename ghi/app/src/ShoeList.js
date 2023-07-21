

function ShoesList(props) {
    const deleteShoe = async(shoe) => {
        try{
            const deleted = shoe.id
            const shoeUrl = `http://localhost:8080/api/shoes/${deleted}/`;
            const fetchConfig = {
                method: "delete",
            };
            const response = await fetch(shoeUrl, fetchConfig);
            if (response.ok) {
                console.log("shoe deleted")
                props.getShoes()
            };
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Bin</th>
                    <th>Delete Shoe</th>
                </tr>
            </thead>
            <tbody>
                {props.shoes.map(shoe => {
                    return (
                        <tr key={shoe.id}>
                            <td>{ shoe.manufacturer }</td>
                            <td>{ shoe.model_name }</td>
                            <td>{ shoe.color }</td>
                            <td>{ shoe.bin }</td>
                            <td>
                                <button onClick={() => deleteShoe(shoe)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default ShoesList;
