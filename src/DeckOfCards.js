import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
import './DeckOfCards.css';

const DeckOfCards = () => {
    
    const [cards, setCards] = useState([]);

    const [deck, setDeck] = useState(null);

    const drawCard = async() =>{
        if(cards.length <= 51){
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
            const card = res.data.cards[0];
            const positionX = Math.floor(Math.random() * 40 - 20);
            const positionY = Math.floor(Math.random() * 40 - 20);
            const rotation = Math.floor(Math.random() * 90 - 45);
            console.log(`positions are ${positionX}-${positionY}-${rotation}`);
            setCards(cards => [...cards, {
                value: card.value,
                suit: card.suit,
                image: card.image,
                positionX: positionX,
                positionY: positionY,
                rotation: rotation,
                id: uuidv4()
            }]);
        }
        else {
            alert(`Error: No cards remaining!`);
        }
    };

    // Removes all cards from useState and shuffles the deck

    const shuffle = async() =>{
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`);
        setCards([]);
    }

    const renderShuffleButton = () => {
        if (cards.length > 0){
            return(
                <button className="shuffle-button" onClick={shuffle}>Shuffle</button>
            )
        }
    }

    // Execute this once to select deck at beginning.

    useEffect(() => {
        async function selectDeck(){
            console.log('selecting deck');
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckId = res.data.deck_id;
            console.log(`Deck id ${deckId}`);
            setDeck(deckId);
        }
        selectDeck();
    }, []);

    return (
        <>
            <div className="button-container">
                <button className="draw-button" onClick={drawCard}>Draw</button>
                {renderShuffleButton()}
            </div>

            <div className="card-container">
                {cards.map(({value, suit, image, positionX, positionY, rotation, id}) =>
                    <Card value={value} suit={suit} image={image} positionX={positionX} positionY={positionY} rotation={rotation} key={id}/>
                )}
            </div>
        </>
    );
};

export default DeckOfCards;