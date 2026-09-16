import { useState, useEffect } from "react"

const Counter = ({ target, duration = 2000}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        const increment = target / (duration / 50);

        const timer = setInterval(() => {
            start += increment;

            if (start >= target) {
                start = target;
                clearInterval(timer);
            }

            setCount(Math.floor(start));

        }, 50);
        return () => clearInterval(timer);

    }, [target, duration]);


    return <span>{count}</span>
}

export default Counter