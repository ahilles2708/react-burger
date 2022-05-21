import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';

export function IngredientDetailPage() {
    return (
        <div className={styles.ingredientDetailsContainer}>
            <IngredientDetails/>
        </div>
    )
}