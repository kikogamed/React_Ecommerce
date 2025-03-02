import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Trecord } from "@typesPath/recordType";
const { category, categoryImg, categoryTitle } = styles;


const Category = ({title, prefix, img}: Trecord) => {
  return (
    <div className={category}>
      <Link to={`/categories/products/${prefix}`}>
        <div className={categoryImg}>
          <img
            src={img}
            alt={title}
          />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;