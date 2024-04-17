"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import Button from "@/components/Button";

export default function NavigationBar() {

  const [searchInput, setSearchInput] = useState();

  return (
    <nav className="h-16 w-full px-3 py-2 bg-black flex flex-row items-center justify-between">
      <span className="text-2xl font-bold text-white mx-3">
        MassMinds
      </span>
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="AI Search"
      />
      <Button
        onClick={() => {
          console.log("searching for", searchInput);
        }}
      ><span className="font-medium text-md text-base">Sign In</span></Button>
    </nav>
  );
}
