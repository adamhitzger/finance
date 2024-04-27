import React from "react";

export interface NavLink {
    //imgURL: string;
    route: string;
    label: string;
}

export interface Words {
    text: string;
    className?: string;
}

export interface Steps {
    imgUrl: string;
    title: string;
    subtitle: string;
    content: string  | React.ReactNode;
}