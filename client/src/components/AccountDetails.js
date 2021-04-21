import React from "react";
import AccountDisplay from './account/AccountDisplay'

function AccountDetails() {
  return (
    <div className="accountDetails">
      <div class="container">
        <div class="row align-items-center">
          <h1 class="font-weight-light">Account Details</h1>
        </div>
        <div class="mt-3">
        <AccountDisplay />
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;