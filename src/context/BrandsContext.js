import React, {useState, useEffect} from 'react'
import {watcherBrands} from 'services/firebase/watcher'

const BrandsContext = React.createContext();
const {Provider} = BrandsContext;

function BrandsProvider (props) {
    const [listOfBrands, setListOfBrands] = useState([]);
    useEffect(() => {
        watcherBrands((brands) => {
            setListOfBrands({brands})
        });
    }, []);
    
    return(
        <Provider value = {listOfBrands}>
            {props.children}
        </Provider>
    );
}
export {BrandsContext, BrandsProvider}