import { DataStore } from 'aws-amplify';

function ChargeView({ charge, currentUser }) {
    let showDeleteButton = false

    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
    return <div className="post">
        <div className="content">
            {charge.bdate}
        </div>
        
    </div>
}

export default ChargeView