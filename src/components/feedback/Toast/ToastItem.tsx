import { TToast } from "@typesPath/ToastType";
import styles from "./styles.module.css";
import { useAppDispatch } from "@store/hooks";
import { removeToast } from "@store/toast/toastSlice";
import { useCallback, useEffect, useState } from "react";
const { toastItem } = styles;

const ToastItem = ({ id, type, message, title }: TToast) => {
    const dispatch = useAppDispatch();

    const [ delay, setDelay ] = useState(() => {
        if(type === "warning") return true;
        else return false;
    })

    const [ pause, setPause ] = useState(false);
    const [ progress, setPogress ] = useState(0);

    const duration = 40;

    const closeToast = useCallback(() => {
        dispatch(removeToast(id));
    }, [dispatch, id]);

    const pauseHandler = () => {
        setPause((prev) => !prev);
    }

    // Handle Delay in case of warning
    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay(false);
        }, 1000)   
        return () => clearTimeout(timer);
    }, [delay]);

    // Make Progress bar 
    useEffect(() => {
        if(delay) return;
        const interval = setInterval(() => {
            setPogress((prev) => {
                if(prev < 100 && !pause)
                    return prev + 1;
                else return prev;
            });
        }, duration);

        return () => clearInterval(interval);
    }, [duration, delay, pause])
    
    // Kill Toast Item after Duration
    useEffect(() => {
        if(progress === 100)
            closeToast();
    }, [progress, closeToast]);

    // if toast not delayed show toast
    if(!delay)
    return (
    <div
        className={`alert ${`alert-${type}`} ${toastItem}`}
        onMouseEnter={pauseHandler}
        onMouseLeave={pauseHandler}
    >
        <h5>{title ? title : type}</h5>
        <p>{message}</p>
        <button 
            type="button" 
            className="btn-close"
            onClick={() => dispatch(closeToast)}
        />
        <span
            className="placeholder"
            style={{width: `${progress}%`, transition: `width ${duration}ms linear`}}
        ></span>
    </div>
    )
}

export default ToastItem;