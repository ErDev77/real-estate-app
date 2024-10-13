"use client"

import Image from "next/image";
import MainBox from "./_components/MainBox";
import HousesTypes from "./_components/HousesTypes";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div>
      <MainBox />
      <HousesTypes />
    </div>
  );
}
