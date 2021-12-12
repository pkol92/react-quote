import { useState, useEffect, useRef } from "react";

export default function MyComponent() {
    const [items, setItems] = useState([]);
    const [oneItem, setOneItem] = useState([]);
    const prevRef = useRef([]);
    const [show, setShow] = useState(0);

    //fetch API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchingItems = await fetch("https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json");
                const data = await fetchingItems.json();
        
                setItems(data);
            } catch (err) {
                console.log(err);
            }
            };
            fetchItems();
    }, []);
    
    //catch prev value
    useEffect(() => {
        prevRef.current = oneItem;
    }, [oneItem]);
    const prev = prevRef.current 

    //create function of next quote
    const handleClickNext = () => {
        const random = items[Math.floor(Math.random() * items.length)];      
        setOneItem(random);
        setShow(0);
    };

    //create function of previous quote
    const handleClickPrev = () => {
        setOneItem(prev)
        setShow(1);
        console.log(show);
    };

    return (
        <div id="divMain">
            <div id="divButtons">
                <button onClick={handleClickPrev}>Previous quote</button>
                <button onClick={handleClickNext}>New quote</button>  
            </div>
            {show === 0? <div class="quote">{oneItem.quote}</div> : null} 
            {show === 1? <div class="quote">{oneItem.quote}</div> : null} 
        </div>
    );
}
