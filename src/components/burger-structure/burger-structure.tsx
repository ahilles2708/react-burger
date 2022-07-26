import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ImageBlock } from "../order-item/order-item";
import { TBurgerStructure, TBurgerStructureIngredient } from "../../types";
import styles from "./burger-structure.module.css";

const IngredientBlock = ({ingredient, count}: TBurgerStructureIngredient) => {
    return (
        ingredient ? (
            <div className={styles.ingredientBlock}>
                <div>
                    <ImageBlock ingredient={ingredient}/>
                </div>
                <div className={styles.ingredientName}>
                    <span className={`text text_type_main-default`}>{ingredient.name}</span>
                </div>
                <div className={styles.ingredientPrice}>
                    <span className={'text text_type_digits-default'}>{count}</span>
                    <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
                    <span className={'text text_type_digits-default mr-2'}>{ingredient.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        ) : null
    );
};

const BurgerStructure = (props: TBurgerStructure) => {
    const { bun, ingredients } = props;

    return (
        <div className={styles.blockComposition}>
            <div className={styles.blockCompositionList}>
                {
                    bun && (
                        <IngredientBlock ingredient={bun} count={2} />
                    )
                }
                {
                    Object.keys(ingredients).sort().map(item => (
                        <IngredientBlock key={item} ingredient={ingredients[item].ingredient} count={ingredients[item].count} />
                    ))
                }
            </div>
        </div>
    );
};

export default BurgerStructure