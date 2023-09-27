import './Card.css';

const Card = ({value, suit, image, positionX, positionY, rotation}) => {

    const cardPosition = {transform: [
        {translateX: Number(positionX)},
        {translateY: Number(positionY)},
        {rotate: `${rotation}deg`}
    ]
    };

    return(
        <img
        className="card-drawn"
        src={image}
        alt={`THE ${value} OF ${suit}`}
        style={{ cardPosition }}
        ></img>
    )
}

export default Card;