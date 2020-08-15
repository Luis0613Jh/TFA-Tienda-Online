import React, {useState, useEffect} from 'react'
import {watcherProductChanges} from 'services/firebase/watcher'

const ProductContext = React.createContext();
const {Provider} = ProductContext;

function ProductProvider (props) {
    const [product, setProduct] = useState({});
    useEffect(() => {
        watcherProductChanges((product) => {
            setProduct({product})
        });
    }, []);
    return(
        <Provider value = {product}>
            {props.children}
        </Provider>
    );
}

export {ProductContext, ProductProvider}