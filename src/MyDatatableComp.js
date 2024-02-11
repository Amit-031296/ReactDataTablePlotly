import React, {useEffect, useState} from 'react';
import { ProductService } from './service/ProductService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import Plotly from "./Plotly";

export default function MyDatatableComp(){
    const [selectProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [products, setProducts] = useState(null);

    const [lazyState, setlazyState] = useState({
        first:0,
        rows:5,
        page:1,
    });

    const [price, setPriceValue] = useState(0);
    const reqArray = (array) =>{
        if(array.length === 0){
            return 0;
        }
        else{
            return array.reduce((intialArray,item) =>{
                intialArray.push({
                    price:item.price,
                    title: item.title
                });
                return intialArray;
            }, []);
        }
    }
    let networkTimeout = null;

    useEffect(()=>{
        loadLazyData();
    },[lazyState]);

    const loadLazyData = () =>{
        setLoading(true);
        if(networkTimeout){
            clearTimeout(networkTimeout);
        }
        networkTimeout = setTimeout(() =>{
            ProductService.getProducts({lazyEven: JSON.stringify(lazyState)}).then((data) =>{
                setTotalRecords(data.total);
                setProducts(data.products);
                // console.log("totalproduct ->",data.total,data.products);
                setLoading(false);
            });
        }, Math.random() *1000 + 250);
    };

    const onPage = (event) =>{
        setPriceValue(0);
        setSelectedProducts(null);
        setlazyState(event);
    };


    return(
        <div className='whole-card'>
            <div>
                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                    <InputSwitch inputId="input-rowclick" checked = {rowClick} onChange={(e) =>setRowClick(e.value)} />
                    <label htmlFor="input-rowclick">Row Click</label>
                </div>
                <DataTable totalRecords={totalRecords} onPage={onPage} value={products} paginator 
                first={lazyState.first} rows={5} lazy loading={loading}
                selectionPageOnly
                selectionMode = {rowClick ? null:'checkbox'} selection={selectProducts}
                onSelectionChange={(e) => {setSelectedProducts(e.value); setPriceValue(reqArray(e.value))}}
                dataKey = "id">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="title" header="Title" style={{ width :'15%'}}></Column>
                    <Column field="description" header="Description" style={{ width :'35%'}}></Column>
                    <Column field="price" header="Price" style={{ width :'20%'}}></Column>
                    <Column field="rating" header="Rating" style={{ width :'15%'}}></Column>
                    <Column field="stock" header="Stock" style={{ width :'15%'}}></Column>

                </DataTable>
            </div>
            <div className='justify-content-center align-items-center'>
                <Plotly priceArray={price} />
            </div>
        </div>
    );

};