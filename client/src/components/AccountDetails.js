import React from "react";
import AccountDisplay from './account/AccountDisplay'
import PlayerQRCode from './PlayerQRCode'

function AccountDetails() {
  return (
    <div className="accountDetails">
      <div class="container">
        <div class="align-items-center my-5">
          <h1 class="font-weight-light">Account Details</h1>
          <PlayerQRCode />
        </div>
        <div class="mt-3">
        <AccountDisplay />
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;