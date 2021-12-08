import { DataStore, Auth } from 'aws-amplify';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import React from 'react'




class ProfileView extends React.Component {
    // let showDeleteButton = false
    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
    
     state = {
      email : this.props.currentUser.attributes.email || ``,
      fullname: this.props.currentUser.attributes['custom:fullname'] || ``,
      bday:  this.props.currentUser.attributes['custom:bday'] || ``
     }
  
    // if(currentUser.attributes.email) this.state['email'] = currentUser.attributes.email 
    // if(currentUser.attributes['custom:fullname']) this.state['custom:fullname'] = currentUser.attributes['custom:fullname'] 
    // if(currentUser.attributes['custom:bday']) this.state['custom:bday'] = currentUser.attributes['custom:bday']
    // let userAttr = { 'email': currentUser.attributes.email, 'custom:ptnum' : currentUser.attributes['custom:ptnum'], 'custom:fullname': currentUser.attributes['custom:fullname'], 'custom:bday': currentUser.attributes['custom:bday']}
    // let hasPtnum = (currentUser.attributes['custom:ptnum'] === '' ?  currentUser.attributes['custom:ptnum']: 'PT12345678')
     updateUser = async( body) => {
      let newU = await Auth.currentAuthenticatedUser();
        let bday = this.state['bday']
        if(!bday) {
          bday = prompt('Birthdate?', 'MM/DD/YYYY')
          this.setState({['bday'] : bday })
          // currentUser.attributes['bday'] = bday
        }
        let fn = this.state['fullname']
        if(!fn) {
          fn = prompt('Full name?', 'Input here')
         this.setState({['fullname'] : fn})
          // currentUser.attributes['custom:fullname'] = fn
        }
        // const setB = () => { let b = prompt('Birthdate?', 'MM/DD/YYYY'); this.setState({bday: b}); return b}
        //alert(JSON.stringify(this.state))
        const res = await Auth.updateUserAttributes(newU, {
          'custom:bday': this.state['bday'],
          'custom:fullname': this.state['fullname'],
          'email': body
        });
        console.log('res updateUSer', res)
        
        
        return newU
      };
     handleUpdate = async (event) => {
       console.log(event, JSON.stringify(event))
        this.setState({
          [event.name]: event.value,
        })
        try {
          const saveRes = await this.updateUser(event.value)
          // this.setCurrentUser(saveRes)
          // alert(name + ' saved as: ' + value + ' (prev: ' + previousValue + ')' + saveRes);
          } catch(e) {alert(e.message)}
      };
    //  handleSave = async ({ name, value, previousValue }) => {
        
        
    //     this.setState({['email'] : value })
    //     // currentUser.attributes.email = value
    //     try {
    //     const saveRes = await this.updateUser(value)
    //     // this.setCurrentUser(saveRes)
    //     // alert(name + ' saved as: ' + value + ' (prev: ' + previousValue + ')' + saveRes);
    //     } catch(e) {alert(e.message)}
        
    //   };
      // const handleSave2 = async ({ name, value, previousValue }) => {
        
        
      //   userAttr['custom:bday'] = value
      //   currentUser.attributes['custom:bday'] = value
      //   try {
      //   const saveRes = await updateUser(state['email'])
      //   // this.setCurrentUser(saveRes)
      //   // alert(name + ' saved as: ' + value + ' (prev: ' + previousValue + ')' + saveRes);
      //   } catch(e) {alert(e.message)}
        
      // };
    render () {
    return <React.Fragment>
        <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Full Name: </label></strong>
            <EditText name="fullname" type="fullname" style={{width: '200px'}} value={this.state.fullname} inline readonly/>
          </div>
          
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Email Address: </label></strong>
            <EditText name="email" type="email" style={{width: '200px'}} onSave={this.handleUpdate} defaultValue={this.state.email} inline />
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <strong><label className="mr-2">Birthdate: </label></strong>
            <EditText name="bday" type="bday" style={{width: '200px'}} value={this.state.bday} inline readonly/>
          </div>
    </React.Fragment>
    }
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