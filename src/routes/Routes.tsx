import React from 'react';
import {BrowserRouter, Route, Routes as Routers} from 'react-router-dom';
import {Home} from '../pages/Home';
import {Products} from '../pages/Products';
import {NewCheckOut} from "../pages/NewCheckOut";
import {Orders} from "../pages/Orders";

export function Routes() {
    return (
        <BrowserRouter>
            <Routers>
                <Route element={<Home />} path='/' />
                <Route element={<Products />} path='/products' />
                <Route element={<NewCheckOut />} path='/newcheckout' />
                <Route element={<Orders />} path='/orders' />
            </Routers>
        </BrowserRouter>

    );
}
