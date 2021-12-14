import { DataStore } from 'aws-amplify';

function ChargeView({ charge, currentUser }) {
    let showDeleteButton = false

    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
    let c = {'patient_total': '$0.00'}
    if(charge) {
        console.log(charge)
        c['patient_total'] = charge
    }
    return <div className="post">
        <div className="content">
            <p>${c.patient_total}</p>
        </div>
        
    </div>
}

export default ChargeView