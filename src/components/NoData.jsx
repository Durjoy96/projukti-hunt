import Image from "next/image";
import React from "react";
import NoDataIcon from "../assets/icons/no-data.svg";

export default function NoData() {
  return (
    <div className="flex flex-col items-center my-20 text-center">
      <Image src={NoDataIcon} alt="No Data" className="w-32 h-32" />
      <h3 className="text-lg font-medium text-base-content-secondary mt-3">
        No data found
      </h3>
    </div>
  );
}
