import { useEffect } from "react";

const CardBoard = (props) =>  {
    const {flipCard, clearChosenCards, setWonCard, onWonCard} = props;
    const {cardData, cardsWon, cardsChosenId, cardsChosen} = props.memory;

    const chooseImage = cardId => {
        const cardIdStr = cardId.toString();

        if(cardsWon.includes(cardIdStr)) {
            // console.log(cardIdStr);
            return window.location.origin + "/images/white.png";
        } else if(cardsChosenId.includes(cardIdStr)) {
            return cardData[cardIdStr].img;
        } else {
            return window.location.origin + "/images/blank.png";
        }
    }

    const checkAlreadyWonCard = cardId => {
        cardsWon.includes(cardId);   
    }

    const handleFlipCard = cardId => {
        console.log(cardId);
        flipCard(cardId);   
    }

    const handleOnWonCard = (cardId, cardImage) => {
        if (onWonCard !== undefined){
            const cardUrl = window.location.origin + cardImage   
            // console.log(window.location.origin);         
            onWonCard(cardId, cardUrl)
        }
    }

    const checkForMatch = async () => {
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
    
        if(optionOneId === optionTwoId) {
          alert('Você já selecionou esta imagem!')
        } 
        else if (cardsChosen[0] === cardsChosen[1]) {
          alert('Você encontrou uma combinação')

          setWonCard(optionOneId, optionTwoId)

          handleOnWonCard(optionOneId, cardData[optionOneId].img)
        } else {
          alert('Desculpe, tente novamente')
        }

        clearChosenCards()

        if (cardsWon.length === cardData.length) {
          alert('Parabéns! Você encontrou todos eles!')
        }
    }


    useEffect(() => {
        let alreadyChosen = cardsChosen.length
        if (alreadyChosen === 2) {
            checkForMatch()    
        }          
    }, [cardsChosen])


    return (
        cardData.map((card, key) => {
            return (
                <img 
                    key={key}
                    src={chooseImage(key)}
                    data-id={key}
                    onClick={envent => {
                        let cardId = envent.target.getAttribute("data-id");
                            // console.log(cardId);
                        if(!checkAlreadyWonCard(cardId)) {
                            handleFlipCard(cardId);
                        }
                    }}
                />
            )
        })
    )
}

export default CardBoard;