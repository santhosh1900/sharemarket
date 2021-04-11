import React, {useState, useEffect} from 'react';
import "./Table.css";
import { useSelector } from "react-redux";
import _ from "lodash";

function Table({
    data                    = [], 
    UpdatePageNumber        = null, 
    pageNumber              = null, 
    previousPageNumber      = null, 
    isLoading, 
    AddStockData            = null, 
    totalStocks             = null,
    Navigate_to_Userstocks  = null,
    DeleteStockData         = null,
    search                  = "",
    UpdateSearch            = null
    }){
    const UserData     = useSelector(state => state.user.UserData);
    const UserStocks   = UserData ? UserData.StockData : [];
    var StockList      = data
    
    return (
        <div className="stocks__table">
            <div className="container">
                {
                    pageNumber && (
                        <div className="card table__heading">
                            <div className="row">
                                <div className="col s6 left-align">
                                    <h5 className="table__title"> Stock Detail Table </h5>
                                </div>
                                <div className="col s6 right-align search__holder">
                                    <div className="row" style={{marginBottom: "0"}}>
                                        <form className="col s12">
                                            <div className="row">
                                                <div className="input-field col s12 m8 search">
                                                    <i className="material-icons prefix"> search </i>
                                                    <input id="icon_telephone" 
                                                        type="text" 
                                                        value={search} 
                                                        onChange= {UpdateSearch}
                                                        className="validate"
                                                    />
                                                    <label htmlFor="icon_telephone"> Search Stock StockList </label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                
                <table className="card">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th> Symbol </th>
                            <th> Market Cap </th>
                            <th> StockList Status </th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {( isLoading && 
                            <tr>
                                <td colSpan="5" className="center-align"> 
                                    <div className="preloader-wrapper active">
                                        <div className="spinner-layer spinner-red-only">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                        </div>
                                    </div>
                                </td>
                            </tr> )
                        }
                        { ( StockList.length <= 0 && !isLoading ) && <tr><td colSpan="5" style={{textAlign : "center"}}> No data to display </td></tr> }
                        {
                            (!isLoading && StockList.map((val,i) => (
                                <tr key={i}>
                                    <td>{ val.CompanyName } </td>
                                    <td>{ val.Symbol }</td>
                                    <td> 
                                        <div className="chip">
                                            { val.MarketCap }
                                            <i className="close material-icons">radio_button_checked</i>
                                        </div>
                                    </td>
                                    {
                                        !pageNumber ? (
                                            <td>
                                                <a  onClick={() => DeleteStockData(val._id)}
                                                    className="red accent-2 waves-effect waves-light btn"> 
                                                        Delete Data
                                                </a>
                                            </td>
                                        ) :

                                        ( UserStocks.indexOf(val._id) >= 0 ? (
                                            <td>
                                                <a onClick={ Navigate_to_Userstocks }
                                                    className="#448aff blue accent-2 waves-effect waves-light btn"> 
                                                        View Data 
                                                </a>
                                            </td>
                                        ) :
                                        (
                                            <td> <a onClick={() => AddStockData(val._id)}
                                                    className="#00c853 green accent-4 waves-effect waves-light btn"> 
                                                    Save Data 
                                                </a> 
                                            </td>
                                        )
                                    )
                                }                                    
                                    <td> ${ val.CurretPrice } </td>
                                </tr>  
                            )))
                        }
                    </tbody>
                </table>
                {
                   (pageNumber && !search) && (
                    <div className="card pagination__container">
                        <div className="center-align">   
                            <ul className = "pagination">
                                <li className = "disabled">
                                    <button disabled={pageNumber == 1 || isLoading} className="pagination__button" onClick={() => UpdatePageNumber(-1)} >
                                        <i className = "material-icons">chevron_left</i>
                                    </button>
                                </li>
                                <span style={{lineHeight : "2rem"}}> {previousPageNumber*5 + 1} - { pageNumber*5 >= totalStocks ? totalStocks : pageNumber*5 } of 314 </span>
                                <li className = "disabled">
                                    <button disabled={pageNumber == 63 || isLoading} className="pagination__button" onClick={() => UpdatePageNumber(1)}>
                                        <i className = "material-icons">chevron_right</i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    ) 
                }
                
            </div>
            
        </div>
    )
}

export default Table
