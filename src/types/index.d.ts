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

export interface CardType {
    id?: number;
    imgUrl?: string;
    className?: string;
    title: string | React.ReactNode;
    subtitle: string;
    content: string | React.ReactNode;
  }

  export interface Review {
    id: number;
    fullname: string;
    content: string;
    stars: number;
  }