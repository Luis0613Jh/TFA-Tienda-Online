import React, {useState, useEffect} from 'react'
import {watcherProducts} from 'services/firebase/watcher'

const ProductsContext = React.createContext();
const {Provider} = ProductsContext;

function ProductsProvider (props) {
    const [listOfProducts, setListOfProducts] = useState([]);
    useEffect(() => {
        watcherProducts((products) => {
            setListOfProducts({products})
        });
    }, []);
    return(
        <Provider value = {listOfProducts}>
            {props.children}
        </Provider>
    );
}
export {ProductsContext, ProductsProvider}