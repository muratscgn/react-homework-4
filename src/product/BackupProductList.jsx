import { Button, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    unitPrice: yup.string().required(),
    unitsInStock: yup.string().required(),
    quantityPerUnit: yup.string().required()
}).required();

function ProductList() {

    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true)


    useEffect(() => {
        loadProduct();
    }, [])

    const loadProduct = () => {
        axios.get("https://northwind.vercel.app/api/products")
            .then(res => {
                setproducts(res.data);
                setloading(false);
            })
    }

    const deleteProduct = (item) => {
        setloading(true);
        axios.delete("https://northwind.vercel.app/api/products/" + item.id)
            .then(res => {
                loadProduct();
            })
    }

    const addProduct = (values) => {
        setloading(true);
        axios.post("https://northwind.vercel.app/api/products", values)
            .then(res => {
                loadProduct();
                setloading(false);
            })
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            id: "",
            name: "",
            unitPrice: "",
            unitsInStock: "",
            quantityPerUnit: ""
        },
        resolver: yupResolver(schema)
    });

    let columns = [
        {
            headerName: "Id",
            field: "id",
            flex: 0.5
        },
        {
            headerName: "Name",
            field: "name",
            flex: 1.2
        },
        {
            headerName: "Unit Price",
            field: "unitPrice",
            flex: 0.7
        },
        {
            headerName: "Units In Stock",
            field: "unitsInStock",
            flex: 0.7
        },
        {
            headerName: "Quantity Per Unit",
            field: "quantityPerUnit",
            flex: 1
        },
        {
            headerName: "Delete",
            renderCell: (item) => {
                return <Button color="error" onClick={() => deleteProduct(item)}>Delete</Button>
            }
        }
    ]

    return (<>
        <form style={{ marginBottom: "30px" }} onSubmit={handleSubmit(addProduct)}>
            <Grid container spacing={4}>
                <Grid item xs={0}>
                    <Controller
                        name="id"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            id="id"
                            label="Id"
                            color="success"
                            {...field} />} />
                    <p style={{ color: 'red' }}>{errors.id?.message}</p>
                </Grid>
                <Grid item xs={0}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            id="name"
                            label="Name"
                            color="success"
                            {...field} />} />
                    <p style={{ color: 'red' }}>{errors.name?.message}</p>
                </Grid>
                <Grid item xs={0}>
                    <Controller
                        name="unitPrice"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            id="unitPrice"
                            label="Unit Price"
                            color="success"
                            {...field} />} />
                    <p style={{ color: 'red' }}>{errors.unitPrice?.message}</p>
                </Grid>
                <Grid item xs={0}>
                    <Controller
                        name="unitsInStock"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            id="unitsInStock"
                            label="Units In Stock"
                            color="success"
                            {...field} />} />
                    <p style={{ color: 'red' }}>{errors.unitsInStock?.message}</p>
                </Grid>
                <Grid item xs={0}>
                    <Controller
                        name="quantityPerUnit"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            id="quantityPerUnit"
                            label="Quantity Per Unit"
                            color="success"
                            {...field} />} />
                    <p style={{ color: 'red' }}>{errors.quantityPerUnit?.message}</p>
                </Grid>
            </Grid>
            <br />
            <Button onClick={handleSubmit(addProduct)} style={{ marginBottom: "20px" }} color="success" variant="contained">Add Product</Button>
        </form>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={products}
                columns={columns}
                loading={loading}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
            />
        </div>

    </>)
}

export default ProductList