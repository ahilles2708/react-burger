import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import PropTypes from 'prop-types';
import {itemPropTypes} from '../../utils/ingredientPropTypes';
import { useDispatch } from 'react-redux';
import { CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_SORT } from '../../services/actions/burgerConstructor';
import { useDrag, useDrop } from 'react-dnd';

export default function BurgerConstructorElement ({ item, index }) {
    const dispatch = useDispatch();
    const ref = useRef(null)
    /*https://webformyself.com/ispolzovanie-peretaskivaniya-v-react/*/
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

    const [{handlerId}, drop] = useDrop({
        accept: "sort_items",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor){
            const dragIndex = item.index;
            const hoverIndex = index;
            if ( dragIndex === hoverIndex){
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
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
    
    const dragDropRef = drag(drop(ref))

    return(
        <li 
            className={styles.fillingItem + ' mb-4'}
            ref={dragDropRef}
            style={{opacity}}
            data-handler-id={handlerId}
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

BurgerConstructorElement.propTypes = {
    item: itemPropTypes.isRequired,
    index: PropTypes.number.isRequired,
}