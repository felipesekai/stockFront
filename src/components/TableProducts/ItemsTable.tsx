import React, { HtmlHTMLAttributes } from 'react';



interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    title?: string,

    identify?: number
}

export function ItemsTable({ title, identify, ...rest }: Props) {
    if (identify === undefined) {
        return (
            <div className='flex flex-1  items-center justify-center bg-orange-500 py-1 px-2'
                {...rest}
            >
                {title}
            </div>
        );
    }
    return <div className='flex flex-[3] items-center justify-center bg-orange-500 py-1 px-2'
        {...rest}
    >{title}
    </div>
}