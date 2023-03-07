import React from "react";

function Transaction(date, amount, description) {
    return (
        <div>
            <span>{date}</span>
            <span>{amount}</span>
            <span>{description}</span>
        </div>
    );
}

export default Transaction;
