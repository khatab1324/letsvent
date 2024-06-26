import React from "react";
import CardWrapper from "../smallComponents/cardWrapper";
import LodingSpinner from "../smallComponents/lodingSpinner";

export default function VerificationLoading() {
  return (
    <div>
      <CardWrapper>
        <LodingSpinner wordContent="verifies" />
      </CardWrapper>
    </div>
  );
}
