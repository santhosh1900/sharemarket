import React from 'react';
import "./Card.css";

function Card() {

    const CompanyData = [
        { name : "Google", symbol : "GOOGL" , Price : "1551" , Image : "https://img-authors.flaticon.com/google.jpg"},
        { name : "Facebook" , symbol : "FB", Price : "336", Image : "https://img.flaticon.com/icons/png/512/124/124010.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" },
        { name : "Amazon" , symbol : "AMZN", Price : "336" , Image : "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg" }
    ];
    // console.log(CompanyData)


    return (
        <div className="hero-card container">
            <div className="row">
                {
                    ( CompanyData.map((val,i) => (
                        <div className="col s12 m4 l4" key={i}>
                            <div className="card" >
                                <div className="card-image">
                                    <img src={val.Image} alt={i} />
                                    <span className="card-title"> { val.name } </span>
                                </div>
                                <div className="card-action">
                                    <a> { val.symbol } </a>
                                    <a className="price"> $ { val.Price } USD </a>
                                </div>
                            </div>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}

export default Card;
