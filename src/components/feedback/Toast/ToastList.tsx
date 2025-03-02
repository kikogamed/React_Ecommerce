import { useAppSelector } from "@store/hooks";
import ToastItem from "./ToastItem";
import { AnimatePresence, motion } from "motion/react";
import styles from "./styles.module.css";
const {toastList} = styles;

const ToastList = () => {
    const { records } = useAppSelector(state => state.toast);

    return (
        <div className={toastList}>
        <AnimatePresence>
            {
                records.map(el => {
                    return (
                            <motion.div
                                key={el.id}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{ease: "easeInOut"}}
                                layout
                            >
                                <ToastItem {...el} />
                            </motion.div>
                    )
                })
            }
        </AnimatePresence>
        </div>        
    )
}

export default ToastList;