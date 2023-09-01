import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom'
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';

const ShowProducts = () => {
    const [product, setProduct] = useState({});
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);

    const toast = useRef(null);
    const getProductsData = async () => {
        const { data } = await axios.get('http://localhost:5000/product')
        setProducts(data)
    }
    useEffect(() => {
        getProductsData();
    }, [])
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    const deleteSelectedProducts = async () => {
        await selectedProducts.forEach(x =>  axios.delete(`http://localhost:5000/product/${x.id}`) )
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        getProductsData();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };
    const deleteProduct = async () => {
      
        await axios.delete(`http://localhost:5000/product/${product.id}`)
        getProductsData();
        setDeleteProductDialog(false);
        setProduct({});
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No"   icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const confirmDeleteProduct = async (product) => {
        setDeleteProductDialog(true);
        setProduct(product)
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link to={`/editProduct/${rowData.id}`}>
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
                </Link>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link to={`addProduct`} > <Button label="New" icon="pi pi-plus" severity="success"  /></Link>
                
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    return (
        <>
            <div className=" container-fluid justify-content-center ">
                <Toast ref={toast} />
                <h1 className='text-center'>Show All Products</h1>
                <hr />
                <div className='shadow-lg rounded'>
                    <Toolbar className="mb-4 mt-2" left={leftToolbarTemplate} ></Toolbar>
                    <DataTable value={products} stripedRows paginator showGridlines rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%' }} selectionMode={'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" globalFilter={globalFilter} header={header}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" sortable header="Name"></Column>
                        <Column field="category" sortable header="Category"></Column>
                        <Column field="expiryDate" sortable header="Expiry Date"></Column>
                        <Column field="discount" sortable header="Discount (%)"></Column>
                        <Column field="decription" sortable header="Decription"></Column>
                        <Column field="costPrice" sortable header="Cost Price"></Column>
                        <Column field="sellPrice" sortable header="Sell Price"></Column>
                        <Column field="finalPrice" sortable header="Final Price"></Column>
                        <Column field="discountprice" sortable header="Discount price"></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </>
    )
}

export default ShowProducts
