import React from "react";
import AccountDisplay from './account/AccountDisplay'

function AccountDetails() {
  return (
    <div className="accountDetails">
      <div class="container">
        <div class="row align-items-center my-5">
          <h1 class="font-weight-light">Account Details</h1>
        </div>
        <AccountDisplay />
      </div>
    </div>
  );
}

export default AccountDetails;