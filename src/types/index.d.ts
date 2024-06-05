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
    imgUrl?: string;
    className?: string;
    title: string | React.ReactNode;
    subtitle: string;
    content: string | React.ReactNode;
  }

export interface ReviewCardType extends CardType{
    id: number;
}

  export interface Review {
    id: number;
    fullname: string;
    image: string;
    content: string;
    stars: number;
  }