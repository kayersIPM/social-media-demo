import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    resources.userPool.verificationMessageTemplate= {
            defaultEmailOption: "CONFIRM_WITH_LINK"
        }
    resources.userPool.emailVerificationSubject= "Verify your email id for IPM Payment Portal",
    resources.userPool.emailVerificationMessage= "Please click the link below to verify your email address. {####}"
}
