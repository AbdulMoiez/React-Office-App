import './App.css';
import ModalForm1 from './components/ModalForm1';
import 'react-toastify/dist/ReactToastify.css';
// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// import ExpenseListView from './components/expense-list-view';

function App() {
    return(
        <>
  <ModalForm1/>
 </>
    )
}

export default App;
library.add(fab, fas, far)