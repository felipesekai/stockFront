import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    children?: React.ReactNode
}


export const Button = ({ title, children, ...rest }: ButtonProps) => {
    return <button
        {...rest}
        className="bg-bgPrimary                  
                    flex
                    gap-2
                    justify-center
                    items-center
                    my-5
                    ml-auto 
                    mx-4
                    px-5
                    py-3 
                    rounded
                    shadow 
                    font-bold">
        {children}
        {title}
    </button>

}