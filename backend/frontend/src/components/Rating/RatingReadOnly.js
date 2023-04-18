import toFarsiNumber from "../../utils/PersianNum";
function RatingReadOnly({ value }) {
    return (
        <>
            <div className="text-muted rating-read-only">
                <span>
                    <i className={
                        value >= 1 ? 'fa-solid fa-star' : value >= 0.5 ? "fa-solid fa-star-half-stroke" : 'fa-regular fa-star'
                    }></i>
                </span>
                <span>
                    <i className={
                        value >= 2 ? 'fa-solid fa-star' : value >= 1.5 ? "fa-solid fa-star-half-stroke" : 'fa-regular fa-star'
                    }></i>
                </span>
                <span>
                    <i className={
                        value >= 3 ? 'fa-solid fa-star' : value >= 2.5 ? "fa-solid fa-star-half-stroke" : 'fa-regular fa-star'
                    }></i>
                </span>
                <span>
                    <i className={
                        value >= 4 ? 'fa-solid fa-star' : value >= 3.5 ? "fa-solid fa-star-half-stroke" : 'fa-regular fa-star'
                    }></i>
                </span>
                <span>
                    <i className={
                        value >= 5 ? 'fa-solid fa-star' : value >= 4.5 ? "fa-solid fa-star-half-stroke" : 'fa-regular fa-star'
                    }></i>
                </span>
                <span> 
                    <span style={{fontSize:'.7rem'}}>
                        ({toFarsiNumber(value)})
                        {/* ({toFarsiNumber(text)}) */}
                    </span>
                </span>
            </div>
        </>
    );
}

export default RatingReadOnly;
