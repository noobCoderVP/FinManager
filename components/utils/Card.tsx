import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Card({ heading, amount }) {
    return (
        <div className="flex flex-col justify-evenly items-center">
            <h3>{heading}</h3>
            <AccountBalanceIcon />
            <div>
                <div>{amount}</div>
                <div>
                    <CurrencyRupeeIcon />
                </div>
            </div>
        </div>
    );
}

export default Card;
