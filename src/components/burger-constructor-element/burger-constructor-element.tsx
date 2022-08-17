import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { useDispatch } from '../../services/types/hooks';
import { CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_SORT } from '../../services/constants/burgerConstructor';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { IBurgerConstructorElementProps, IItemProps } from '../../types';

type TItemDraggable = IItemProps & {
    index: number;
}

const BurgerConstructorElement: React.FC<IBurgerConstructorElementProps> = ({ item, index }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement | null>(null);
    const [{opacity}, drag] = useDrag({
        type: "sort_items",
        item: () => {
            return {
                item, index
            }
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [, drop] = useDrop({
        accept: "sort_items",
        hover(item: TItemDraggable, monitor){
            const dragIndex = item.index;
            const hoverIndex = index;
            if ( dragIndex === hoverIndex || !ref?.current || !monitor){
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverActualY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            dispatch({
                type: CONSTRUCTOR_SORT,
                moving: {
                    from: dragIndex,
                    to: hoverIndex,
                },
            });
            item.index = hoverIndex
        },
    });
    
    drag(drop(ref));

    let type = '';
    if(item.type == 'main'){
        type = 'filling';
    } else {
        type = item.type;
    }

    return(
        <li 
            className={styles.fillingItem + ' mb-4'}
            ref={ref}
            style={{opacity}}
            data-constructor-type={type}
        >
            <DragIcon type="primary"/>
            <ConstructorElement 
                thumbnail={item.image} 
                text={item.name} 
                price={item.price}
                handleClose={
                    () => dispatch({
                        type: CONSTRUCTOR_DELETE_ITEM,
                        item: index,
                    })
                }
            />
        </li>

    )
}

export default BurgerConstructorElement;