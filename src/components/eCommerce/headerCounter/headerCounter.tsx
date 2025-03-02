import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type THeaderCounter = {
  quantity: number,
  navigator: string,
  Logo: React.ReactNode,
  title: string
}

const HeaderCounter = memo(({ 
  quantity,
  navigator,
  Logo,
  title
 }: THeaderCounter) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!quantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [quantity]);

  return (
    <div className={container} onClick={() => navigate(navigator)}>
      <div className={iconWrapper}>
        <>{Logo}</>
        {quantity > 0 && (
          <div className={quantityStyle}>{quantity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
});

export default HeaderCounter;