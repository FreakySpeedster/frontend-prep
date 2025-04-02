import { createContext, useContext, useState } from 'react';
import { useToast } from '../toast-message/GlobalToastMessage/ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const {triggerToast} = useToast();

    const addItem = (item) => {
        setCart((prev) => {
            let existingItem = prev.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prev.map((cartItem) => 
                    cartItem.id === existingItem.id ? {...existingItem, quantity: existingItem.quantity+1} : cartItem)
            } else {
                return [...prev, item];
            }
            
        });
        triggerToast({messageType: 'success', message: 'Item Added'});

    }
    const removeItem = (id) => {
        setCart((prev) => prev.filter((cartItem) => {
            return id !== cartItem.id
        }));
        triggerToast({messageType: 'success', message: 'Item Removed'});
    }
    const clearCart = () => {
        setCart([]);
        triggerToast({messageType: 'success', message: 'Cart Cleared'});
    }
    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);


/*
Structure of a Context Provider - FileName= EntityContext.jsx
import { createContext, useContext, useState } from 'react'

const EntityContext = createContext()

export const EntityProvider = ({ children }) => {
    // create state variables using useState
    // create functions to perform different operations
    Ex : addItem, removeItem, clearItem

    return (
        <EntityContext.Provider value={{...stateVariables, ...functions}}>

        </EntiryContext.Provider>
    )
}

// Create a custom hook
export const useEntity = () => useContext(EntityContext);
*/

/*
Wrap App.jsx with the created Context provider
import { EntityProvider } from './EntityContext';

function App() {
  return (
    <EntityProvider>
      <Component />
    </EntityProvider>
  );
}

Usage: In Components
import { useEntity } from './EntityContext';

const componentName = () => {
    [...stateVariables, ...functions] = useEntity();
    }

*/