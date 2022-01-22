import React, { useEffect, useState } from 'react';

const ThreeStep = () => {
    const [stepPaths, setStepPaths] = useState(0);
    const [stepCount, setStepCount] = useState(0);
    const [decrementDisabled, setDecrementDisabled] = useState(true);
    const [states, setStates] = useState([]);

    // Update the step solver when the value of the step count changes 
    useEffect(() => {
        const [ways, _states] = SolveThreeStep(stepCount);
        setStepPaths(ways);
        setStates(_states);
        setDecrementDisabled(stepCount < 1);
        document.getElementById('threeStepDecrement').disabled = stepCount < 1;
    }, [stepCount]);
    
    let clickHandler = ({increment}) => {
        if(increment) {
            setStepCount(stepCount + 1);
        } else if(stepCount > 0) {
            setStepCount(stepCount - 1);
        }        
    }

    return(
    <>
        <h1>Three step</h1>
        <div className='controls'>
            <p>Number of steps: {stepCount}</p>
            <button id='threeStepDecrement' onClick={() => clickHandler({increment: false})}>Decrement</button>
            <button onClick={() => clickHandler({increment: true})}>Increment</button>
        </div>
        <div className='output'>
            <p>Number of paths to reach step {stepCount}: {stepPaths}</p>
            <ol>
                {states.map((state, i) => <li key={i}>{state}</li>)}
            </ol>
        </div>
    </>);
};

const SolveThreeStep = (n) => 
{
    let memo = new Array(n + 1);
    memo.fill(-1);
    let _states = [];
    _states.push(`Original call: ${n}`);
    let countWays = (n) => {
        if(n < 0) {
            _states.push(`[n = ${n}, value = 0]`);
            return 0;
        } else if(n === 0) {
            _states.push(`[n = ${n}, value = 1]`);
            return 1;
        } else if(memo[n] > -1) {
            _states.push(`Memoized: [n = ${n}, value = ${memo[n]}]`);
            return memo[n];
        } else {
            memo[n] = countWays(n - 1) + countWays(n - 2) + countWays(n - 3);
            _states.push(`Recursive calling: [n = ${n}, value = ${memo[n]}]`);
            return memo[n];
        }
    }
    return [countWays(n), _states];
}

export default ThreeStep;