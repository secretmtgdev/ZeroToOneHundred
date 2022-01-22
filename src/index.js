import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import ThreeStep from './dynamic-programming/threeStep';

const App = () => {
    return(
        <>
            <ThreeStep />
        </>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);