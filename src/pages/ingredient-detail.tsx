import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';

const IngredientDetailPage = () => {
    return (
        <div className={styles.ingredientDetailsContainer}>
            <IngredientDetails/>
        </div>
    )
}

export default IngredientDetailPage;