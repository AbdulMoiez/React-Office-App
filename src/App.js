import './App.css';
import React, { Suspense } from 'react';
// import ModalForm1 from './components/ModalForm1';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
const ModalForm = React.lazy(() => import('./components/ModalForm1'));

function App() {
    return(
        <>
<Suspense fallback={<div id='Spinner'>
    <Spinner animation="grow" size="lg" />
</div>}>
        <ModalForm />
      </Suspense>
 </>
    )
}

export default App;
library.add(fab, fas, far)