import { DataStore } from 'aws-amplify';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import React from 'react'

function ProfileView({ currentUser }) {
    let showDeleteButton = false

    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
    let hasPtnum = (currentUser.attributes['custom:ptnum'] === '' ?  currentUser.attributes['custom:ptnum']: 'PT12345678')
    return <React.Fragment>
        <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Full Name: </label></strong>
            <EditText name="fullname" type="fullname" style={{width: '200px'}} defaultValue={currentUser.attributes.name || 'Kody Test'} inline/>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">PtNum: </label></strong>
            <EditText id="ptnum" name="ptnum" style={{width: '200px'}} defaultValue={hasPtnum} inline />
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Email Address: </label></strong>
            <EditText name="email" type="email" style={{width: '200px'}} defaultValue={currentUser.attributes.email} inline/>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Birthdate: </label></strong>
            <EditText name="email" type="email" style={{width: '200px'}} defaultValue={currentUser.attributes['custom:bday'] || '05-16-1995'} inline/>
          </div>
    </React.Fragment>
    // return <div className="profile">
    //     <div className="content">
    //         <EditText
    //         name="textbox1"
    //         defaultValue={currentUser.attributes.email}
    //         />
    //     </div>
    //     {/* <div>
    //         {showDeleteButton && <button onClick={async () => {
    //             await DataStore.delete(post)
    //         }}>Delete</button>}
    //     </div> */}
    // </div>
}

export default ProfileView