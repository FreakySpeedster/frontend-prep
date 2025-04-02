import './App.css'
import AutocompleteSearch from './real-world/autocomplete-search/AutocompleteSearch';
import FileExplorer from './real-world/file-explorer/FileExplorer';
import NewsFeed from './real-world/news-feed/NewsFeed';
import SocialMediaFeed from './real-world/news-feed/SocialMediaFeed';
import Pagination from './real-world/pagination/Pagination';
import ShoppingCart from './real-world/shopping-cart/ShoppingCart';

import { ToastProvider } from './real-world/toast-message/GlobalToastMessage/ToastContext';
import { CartProvider } from './real-world/shopping-cart/CartContext';
import { Toast } from './real-world/toast-message/GlobalToastMessage/Toast';

function App() {

  return (
    <ToastProvider>
    <CartProvider>
      <>
        {/* <FileExplorer /> */}
        {/* <SocialMediaFeed /> */}
        <ShoppingCart />
        <Toast />
      </>
    </CartProvider>
    </ToastProvider>
  )
}

export default App
