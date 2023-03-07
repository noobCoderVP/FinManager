import React from "react";

export function useBreadcrumb(URL) {
    const segments = URL.split("/");
    let finals = [];
    finals.push("Home");
    for (let i of segments) {
        if (i.indexOf(":") == -1 && i != "") finals.push(i);
    }

    finals = finals.map((element, index) => (
        <span key={index} className="text-white">
            {element}
        </span>
    ));
    return finals;
}
