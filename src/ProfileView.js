import { DataStore, Auth } from 'aws-amplify';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import React from 'react'



function ProfileView({ currentUser }) {
    let showDeleteButton = false

    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
    let userAttr = { 'email': currentUser.attributes.email, 'custom:ptnum' : currentUser.attributes['custom:ptnum'], 'custom:fullname': currentUser.attributes['custom:fullname'], 'custom:bday': currentUser.attributes['custom:bday']}
    // let hasPtnum = (currentUser.attributes['custom:ptnum'] === '' ?  currentUser.attributes['custom:ptnum']: 'PT12345678')
    const updateUser = async( body) => {
        let bday = currentUser.attributes['custom:bday']
        if(!bday) bday = prompt('Birthdate?', 'MM/DD/YYYY')
        const res = await Auth.updateUserAttributes(currentUser, {
          'custom:bday': bday,
          'email': body
        });
        return res
      }
    const handleSave = async ({ name, value, previousValue }) => {
        
        
        userAttr['email'] = value
        try {
        const saveRes = await updateUser(value)
        alert(name + ' saved as: ' + value + ' (prev: ' + previousValue + ')' + saveRes);
        } catch(e) {alert(e)}
        
      };
      const handleSave2 = async ({ name, value, previousValue }) => {
        
        
        userAttr['custom:bday'] = value
        try {
        const saveRes = await updateUser(userAttr['email'])
        alert(name + ' saved as: ' + value + ' (prev: ' + previousValue + ')' + saveRes);
        } catch(e) {alert(e.message)}
        
      };
    return <React.Fragment>
        <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Full Name: </label></strong>
            <EditText name="fullname" type="fullname" style={{width: '200px'}} onSave={handleSave} defaultValue={userAttr['custom:fullname']} inline readonly/>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">PtNum: </label></strong>
            <EditText id="ptnum" name="ptnum" style={{width: '200px'}} onSave={handleSave} defaultValue={currentUser.attributes['custom:ptnum']} inline readonly/>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Email Address: </label></strong>
            <EditText name="email" type="email" style={{width: '200px'}} onSave={handleSave} defaultValue={currentUser.attributes.email} inline />
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Birthdate: </label></strong>
            <EditText name="bday" type="bday" style={{width: '200px'}} onSave={handleSave2} defaultValue={currentUser.attributes['custom:bday']} inline/>
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