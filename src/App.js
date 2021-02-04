import React from 'react'
import './App.less';
import PersonalInfoContext from './context/PersonalInfoContext';
import PeopleInformationList from './pages/PeopleInformationList';

const App = () => {
  return (
    <div style={{ padding: '1rem', backgroundColor: "whitesmoke" }}>
      <PersonalInfoContext>
        <PeopleInformationList />
      </PersonalInfoContext>
    </div>
  )

}

export default App
